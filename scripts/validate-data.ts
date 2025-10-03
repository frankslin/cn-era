#!/usr/bin/env tsx
/**
 * 数据验证脚本
 * 检查历史年号数据的完整性和准确性
 */

import { eraData } from '../src/data/eras';
import type { EraData } from '../src/types';

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  era?: EraData;
}

const issues: ValidationIssue[] = [];

console.log('🔍 开始验证历史年号数据...\n');

// 1. 检查年份重叠（非改元情况）
console.log('1️⃣  检查年份重叠...');
const yearMap = new Map<number, EraData[]>();

eraData.forEach((era) => {
  for (let year = era.start_year; year <= era.end_year; year++) {
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)!.push(era);
  }
});

let overlapCount = 0;
yearMap.forEach((eras, year) => {
  if (eras.length > 1) {
    overlapCount++;
    // 检查是否是合理的重叠（同朝代改元或不同政权并存）
    const dynasties = new Set(eras.map((e) => e.dynasty));
    const isSameDynasty = dynasties.size === 1;

    if (isSameDynasty) {
      // 同朝代多个年号 - 改元，这是正常的
      issues.push({
        type: 'info',
        message: `年份 ${year}: ${eras[0].dynasty} 改元 (${eras.map((e) => e.reign_title).join(', ')})`,
      });
    } else {
      // 不同政权并存 - 也是正常的（如南北朝、宋辽金等）
      issues.push({
        type: 'info',
        message: `年份 ${year}: 多政权并存 (${eras.map((e) => `${e.dynasty}-${e.reign_title}`).join(', ')})`,
      });
    }
  }
});

console.log(`   发现 ${overlapCount} 个年份有多个年号（改元或政权并存）\n`);

// 2. 检查年份连续性
console.log('2️⃣  检查年份连续性...');
const sortedEras = [...eraData].sort((a, b) => a.start_year - b.start_year);

for (let i = 0; i < sortedEras.length - 1; i++) {
  const current = sortedEras[i];
  const next = sortedEras[i + 1];

  // 检查同朝代内的连续性
  if (current.dynasty === next.dynasty) {
    if (current.end_year + 1 < next.start_year) {
      issues.push({
        type: 'warning',
        message: `${current.dynasty} 朝代内有年份缺口: ${current.reign_title}(${current.end_year}) -> ${next.reign_title}(${next.start_year})`,
        era: current,
      });
    }
  }
}

// 3. 检查年份范围有效性
console.log('3️⃣  检查年份范围有效性...');
eraData.forEach((era) => {
  if (era.start_year > era.end_year) {
    issues.push({
      type: 'error',
      message: `起始年份大于结束年份: ${era.dynasty}-${era.reign_title} (${era.start_year} > ${era.end_year})`,
      era,
    });
  }

  if (era.start_year === 0 || era.end_year === 0) {
    issues.push({
      type: 'error',
      message: `年份包含0（公元0年不存在）: ${era.dynasty}-${era.reign_title}`,
      era,
    });
  }
});

// 4. 检查数据完整性
console.log('4️⃣  检查数据完整性...');
eraData.forEach((era, index) => {
  if (!era.dynasty || era.dynasty.trim() === '') {
    issues.push({
      type: 'error',
      message: `第 ${index + 1} 条记录缺少朝代名称`,
      era,
    });
  }

  if (!era.reign_title || era.reign_title.trim() === '') {
    issues.push({
      type: 'error',
      message: `第 ${index + 1} 条记录缺少年号`,
      era,
    });
  }
});

// 5. 统计覆盖范围
console.log('5️⃣  统计覆盖范围...');
const minYear = Math.min(...eraData.map((e) => e.start_year));
const maxYear = Math.max(...eraData.map((e) => e.end_year));
const totalEras = eraData.length;

console.log(`   总年号数量: ${totalEras}`);
console.log(`   覆盖范围: ${minYear} 至 ${maxYear}`);
console.log(`   跨越年份: ${maxYear - minYear + 1} 年\n`);

// 6. 按朝代统计
console.log('6️⃣  按朝代统计...');
const dynastyCount = new Map<string, number>();
eraData.forEach((era) => {
  dynastyCount.set(era.dynasty, (dynastyCount.get(era.dynasty) || 0) + 1);
});

const sortedDynasties = Array.from(dynastyCount.entries()).sort((a, b) => {
  const aEra = eraData.find((e) => e.dynasty === a[0])!;
  const bEra = eraData.find((e) => e.dynasty === b[0])!;
  return aEra.start_year - bEra.start_year;
});

sortedDynasties.forEach(([dynasty, count]) => {
  const eras = eraData.filter((e) => e.dynasty === dynasty);
  const minYear = Math.min(...eras.map((e) => e.start_year));
  const maxYear = Math.max(...eras.map((e) => e.end_year));
  console.log(`   ${dynasty.padEnd(8)} ${count.toString().padStart(3)} 个年号 (${minYear} ~ ${maxYear})`);
});

console.log('\n');

// 7. 检查特殊年份
console.log('7️⃣  检查关键历史年份...');
const keyYears = [
  { year: -140, desc: '汉武帝建元元年（年号制度开始）' },
  { year: 618, desc: '唐朝建立' },
  { year: 907, desc: '唐朝灭亡、五代开始' },
  { year: 960, desc: '宋朝建立' },
  { year: 1271, desc: '元朝建立' },
  { year: 1368, desc: '明朝建立' },
  { year: 1644, desc: '清朝建立' },
  { year: 1911, desc: '清朝灭亡' },
  { year: 1912, desc: '中华民国建立' },
];

keyYears.forEach(({ year, desc }) => {
  const eras = yearMap.get(year);
  if (!eras || eras.length === 0) {
    issues.push({
      type: 'warning',
      message: `关键年份 ${year} (${desc}) 无年号数据`,
    });
  } else {
    console.log(`   ✓ ${year}: ${desc} - ${eras.map((e) => `${e.dynasty}-${e.reign_title}`).join(', ')}`);
  }
});

console.log('\n');

// 8. 输出问题汇总
console.log('📋 问题汇总:\n');
const errors = issues.filter((i) => i.type === 'error');
const warnings = issues.filter((i) => i.type === 'warning');
const infos = issues.filter((i) => i.type === 'info');

if (errors.length > 0) {
  console.log(`❌ 错误 (${errors.length}):`);
  errors.forEach((issue) => {
    console.log(`   ${issue.message}`);
  });
  console.log('');
}

if (warnings.length > 0) {
  console.log(`⚠️  警告 (${warnings.length}):`);
  warnings.forEach((issue) => {
    console.log(`   ${issue.message}`);
  });
  console.log('');
}

console.log(`ℹ️  信息 (${infos.length}): ${infos.length} 个改元或政权并存情况\n`);

// 9. 总结
console.log('=' .repeat(60));
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 数据验证通过！未发现严重问题。');
} else if (errors.length === 0) {
  console.log(`⚠️  数据验证完成，发现 ${warnings.length} 个警告。`);
} else {
  console.log(`❌ 数据验证失败，发现 ${errors.length} 个错误和 ${warnings.length} 个警告。`);
  process.exit(1);
}
console.log('=' .repeat(60));
