import { describe, it, expect } from 'vitest';
import { convertYear, Dynasty } from '../src/index';

describe('convertYear', () => {
  it('应该正确转换唐朝武德三年', () => {
    const result = convertYear(620);
    expect(result).toEqual([
      { dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '武德', year: 3, year_num: '三年' },
    ]);
  });

  // Sui Dynasty tests
  describe('Sui Dynasty', () => {
    it('should correctly convert to the first year of the Sui Dynasty', () => {
      const result = convertYear(581);
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '開皇',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correct convert to a year in the Renshou reign', () => {
      const result = convertYear(602);
      expect(result).toEqual([
        { dynasty: Dynasty.SUI, dynasty_name: '隋', reign_title: '仁壽', year: 2, year_num: '二年' },
      ]);
    });

    it('should handle the year 617 with multiple reign titles', () => {
      const result = convertYear(617, { mode: 'all' });
      expect(result).toHaveLength(2);
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '大業',
        year: 13,
        year_num: '十三年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '義寧',
        year: 1,
        year_num: '元年',
      });
    });

    it('should handle the complex transitions in the year 618', () => {
      const result = convertYear(618, { mode: 'all' });
      expect(result).toHaveLength(4);
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '大業',
        year: 14,
        year_num: '十四年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '義寧',
        year: 2,
        year_num: '二年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '皇泰',
        year: 1,
        year_num: '元年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.TANG,
        dynasty_name: '唐',
        reign_title: '武德',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correct convert to the year 619', () => {
      const result = convertYear(619, { mode: 'all' });
      expect(result).toHaveLength(2);
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '皇泰',
        year: 2,
        year_num: '二年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.TANG,
        dynasty_name: '唐',
        reign_title: '武德',
        year: 2,
        year_num: '二年',
      });
    });
  });

  it('应该正确转换唐朝贞观元年', () => {
    const result = convertYear(627);
    expect(result).toEqual([
      { dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '貞觀', year: 1, year_num: '元年' },
    ]);
  });

  it('应该处理改元年份（一年内多个年号）', () => {
    const result = convertYear(690, { mode: 'all' });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '載初',
      year: 2,
      year_num: '二年',
    });
    expect(result).toContainEqual({
      dynasty: Dynasty.WU_ZHOU, dynasty_name: '武周',
      reign_title: '天授',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该返回後梁開平二年', () => {
    const result = convertYear(908);
    expect(result).toContainEqual({
      dynasty: Dynasty.HOU_LIANG, dynasty_name: '後梁',
      reign_title: '開平',
      year: 2,
      year_num: '二年',
    });
  });

  it('应该正确转换民国元年（1912年同时是宣统四年和民国元年）', () => {
    const result = convertYear(1912, { mode: 'all' });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: Dynasty.QING, dynasty_name: '清',
      reign_title: '宣統',
      year: 4,
      year_num: '四年',
    });
    expect(result).toContainEqual({
      dynasty: Dynasty.ROC, dynasty_name: '中華民國',
      reign_title: '民國',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换民国年份', () => {
    const result = convertYear(2024);
    expect(result).toEqual([
      { dynasty: Dynasty.ROC, dynasty_name: '中華民國', reign_title: '民國', year: 113, year_num: '一百一十三年' },
    ]);
  });

  it('应该在年份为 0 时抛出错误', () => {
    expect(() => convertYear(0)).toThrow('年份不能为 0');
  });

  it('应该在年份为非整数时抛出错误', () => {
    expect(() => convertYear(618.5)).toThrow('年份必须是整数');
  });

  it('应该在年份超出范围时抛出错误', () => {
    expect(() => convertYear(-842)).toThrow('年份范围必须在 -841 到 3000 之间');
    expect(() => convertYear(3001)).toThrow('年份范围必须在 -841 到 3000 之间');
  });

  it('应该支持负数表示公元前年份', () => {
    // 目前数据中还没有公元前的数据，所以返回空数组
    const result = convertYear(-221);
    expect(result).toEqual([]);
  });

  // 唐朝盛世测试
  it('应该正确转换开元盛世年份', () => {
    const result = convertYear(713);
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '開元',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换天宝年间', () => {
    const result = convertYear(742);
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '天寶',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换安史之乱年份', () => {
    const result = convertYear(756);
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '至德',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换唐朝末年', () => {
    const result = convertYear(907);
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '天祐',
      year: 4,
      year_num: '四年',
    });
  });

  it('应该正确处理712年改元（多个年号）', () => {
    const result = convertYear(712, { mode: 'all' });
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '太極',
      year: 1,
      year_num: '元年',
    });
    expect(result).toContainEqual({
      dynasty: Dynasty.TANG, dynasty_name: '唐',
      reign_title: '延和',
      year: 1,
      year_num: '元年',
    });
  });

  // 宋朝测试
  it('应该正确转换宋朝建隆元年', () => {
    const result = convertYear(960);
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '建隆',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换宋朝乾德年间', () => {
    const result = convertYear(965);
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '乾德',
      year: 3,
      year_num: '三年',
    });
  });

  it('应该正确转换北宋盛世年份', () => {
    const result = convertYear(1000);
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '咸平',
      year: 3,
      year_num: '三年',
    });
  });

  it('应该正确转换北宋末年靖康之难', () => {
    const result = convertYear(1127, { mode: 'all' });
    expect(result).toHaveLength(4);
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '靖康',
      year: 2,
      year_num: '二年',
    });
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '建炎',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换南宋绍兴年间', () => {
    const result = convertYear(1142);
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '紹興',
      year: 12,
      year_num: '十二年',
    });
  });

  it('应该正确转换南宋末年', () => {
    const result = convertYear(1279, { mode: 'all' });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: Dynasty.SONG, dynasty_name: '宋',
      reign_title: '祥興',
      year: 2,
      year_num: '二年',
    });
    expect(result).toContainEqual({
      dynasty: Dynasty.YUAN, dynasty_name: '元',
      reign_title: '至元 (世祖)',
      year: 16,
      year_num: '十六年',
    });
  });

  // 元朝测试
  it('应该正确转换元朝中统元年', () => {
    const result = convertYear(1260, { mode: 'all' });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: Dynasty.YUAN, dynasty_name: '元',
      reign_title: '中統',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换元世祖至元年间', () => {
    const result = convertYear(1280);
    expect(result).toEqual([
      { dynasty: Dynasty.YUAN, dynasty_name: '元', reign_title: '至元 (世祖)', year: 17, year_num: '十七年' },
    ]);
  });

  it('应该正确转换元顺帝至元年间', () => {
    const result = convertYear(1335);
    expect(result).toContainEqual(
      {
        dynasty: Dynasty.YUAN,
        dynasty_name: '元',
        reign_title: '至元 (順帝)',
        year: 1,
        year_num: '元年'
      });
  });

  it('应该正确转换元朝末年', () => {
    const result = convertYear(1368, { mode: 'all' });
    expect(result).toContainEqual({
      dynasty: Dynasty.YUAN, dynasty_name: '元',
      reign_title: '至正',
      year: 28,
      year_num: '二十八年',
    });
  });

  // 明朝测试
  it('应该正确转换明朝洪武元年', () => {
    const result = convertYear(1368, { mode: 'all' });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: Dynasty.MING, dynasty_name: '明',
      reign_title: '洪武',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换明朝永乐年间', () => {
    const result = convertYear(1410);
    expect(result).toEqual([
      { dynasty: Dynasty.MING, dynasty_name: '明', reign_title: '永樂', year: 8, year_num: '八年' },
    ]);
  });

  it('应该正确转换明朝万历年间', () => {
    const result = convertYear(1600);
    expect(result).toEqual([
      { dynasty: Dynasty.MING, dynasty_name: '明', reign_title: '萬曆', year: 28, year_num: '二十八年' },
    ]);
  });

  it('应该正确转换明朝末年', () => {
    const result = convertYear(1644, { mode: 'all' });
    expect(result).toContainEqual({
      dynasty: Dynasty.MING, dynasty_name: '明',
      reign_title: '崇禎',
      year: 17,
      year_num: '十七年',
    });
  });

  // 清朝测试
  it('应该正确转换清朝顺治元年', () => {
    const result = convertYear(1644, { mode: 'all' });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: Dynasty.QING, dynasty_name: '清',
      reign_title: '順治',
      year: 1,
      year_num: '元年',
    });
  });

  it('应该正确转换清朝康熙年间', () => {
    const result = convertYear(1700);
    expect(result).toEqual([
      { dynasty: Dynasty.QING, dynasty_name: '清', reign_title: '康熙', year: 39, year_num: '三十九年' },
    ]);
  });

  it('应该正确转换清朝乾隆年间', () => {
    const result = convertYear(1750);
    expect(result).toEqual([
      { dynasty: Dynasty.QING, dynasty_name: '清', reign_title: '乾隆', year: 15, year_num: '十五年' },
    ]);
  });

  it('应该正确转换清朝光绪年间', () => {
    const result = convertYear(1900);
    expect(result).toEqual([
      { dynasty: Dynasty.QING, dynasty_name: '清', reign_title: '光緒', year: 26, year_num: '二十六年' },
    ]);
  });

  it('应该正确转换清朝末年', () => {
    const result = convertYear(1911);
    expect(result).toEqual([
      { dynasty: Dynasty.QING, dynasty_name: '清', reign_title: '宣統', year: 3, year_num: '三年' },
    ]);
  });
});

