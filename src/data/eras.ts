import { EraData } from '../types';

/**
 * 中国历史年号数据
 * 数据来源：中国历史年号表
 *
 * 注：这里提供部分示例数据，完整数据需要补充
 */
export const eraData: EraData[] = [
  // 唐朝
  { dynasty: '唐', reign_title: '武德', start_year: 618, end_year: 626 },
  { dynasty: '唐', reign_title: '貞觀', start_year: 627, end_year: 649 },
  { dynasty: '唐', reign_title: '永徽', start_year: 650, end_year: 655 },
  { dynasty: '唐', reign_title: '顯慶', start_year: 656, end_year: 661 },
  { dynasty: '唐', reign_title: '龍朔', start_year: 661, end_year: 663 },
  { dynasty: '唐', reign_title: '麟德', start_year: 664, end_year: 665 },
  { dynasty: '唐', reign_title: '乾封', start_year: 666, end_year: 668 },
  { dynasty: '唐', reign_title: '總章', start_year: 668, end_year: 670 },
  { dynasty: '唐', reign_title: '咸亨', start_year: 670, end_year: 674 },
  { dynasty: '唐', reign_title: '上元', start_year: 674, end_year: 676 },
  { dynasty: '唐', reign_title: '儀鳳', start_year: 676, end_year: 679 },
  { dynasty: '唐', reign_title: '調露', start_year: 679, end_year: 680 },
  { dynasty: '唐', reign_title: '永隆', start_year: 680, end_year: 681 },
  { dynasty: '唐', reign_title: '開耀', start_year: 681, end_year: 682 },
  { dynasty: '唐', reign_title: '永淳', start_year: 682, end_year: 683 },
  { dynasty: '唐', reign_title: '弘道', start_year: 683, end_year: 684 },
  { dynasty: '唐', reign_title: '嗣聖', start_year: 684, end_year: 684 },
  { dynasty: '唐', reign_title: '文明', start_year: 684, end_year: 684 },
  { dynasty: '唐', reign_title: '光宅', start_year: 684, end_year: 684 },
  { dynasty: '唐', reign_title: '垂拱', start_year: 685, end_year: 688 },
  { dynasty: '唐', reign_title: '永昌', start_year: 689, end_year: 689 },
  { dynasty: '唐', reign_title: '載初', start_year: 689, end_year: 690 },

  // 武周
  { dynasty: '周', reign_title: '天授', start_year: 690, end_year: 692 },
  { dynasty: '周', reign_title: '如意', start_year: 692, end_year: 692 },
  { dynasty: '周', reign_title: '長壽', start_year: 692, end_year: 694 },
  { dynasty: '周', reign_title: '延載', start_year: 694, end_year: 694 },
  { dynasty: '周', reign_title: '證聖', start_year: 695, end_year: 695 },
  { dynasty: '周', reign_title: '天冊萬歲', start_year: 695, end_year: 696 },
  { dynasty: '周', reign_title: '萬歲登封', start_year: 696, end_year: 696 },
  { dynasty: '周', reign_title: '萬歲通天', start_year: 696, end_year: 697 },
  { dynasty: '周', reign_title: '神功', start_year: 697, end_year: 697 },
  { dynasty: '周', reign_title: '聖曆', start_year: 698, end_year: 700 },
  { dynasty: '周', reign_title: '久視', start_year: 700, end_year: 701 },
  { dynasty: '周', reign_title: '大足', start_year: 701, end_year: 701 },
  { dynasty: '周', reign_title: '長安', start_year: 701, end_year: 705 },

  // 唐中宗復辟後
  { dynasty: '唐', reign_title: '神龍', start_year: 705, end_year: 707 },
  { dynasty: '唐', reign_title: '景龍', start_year: 707, end_year: 710 },

  // TODO: 需要补充更多朝代的年号数据
  // 参考 DATA_TODO.md 文件获取详细的数据补充清单
  //
  // 优先级：
  // 1. 高优先级（常用朝代）：
  //    - 明朝 (1368~1644)：洪武、建文、永乐、洪熙、宣德、正统、景泰、天顺等
  //    - 清朝 (1644~1911)：順治、康熙、雍正、乾隆、嘉慶、道光、咸豐、同治、光緒、宣統
  //    - 唐朝（续 710~907）：景雲、開元、天寶、至德、乾元等
  //    - 宋朝 (960~1279)：建隆、乾德、開寶、太平興國等
  //
  // 2. 中优先级：
  //    - 隋朝 (581~618)：開皇、仁壽、大業
  //    - 元朝 (1271~1368)：中統、至元、大德、至大等
  //
  // 3. 低优先级：
  //    - 秦朝及之前：秦始皇時期無年號
  //    - 西漢 (-206~9)：建元開始有年號
  //    - 東漢 (25~220)
  //    - 三國 (220~280)：魏、蜀、吳
  //    - 西晉、東晉 (265~419)
  //    - 南北朝 (420~589)：多政權並存
  //    - 五代十國 (907~960)：多政權並存
  //    - 遼 (947~1125)、金 (1115~1234)、西夏 (1032~1227)
  //
  // 數據來源建議：
  // - 維基百科「中國年號列表」
  // - CBDB 年號數據
  // - 《中國歷代年號考》
];
