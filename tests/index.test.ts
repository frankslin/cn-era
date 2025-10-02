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
      dynasty: '周',
      reign_title: '天授',
      year_num: '元年',
    });
  });

  it('应该返回空数组当年份不在数据范围内', () => {
    const result = convertYear(1000);
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
});