describe('Dynasty Tests', () => {
  describe('五代十國', () => {
    it('should correctly convert to a year in the 後梁 dynasty', () => {
      const result = convertYear(907, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.HOU_LIANG, dynasty_name: '後梁',
        reign_title: '開平',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 後唐 dynasty', () => {
      const result = convertYear(923);
      expect(result).toContainEqual({
        dynasty: Dynasty.HOU_TANG, dynasty_name: '後唐',
        reign_title: '同光',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('遼朝', () => {
    it('should correctly convert to a year in the 遼 dynasty', () => {
      const result = convertYear(916, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.LIAO, dynasty_name: '遼',
        reign_title: '神冊',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('西夏', () => {
    it('should correctly convert to a year in the 西夏 dynasty', () => {
      const result = convertYear(1032, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.XI_XIA, dynasty_name: '西夏',
        reign_title: '顯道',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('金朝', () => {
    it('should correctly convert to a year in the 金 dynasty', () => {
      const result = convertYear(1115, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.JIN_DYNASTY, dynasty_name: '金',
        reign_title: '收國',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('西漢', () => {
    it('should correctly convert to a year in the 西漢 dynasty', () => {
      const result = convertYear(-140);
      expect(result).toContainEqual({
        dynasty: Dynasty.XI_HAN, dynasty_name: '西漢',
        reign_title: '建元',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('新朝', () => {
    it('should correctly convert to a year in the 新 dynasty', () => {
      const result = convertYear(9);
      expect(result).toContainEqual({
        dynasty: Dynasty.XIN, dynasty_name: '新',
        reign_title: '始建國',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('東漢', () => {
    it('should correctly convert to a year in the 東漢 dynasty', () => {
      const result = convertYear(25);
      expect(result).toContainEqual({
        dynasty: Dynasty.DONG_HAN, dynasty_name: '東漢',
        reign_title: '建武',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('三國', () => {
    it('should correctly convert to a year in the 魏 dynasty', () => {
      const result = convertYear(220, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.SAN_GUO_WEI, dynasty_name: '魏',
        reign_title: '黃初',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 蜀漢 dynasty', () => {
      const result = convertYear(221, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.SAN_GUO_SHU, dynasty_name: '蜀漢',
        reign_title: '章武',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 吳 dynasty', () => {
      const result = convertYear(222, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.SAN_GUO_WU, dynasty_name: '吳',
        reign_title: '黃武',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('晉朝', () => {
    it('should correctly convert to a year in the 西晉 dynasty', () => {
      const result = convertYear(265);
      expect(result).toContainEqual({
        dynasty: Dynasty.XI_JIN, dynasty_name: '西晉',
        reign_title: '泰始',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 東晉 dynasty', () => {
      const result = convertYear(317);
      expect(result).toContainEqual({
        dynasty: Dynasty.DONG_JIN, dynasty_name: '東晉',
        reign_title: '建武',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('南北朝', () => {
    it('should correctly convert to a year in the 劉宋 dynasty', () => {
      const result = convertYear(420, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.LIU_SONG, dynasty_name: '劉宋',
        reign_title: '永初',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 南齊 dynasty', () => {
      const result = convertYear(479, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.NAN_QI, dynasty_name: '南齊',
        reign_title: '建元',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 梁 dynasty', () => {
      const result = convertYear(502, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.NAN_LIANG, dynasty_name: '梁',
        reign_title: '天監',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 陳 dynasty', () => {
      const result = convertYear(557, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.CHEN, dynasty_name: '陳',
        reign_title: '永定',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 北魏 dynasty', () => {
      const result = convertYear(386, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.BEI_WEI, dynasty_name: '北魏',
        reign_title: '登國',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 東魏 dynasty', () => {
      const result = convertYear(534, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.DONG_WEI, dynasty_name: '東魏',
        reign_title: '天平',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 西魏 dynasty', () => {
      const result = convertYear(535, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.XI_WEI, dynasty_name: '西魏',
        reign_title: '大統',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 北齊 dynasty', () => {
      const result = convertYear(550, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.BEI_QI, dynasty_name: '北齊',
        reign_title: '天保',
        year: 1,
        year_num: '元年',
      });
    });

    it('should correctly convert to a year in the 北周 dynasty', () => {
      const result = convertYear(559, { mode: 'all' });
      expect(result).toContainEqual({
        dynasty: Dynasty.BEI_ZHOU, dynasty_name: '北周',
        reign_title: '武成',
        year: 1,
        year_num: '元年',
      });
    });
  });
});

describe('Options Tests', () => {
  describe('mode option', () => {
    it('should return mainline dynasty by default (mode: mainline)', () => {
      // 618年隋唐交替，唐为正统
      const result = convertYear(618);
      expect(result).toEqual([
        { dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }
      ]);
    });

    it('should return all dynasties when mode is "all"', () => {
      // 618年有多个政权并存
      const result = convertYear(618, { mode: 'all' });
      expect(result).toHaveLength(4);
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '大業',
        year: 14,
        year_num: '十四年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.TANG,
        dynasty_name: '唐',
        reign_title: '武德',
        year: 1,
        year_num: '元年',
      });
    });

    it('should return mainline dynasty for Three Kingdoms period (Wei)', () => {
      // 221年三国时期，魏为正统
      const result = convertYear(221);
      expect(result).toEqual([
        { dynasty: Dynasty.SAN_GUO_WEI, dynasty_name: '魏', reign_title: '黃初', year: 2, year_num: '二年' }
      ]);
    });

    it('should return all Three Kingdoms when mode is "all"', () => {
      const result = convertYear(221, { mode: 'all' });
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result).toContainEqual({
        dynasty: Dynasty.SAN_GUO_WEI,
        dynasty_name: '魏',
        reign_title: '黃初',
        year: 2,
        year_num: '二年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.SAN_GUO_SHU,
        dynasty_name: '蜀漢',
        reign_title: '章武',
        year: 1,
        year_num: '元年',
      });
    });

    it('should return mainline dynasty for Song-Liao period (Song)', () => {
      // 1000年宋辽并立，宋为正统
      const result = convertYear(1000);
      expect(result).toEqual([
        { dynasty: Dynasty.SONG, dynasty_name: '宋', reign_title: '咸平', year: 3, year_num: '三年' }
      ]);
    });

    it('should return all dynasties for Song-Liao period when mode is "all"', () => {
      const result = convertYear(1000, { mode: 'all' });
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result).toContainEqual({
        dynasty: Dynasty.SONG,
        dynasty_name: '宋',
        reign_title: '咸平',
        year: 3,
        year_num: '三年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.LIAO,
        dynasty_name: '遼',
        reign_title: '統和',
        year: 18,
        year_num: '十八年',
      });
    });

    it('should return Tang for Wu Zhou period by default', () => {
      // 690年武周建立，但唐为正统
      const result = convertYear(690);
      expect(result).toEqual([
        { dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' }
      ]);
    });

    it('should return both Tang and Wu Zhou when mode is "all"', () => {
      const result = convertYear(690, { mode: 'all' });
      expect(result).toHaveLength(2);
      expect(result).toContainEqual({
        dynasty: Dynasty.TANG,
        dynasty_name: '唐',
        reign_title: '載初',
        year: 2,
        year_num: '二年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.WU_ZHOU,
        dynasty_name: '武周',
        reign_title: '天授',
        year: 1,
        year_num: '元年',
      });
    });
  });

  describe('dynasty filter option', () => {
    it('should filter by specific dynasty', () => {
      // 618年过滤只看隋朝
      const result = convertYear(618, { dynasty: Dynasty.SUI });
      expect(result).toHaveLength(3);
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '大業',
        year: 14,
        year_num: '十四年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '義寧',
        year: 2,
        year_num: '二年',
      });
      expect(result).toContainEqual({
        dynasty: Dynasty.SUI,
        dynasty_name: '隋',
        reign_title: '皇泰',
        year: 1,
        year_num: '元年',
      });
      // 不应该包含唐
      expect(result.every(r => r.dynasty === Dynasty.SUI)).toBe(true);
    });

    it('should filter by Tang dynasty', () => {
      const result = convertYear(618, { dynasty: Dynasty.TANG });
      expect(result).toEqual([
        { dynasty: Dynasty.TANG, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }
      ]);
    });

    it('should filter by Liao dynasty in Song-Liao period', () => {
      const result = convertYear(1000, { dynasty: Dynasty.LIAO });
      expect(result).toEqual([
        { dynasty: Dynasty.LIAO, dynasty_name: '遼', reign_title: '統和', year: 18, year_num: '十八年' }
      ]);
    });

    it('should return empty when filtering by non-existent dynasty for that year', () => {
      const result = convertYear(1000, { dynasty: Dynasty.MING });
      expect(result).toEqual([]);
    });

    it('should filter ROC correctly', () => {
      const result = convertYear(1912, { dynasty: Dynasty.ROC });
      expect(result).toEqual([
        { dynasty: Dynasty.ROC, dynasty_name: '中華民國', reign_title: '民國', year: 1, year_num: '元年' }
      ]);
    });

    it('should not return ROC when filtering by Qing', () => {
      const result = convertYear(1912, { dynasty: Dynasty.QING });
      expect(result).toEqual([
        { dynasty: Dynasty.QING, dynasty_name: '清', reign_title: '宣統', year: 4, year_num: '四年' }
      ]);
    });
  });

  describe('combined options', () => {
    it('should apply dynasty filter even when mode is "all"', () => {
      // mode: 'all' + dynasty filter 应该只返回该朝代的所有年号
      const result = convertYear(618, { mode: 'all', dynasty: Dynasty.SUI });
      expect(result).toHaveLength(3);
      expect(result.every(r => r.dynasty === Dynasty.SUI)).toBe(true);
    });

    it('should apply dynasty filter with mainline mode', () => {
      // dynasty filter takes precedence over mainline mode
      const result = convertYear(690, { mode: 'mainline', dynasty: Dynasty.WU_ZHOU });
      expect(result).toEqual([
        { dynasty: Dynasty.WU_ZHOU, dynasty_name: '武周', reign_title: '天授', year: 1, year_num: '元年' }
      ]);
    });
  });
});