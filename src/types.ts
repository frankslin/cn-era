/**
 * 年号转换结果
 */
export interface EraResult {
  /** 朝代名称 */
  dynasty: string;
  /** 年号 */
  reign_title: string;
  /** 年份（如 "元年"、"三年"） */
  year_num: string;
}

/**
 * 年号数据
 */
export interface EraData {
  /** 朝代名称 */
  dynasty: string;
  /** 年号 */
  reign_title: string;
  /** 开始年份（公元） */
  start_year: number;
  /** 结束年份（公元） */
  end_year: number;
}
