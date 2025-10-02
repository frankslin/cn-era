import { describe, it, expect } from 'vitest';
import { convertYear } from '../src/index';

describe('convertYear', () => {
  it('应该正确转换唐朝武德元年', () => {
    const result = convertYear(618);
    expect(result).toEqual([
      { dynasty: '唐', reign_title: '武德', year_num: '元年' },
    ]);
  });

  it('应该正确转换唐朝武德三年', () => {
    const result = convertYear(620);
    expect(result).toEqual([
      { dynasty: '唐', reign_title: '武德', year_num: '三年' },
    ]);
  });

  it('应该正确转换唐朝贞观元年', () => {
    const result = convertYear(627);
    expect(result).toEqual([
      { dynasty: '唐', reign_title: '貞觀', year_num: '元年' },
    ]);
  });

  it('应该处理改元年份（一年内多个年号）', () => {
    const result = convertYear(690);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: '唐',
      reign_title: '載初',
      year_num: '二年',
    });
    expect(result).toContainEqual({
      dynasty: '武周',
      reign_title: '天授',
      year_num: '元年',
    });
  });

  it('应该返回空数组当年份不在数据范围内', () => {
    const result = convertYear(908);
    expect(result).toEqual([]);
  });

  it('应该正确转换民国元年', () => {
    const result = convertYear(1912);
    expect(result).toEqual([
      { dynasty: '中華民國', reign_title: '民國', year_num: '元年' },
    ]);
  });

  it('应该正确转换民国年份', () => {
    const result = convertYear(2024);
    expect(result).toEqual([
      { dynasty: '中華民國', reign_title: '民國', year_num: '一百一十三年' },
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
      dynasty: '唐',
      reign_title: '開元',
      year_num: '元年',
    });
  });

  it('应该正确转换天宝年间', () => {
    const result = convertYear(742);
    expect(result).toContainEqual({
      dynasty: '唐',
      reign_title: '天寶',
      year_num: '元年',
    });
  });

  it('应该正确转换安史之乱年份', () => {
    const result = convertYear(756);
    expect(result).toContainEqual({
      dynasty: '唐',
      reign_title: '至德',
      year_num: '元年',
    });
  });

  it('应该正确转换唐朝末年', () => {
    const result = convertYear(907);
    expect(result).toEqual([
      { dynasty: '唐', reign_title: '天祐', year_num: '四年' },
    ]);
  });

  it('应该正确处理712年改元（多个年号）', () => {
    const result = convertYear(712);
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result).toContainEqual({
      dynasty: '唐',
      reign_title: '太極',
      year_num: '元年',
    });
    expect(result).toContainEqual({
      dynasty: '唐',
      reign_title: '延和',
      year_num: '元年',
    });
  });

  // 宋朝测试
  it('应该正确转换宋朝建隆元年', () => {
    const result = convertYear(960);
    expect(result).toEqual([
      { dynasty: '宋', reign_title: '建隆', year_num: '元年' },
    ]);
  });

  it('应该正确转换宋朝乾德年间', () => {
    const result = convertYear(965);
    expect(result).toEqual([
      { dynasty: '宋', reign_title: '乾德', year_num: '三年' },
    ]);
  });

  it('应该正确转换北宋盛世年份', () => {
    const result = convertYear(1000);
    expect(result).toEqual([
      { dynasty: '宋', reign_title: '咸平', year_num: '三年' },
    ]);
  });

  it('应该正确转换北宋末年靖康之难', () => {
    const result = convertYear(1127);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: '宋',
      reign_title: '靖康',
      year_num: '二年',
    });
    expect(result).toContainEqual({
      dynasty: '宋',
      reign_title: '建炎',
      year_num: '元年',
    });
  });

  it('应该正确转换南宋绍兴年间', () => {
    const result = convertYear(1142);
    expect(result).toEqual([
      { dynasty: '宋', reign_title: '紹興', year_num: '十二年' },
    ]);
  });

  it('应该正确转换南宋末年', () => {
    const result = convertYear(1279);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: '宋',
      reign_title: '祥興',
      year_num: '二年',
    });
    expect(result).toContainEqual({
      dynasty: '元',
      reign_title: '至元',
      year_num: '十六年',
    });
  });

  // 元朝测试
  it('应该正确转换元朝中统元年', () => {
    const result = convertYear(1260);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: '元',
      reign_title: '中統',
      year_num: '元年',
    });
  });

  it('应该正确转换元朝至元年间', () => {
    const result = convertYear(1280);
    expect(result).toEqual([
      { dynasty: '元', reign_title: '至元', year_num: '十七年' },
    ]);
  });

  it('应该正确转换元朝末年', () => {
    const result = convertYear(1368);
    expect(result).toContainEqual({
      dynasty: '元',
      reign_title: '至正',
      year_num: '二十八年',
    });
  });

  // 明朝测试
  it('应该正确转换明朝洪武元年', () => {
    const result = convertYear(1368);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: '明',
      reign_title: '洪武',
      year_num: '元年',
    });
  });

  it('应该正确转换明朝永乐年间', () => {
    const result = convertYear(1410);
    expect(result).toEqual([
      { dynasty: '明', reign_title: '永樂', year_num: '八年' },
    ]);
  });

  it('应该正确转换明朝万历年间', () => {
    const result = convertYear(1600);
    expect(result).toEqual([
      { dynasty: '明', reign_title: '萬曆', year_num: '二十八年' },
    ]);
  });

  it('应该正确转换明朝末年', () => {
    const result = convertYear(1644);
    expect(result).toContainEqual({
      dynasty: '明',
      reign_title: '崇禎',
      year_num: '十七年',
    });
  });

  // 清朝测试
  it('应该正确转换清朝顺治元年', () => {
    const result = convertYear(1644);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      dynasty: '清',
      reign_title: '順治',
      year_num: '元年',
    });
  });

  it('应该正确转换清朝康熙年间', () => {
    const result = convertYear(1700);
    expect(result).toEqual([
      { dynasty: '清', reign_title: '康熙', year_num: '三十九年' },
    ]);
  });

  it('应该正确转换清朝乾隆年间', () => {
    const result = convertYear(1750);
    expect(result).toEqual([
      { dynasty: '清', reign_title: '乾隆', year_num: '十五年' },
    ]);
  });

  it('应该正确转换清朝光绪年间', () => {
    const result = convertYear(1900);
    expect(result).toEqual([
      { dynasty: '清', reign_title: '光緒', year_num: '二十六年' },
    ]);
  });

  it('应该正确转换清朝末年', () => {
    const result = convertYear(1911);
    expect(result).toEqual([
      { dynasty: '清', reign_title: '宣統', year_num: '三年' },
    ]);
  });
});
