import { Dynasty } from './dynasty';

/**
 * 年号转换结果
 */
export interface EraResult {
  /** 朝代编号 (CBDB) */
  dynasty: Dynasty;
  /** 朝代名称 */
  dynasty_name: string;
  /** 年号 */
  reign_title: string;
  /** 年份（数字） */
  year: number;
  /** 年份（如 "元年"、"三年"） */
  year_num: string;
}

/**
 * 年号数据
 */
export interface EraData {
  /** 朝代编号 (CBDB) */
  dynasty: Dynasty;
  /** 年号 */
  reign_title: string;
  /** 开始年份（公元） */
  start_year: number;
  /** 结束年份（公元） */
  end_year: number;
}

/**
 * convertYear 选项
 */
export interface ConvertYearOptions {
  /**
   * 返回模式
   * - 'mainline': 只返回主线朝代的年号（默认）
   * - 'all': 返回所有可能的年号
   */
  mode?: 'mainline' | 'all';
  /**
   * 指定朝代
   * 当指定时，只返回该朝代的年号
   */
  dynasty?: Dynasty;
}
