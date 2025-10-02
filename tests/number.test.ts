import { describe, it, expect } from 'vitest';
import { numberToChinese } from '../src/utils/number';

describe('numberToChinese', () => {
  it('应该将 1 转换为"元年"', () => {
    expect(numberToChinese(1)).toBe('元年');
  });

  it('应该正确转换 2-10', () => {
    expect(numberToChinese(2)).toBe('二年');
    expect(numberToChinese(3)).toBe('三年');
    expect(numberToChinese(5)).toBe('五年');
    expect(numberToChinese(10)).toBe('十年');
  });

  it('应该正确转换 11-19', () => {
    expect(numberToChinese(11)).toBe('十一年');
    expect(numberToChinese(15)).toBe('十五年');
    expect(numberToChinese(19)).toBe('十九年');
  });

  it('应该正确转换 20-99', () => {
    expect(numberToChinese(20)).toBe('二十年');
    expect(numberToChinese(23)).toBe('二十三年');
    expect(numberToChinese(30)).toBe('三十年');
    expect(numberToChinese(45)).toBe('四十五年');
    expect(numberToChinese(61)).toBe('六十一年');
  });

  it('应该正确转换 100-999', () => {
    expect(numberToChinese(100)).toBe('一百年');
    expect(numberToChinese(101)).toBe('一百零一年');
    expect(numberToChinese(110)).toBe('一百一十年');
    expect(numberToChinese(113)).toBe('一百一十三年');
    expect(numberToChinese(200)).toBe('二百年');
    expect(numberToChinese(523)).toBe('五百二十三年');
  });

  it('应该正确转换 1000 以上', () => {
    expect(numberToChinese(1000)).toBe('一千年');
    expect(numberToChinese(1001)).toBe('一千零一年');
    expect(numberToChinese(1010)).toBe('一千零一十年');
    expect(numberToChinese(1089)).toBe('一千零八十九年');
    expect(numberToChinese(2024)).toBe('二千零二十四年');
  });
});
