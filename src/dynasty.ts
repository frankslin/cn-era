/**
 * 朝代枚举
 * 基于 CBDB (China Biographical Database) 的朝代编号
 */

export enum Dynasty {
  /** 未详 */
  UNKNOWN = 0,
  /** 汉前 */
  PRE_HAN = 1,
  /** 秦汉 */
  QIN_HAN = 2,
  /** 赢秦 */
  QIN = 61,
  /** 汉 */
  HAN = 83,
  /** 西汉 */
  XI_HAN = 29,
  /** 新 */
  XIN = 46,
  /** 东汉 */
  DONG_HAN = 25,
  /** 三国 */
  SAN_GUO = 3,
  /** 三国魏 */
  SAN_GUO_WEI = 26,
  /** 三国蜀 */
  SAN_GUO_SHU = 53,
  /** 三国吴 */
  SAN_GUO_WU = 42,
  /** 晋 */
  JIN = 82,
  /** 西晋 */
  XI_JIN = 23,
  /** 东晋 */
  DONG_JIN = 27,
  /** 南北朝 */
  NAN_BEI_CHAO = 4,
  /** 宋(刘) */
  LIU_SONG = 28,
  /** 南齐 */
  NAN_QI = 32,
  /** 南梁 */
  NAN_LIANG = 44,
  /** 陈 */
  CHEN = 24,
  /** 北魏 */
  BEI_WEI = 30,
  /** 东魏 */
  DONG_WEI = 41,
  /** 西魏 */
  XI_WEI = 40,
  /** 北齐 */
  BEI_QI = 35,
  /** 北周 */
  BEI_ZHOU = 31,
  /** 隋 */
  SUI = 5,
  /** 唐 */
  TANG = 6,
  /** 周(武周) */
  WU_ZHOU = 77,
  /** 五代 */
  WU_DAI = 7,
  /** 后梁 */
  HOU_LIANG = 34,
  /** 后唐 */
  HOU_TANG = 47,
  /** 后晋 */
  HOU_JIN = 48,
  /** 后汉 */
  HOU_HAN = 52,
  /** 后周 */
  HOU_ZHOU = 49,
  /** 宋 */
  SONG = 15,
  /** 辽 */
  LIAO = 16,
  /** 西夏 */
  XI_XIA = 78,
  /** 金 */
  JIN_DYNASTY = 17,
  /** 元 */
  YUAN = 18,
  /** 明 */
  MING = 19,
  /** 清 */
  QING = 20,
  /** 中华民国 */
  ROC = 21,
}

/**
 * 朝代编号到中文名称的映射
 */
export const DynastyNameMap: Record<Dynasty, string> = {
  [Dynasty.UNKNOWN]: '未詳',
  [Dynasty.PRE_HAN]: '漢前',
  [Dynasty.QIN_HAN]: '秦漢',
  [Dynasty.QIN]: '秦',
  [Dynasty.HAN]: '漢',
  [Dynasty.XI_HAN]: '西漢',
  [Dynasty.XIN]: '新',
  [Dynasty.DONG_HAN]: '東漢',
  [Dynasty.SAN_GUO]: '三國',
  [Dynasty.SAN_GUO_WEI]: '魏',
  [Dynasty.SAN_GUO_SHU]: '蜀漢',
  [Dynasty.SAN_GUO_WU]: '吳',
  [Dynasty.JIN]: '晉',
  [Dynasty.XI_JIN]: '西晉',
  [Dynasty.DONG_JIN]: '東晉',
  [Dynasty.NAN_BEI_CHAO]: '南北朝',
  [Dynasty.LIU_SONG]: '劉宋',
  [Dynasty.NAN_QI]: '南齊',
  [Dynasty.NAN_LIANG]: '梁',
  [Dynasty.CHEN]: '陳',
  [Dynasty.BEI_WEI]: '北魏',
  [Dynasty.DONG_WEI]: '東魏',
  [Dynasty.XI_WEI]: '西魏',
  [Dynasty.BEI_QI]: '北齊',
  [Dynasty.BEI_ZHOU]: '北周',
  [Dynasty.SUI]: '隋',
  [Dynasty.TANG]: '唐',
  [Dynasty.WU_ZHOU]: '武周',
  [Dynasty.WU_DAI]: '五代',
  [Dynasty.HOU_LIANG]: '後梁',
  [Dynasty.HOU_TANG]: '後唐',
  [Dynasty.HOU_JIN]: '後晉',
  [Dynasty.HOU_HAN]: '後漢',
  [Dynasty.HOU_ZHOU]: '後周',
  [Dynasty.SONG]: '宋',
  [Dynasty.LIAO]: '遼',
  [Dynasty.XI_XIA]: '西夏',
  [Dynasty.JIN_DYNASTY]: '金',
  [Dynasty.YUAN]: '元',
  [Dynasty.MING]: '明',
  [Dynasty.QING]: '清',
  [Dynasty.ROC]: '中華民國',
};

