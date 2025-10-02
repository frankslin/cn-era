import { EraResult } from './types';
import { eraData } from './data/eras';
import { numberToChinese } from './utils/number';

/**
 * 将公元年份转换为中国历史年号纪年
 * @param year 公元年份（范围：-841 到 3000，0 不合法）
 * @returns 该年份对应的所有年号信息数组
 * @throws {Error} 当年份不合法时抛出错误
 *
 * @example
 * ```ts
 * convertYear(618);  // [{ dynasty: '唐', reign_title: '武德', year_num: '元年' }]
 * convertYear(2024); // [{ dynasty: '民国', reign_title: '民国', year_num: '一百一十三年' }]
 * convertYear(0);    // 抛出错误
 * ```
 */
export function convertYear(year: number): EraResult[] {
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

  const results: EraResult[] = [];

  // 1912 年之後算作民國
  if (year >= 1912) {
    const mingguoYear = year - 1911;
    results.push({
      dynasty: '中華民國',
      reign_title: '民國',
      year_num: numberToChinese(mingguoYear),
    });
    return results;
  }

  // 查找匹配的年号
  for (const era of eraData) {
    if (year >= era.start_year && year <= era.end_year) {
      const yearInEra = year - era.start_year + 1;
      results.push({
        dynasty: era.dynasty,
        reign_title: era.reign_title,
        year_num: numberToChinese(yearInEra),
      });
    }
  }

  return results;
}

// 导出类型
export type { EraResult, EraData } from './types';
