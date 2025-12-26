import { EraResult, ConvertYearOptions } from './types';
import { eraData } from './data/eras';
import { numberToChinese } from './utils/number';
import { Dynasty, DynastyNameMap, MainlinePriority } from './dynasty';

/**
 * 将公元年份转换为中国历史年号纪年
 * @param year 公元年份（范围：-841 到 3000，0 不合法）
 * @param opts 转换选项
 * @returns 该年份对应的年号信息数组
 * @throws {Error} 当年份不合法时抛出错误
 *
 * @example
 * ```ts
 * // 默认返回主线朝代年号
 * convertYear(690);
 * // [{ dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' }]
 *
 * // 返回所有年号
 * convertYear(690, { mode: 'all' });
 * // [
 * //   { dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' },
 * //   { dynasty: Dynasty.WU_ZHOU, dynasty_name: '武周', reign_title: '天授', year: 1, year_num: '元年' }
 * // ]
 *
 * // 只返回指定朝代的年号
 * convertYear(690, { dynasty: Dynasty.WU_ZHOU });
 * // [{ dynasty: Dynasty.WU_ZHOU, dynasty_name: '武周', reign_title: '天授', year: 1, year_num: '元年' }]
 * ```
 */
export function convertYear(year: number, opts: ConvertYearOptions = {}): EraResult[] {
  // 验证年份
  if (year === 0) {
    throw new Error('年份不能为 0');
  }

  if (!Number.isInteger(year)) {
    throw new Error('年份必须是整数');
  }

  if (year < -841 || year > 3000) {
    throw new Error('年份范围必须在 -841 到 3000 之间');
  }

  const { mode = 'mainline', dynasty: filterDynasty } = opts;
  const results: EraResult[] = [];

  // 查找匹配的年号
  for (const era of eraData) {
    if (year >= era.start_year && year <= era.end_year) {
      // 如果指定了朝代，只返回该朝代的年号
      if (filterDynasty !== undefined && era.dynasty !== filterDynasty) {
        continue;
      }

      const yearInEra = year - era.start_year + 1;
      results.push({
        dynasty: era.dynasty,
        dynasty_name: DynastyNameMap[era.dynasty],
        reign_title: era.reign_title,
        year: yearInEra,
        year_num: numberToChinese(yearInEra),
      });
    }
  }

  // 1912 年之後算作民國（需在历史年号搜索之后，以便处理1912年同时是宣统四年和民国元年）
  if (year >= 1912) {
    // 如果指定了朝代但不是民国，不返回民国年号
    if (filterDynasty !== undefined && filterDynasty !== Dynasty.ROC) {
      // 不添加民国年号
    } else {
      const mingguoYear = year - 1911;
      results.push({
        dynasty: Dynasty.ROC,
        dynasty_name: DynastyNameMap[Dynasty.ROC],
        reign_title: '民國',
        year: mingguoYear,
        year_num: numberToChinese(mingguoYear),
      });
    }
  }

  // 如果是 mainline 模式，只返回优先级最高的朝代
  if (mode === 'mainline' && results.length > 1) {
    let minPriority = Infinity;
    let mainlineResults: EraResult[] = [];

    for (const result of results) {
      const priority = MainlinePriority[result.dynasty] ?? 999;
      if (priority < minPriority) {
        minPriority = priority;
        mainlineResults = [result];
      } else if (priority === minPriority) {
        mainlineResults.push(result);
      }
    }

    return mainlineResults;
  }

  return results;
}

// 导出类型和枚举
export { Dynasty } from './dynasty';
export type { EraResult, EraData, ConvertYearOptions } from './types';