/**
 * 中文名称到朝代编号的反向映射
 */
export const NameToDynastyMap: Record<string, Dynasty> = {
  '西漢': Dynasty.XI_HAN,
  '新': Dynasty.XIN,
  '東漢': Dynasty.DONG_HAN,
  '魏': Dynasty.SAN_GUO_WEI,
  '蜀漢': Dynasty.SAN_GUO_SHU,
  '吳': Dynasty.SAN_GUO_WU,
  '西晉': Dynasty.XI_JIN,
  '東晉': Dynasty.DONG_JIN,
  '劉宋': Dynasty.LIU_SONG,
  '南齊': Dynasty.NAN_QI,
  '梁': Dynasty.NAN_LIANG,
  '陳': Dynasty.CHEN,
  '北魏': Dynasty.BEI_WEI,
  '東魏': Dynasty.DONG_WEI,
  '西魏': Dynasty.XI_WEI,
  '北齊': Dynasty.BEI_QI,
  '北周': Dynasty.BEI_ZHOU,
  '隋': Dynasty.SUI,
  '唐': Dynasty.TANG,
  '武周': Dynasty.WU_ZHOU,
  '後梁': Dynasty.HOU_LIANG,
  '後唐': Dynasty.HOU_TANG,
  '後晉': Dynasty.HOU_JIN,
  '後漢': Dynasty.HOU_HAN,
  '後周': Dynasty.HOU_ZHOU,
  '宋': Dynasty.SONG,
  '遼': Dynasty.LIAO,
  '西夏': Dynasty.XI_XIA,
  '金': Dynasty.JIN_DYNASTY,
  '元': Dynasty.YUAN,
  '明': Dynasty.MING,
  '清': Dynasty.QING,
  '中華民國': Dynasty.ROC,
};

/**
 * 主线朝代优先级
 * 用于在多个政权并存时返回"主流"朝代
 * 数字越小优先级越高
 */
export const MainlinePriority: Partial<Record<Dynasty, number>> = {
  // 正统朝代优先级最高
  // 在朝代交替时，新朝代优先级更高（数字更小）
  [Dynasty.XI_HAN]: 1,
  [Dynasty.XIN]: 10,  // 新朝不是正统
  [Dynasty.DONG_HAN]: 1,
  [Dynasty.SUI]: 2,  // 隋唐交替时，唐优先
  [Dynasty.TANG]: 1,
  [Dynasty.SONG]: 1,
  [Dynasty.YUAN]: 1,
  [Dynasty.MING]: 1,
  [Dynasty.QING]: 1,
  [Dynasty.ROC]: 1,
  [Dynasty.XI_JIN]: 1,
  [Dynasty.DONG_JIN]: 1,

  // 三国时期，魏为正统
  [Dynasty.SAN_GUO_WEI]: 2,
  [Dynasty.SAN_GUO_SHU]: 3,
  [Dynasty.SAN_GUO_WU]: 3,

  // 南北朝时期，南朝为正统
  [Dynasty.LIU_SONG]: 2,
  [Dynasty.NAN_QI]: 2,
  [Dynasty.NAN_LIANG]: 2,
  [Dynasty.CHEN]: 2,
  [Dynasty.BEI_WEI]: 3,
  [Dynasty.DONG_WEI]: 3,
  [Dynasty.XI_WEI]: 3,
  [Dynasty.BEI_QI]: 3,
  [Dynasty.BEI_ZHOU]: 3,

  // 武周时期，唐为正统
  [Dynasty.WU_ZHOU]: 2,

  // 五代时期
  [Dynasty.HOU_LIANG]: 2,
  [Dynasty.HOU_TANG]: 2,
  [Dynasty.HOU_JIN]: 2,
  [Dynasty.HOU_HAN]: 2,
  [Dynasty.HOU_ZHOU]: 2,

  // 宋辽金西夏并立，宋为正统
  [Dynasty.LIAO]: 3,
  [Dynasty.XI_XIA]: 3,
  [Dynasty.JIN_DYNASTY]: 3,
};
