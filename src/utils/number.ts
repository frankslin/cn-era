/**
 * 中文数字映射
 */
const chineseNumbers: { [key: number]: string } = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
};

/**
 * 将阿拉伯数字转换为中文年份表示
 * @param num 数字（1-9999）
 * @returns 中文表示，如 "元年"、"三年"、"一百二十三年"
 */
export function numberToChinese(num: number): string {
  if (num === 1) {
    return '元年';
  }

  if (num < 1 || num > 9999) {
    throw new Error('数字必须在 1-9999 之间');
  }

  let result = '';

  // 千位
  const thousands = Math.floor(num / 1000);
  if (thousands > 0) {
    result += `${chineseNumbers[thousands]}千`;
  }

  // 百位
  const hundreds = Math.floor((num % 1000) / 100);
  if (hundreds > 0) {
    result += `${chineseNumbers[hundreds]}百`;
  } else if (thousands > 0 && (num % 100) > 0) {
    result += '零';
  }

  // 十位
  const tens = Math.floor((num % 100) / 10);
  if (tens > 0) {
    if (tens === 1 && num < 20 && num >= 10) {
      // 10-19 的情况
      result += '十';
    } else {
      // 其他情况
      result += `${chineseNumbers[tens]}十`;
    }
  } else if (hundreds > 0 && (num % 10) > 0) {
    if (!result.endsWith('零')) {
      result += '零';
    }
  }

  // 个位
  const ones = num % 10;
  if (ones > 0) {
    result += chineseNumbers[ones];
  }

  return `${result}年`;
}
