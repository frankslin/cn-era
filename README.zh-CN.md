# cn-era

[![npm version](https://badge.fury.io/js/cn-era.svg)](https://www.npmjs.com/package/cn-era)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 将公元年份转换为中国历史年号纪年

一个轻量级的 JavaScript/TypeScript 库，用于将公元年份转换为对应的中国历史朝代年号和年份。

[English](./README.md)

## 当前状态

**测试版本 (v0.2.0)**

本库现已包含**从公元前140年至今的完整年号覆盖**，涵盖中国历史所有主要朝代和政权：

**上古时期：**
- **西汉**（公元前140年 - 公元8年）- 已完成
- **新朝**（9-23年）- 已完成
- **东汉**（25-220年）- 已完成

**三国两晋：**
- **曹魏**（220-265年）- 已完成
- **蜀汉**（221-263年）- 已完成
- **孙吴**（222-280年）- 已完成
- **西晋**（265-316年）- 已完成
- **东晋**（317-420年）- 已完成

**南北朝：**
- **南朝**：刘宋、南齐、梁、陈（420-589年）- 已完成
- **北朝**：北魏、东魏、西魏、北齐、北周（386-581年）- 已完成

**大一统王朝：**
- **隋朝**（581-618年）- 已完成
- **唐朝**（618-907年）- 已完成
- **武周**（690-705年）- 已完成

**五代十国：**
- **五代**：后梁、后唐、后晋、后汉、后周（907-960年）- 已完成

**中古时期：**
- **宋朝**（960-1279年）- 已完成
- **辽朝**（916-1125年）- 已完成（与宋并存）
- **西夏**（1038-1227年）- 已完成（与宋并存）
- **金朝**（1115-1234年）- 已完成（与宋并存）
- **元朝**（1271-1368年）- 已完成

**近古时期：**
- **明朝**（1368-1644年）- 已完成
- **清朝**（1644-1912年）- 已完成

**近现代：**
- **中华民国**（1912年至今）- 已完成

**总覆盖范围**：498个历史年号，跨越2164年（公元前140年 - 公元2024年）

## 特性

- 精确的年号转换：支持从秦朝到清朝的历史年号
- 完整的历史数据：涵盖中国历史各主要朝代
- 多年号支持：处理同一年份多个年号并存的情况（如改元）
- 零依赖：无需额外安装其他包
- TypeScript 支持：提供完整的类型定义
- 轻量化：体积小巧，不影响项目大小
- 繁体输出：所有年号使用繁体中文，符合历史文献原貌

## 安装

```bash
npm install cn-era
```

或使用 yarn:

```bash
yarn add cn-era
```

或使用 pnpm:

```bash
pnpm add cn-era
```

## 快速开始

**ESM (ES Modules)**

```javascript
import { convertYear } from 'cn-era';

// 基础用法
const result = convertYear(618);
console.log(result);
// 输出: [{ dynasty: '唐', reign_title: '武德', year_num: '元年' }]
```

**CommonJS**

```javascript
const { convertYear } = require('cn-era');

const result = convertYear(618);
console.log(result);
// 输出: [{ dynasty: '唐', reign_title: '武德', year_num: '元年' }]
```

**更多示例**

```javascript
import { convertYear } from 'cn-era';

// 多个年号的情况（改元年份）
convertYear(690);
// [
//   { dynasty: '唐', reign_title: '載初', year_num: '二年' },
//   { dynasty: '武周', reign_title: '天授', year_num: '元年' }
// ]

// 民国纪年
convertYear(2024);
// [{ dynasty: '中華民國', reign_title: '民國', year_num: '一百一十三年' }]
```

## API 文档

### `convertYear(year: number): EraResult[]`

将公元年份转换为中国历史年号纪年。

#### 参数

- `year` (number): 公元年份，必须是正整数

#### 返回值

返回一个数组，包含该年份对应的所有年号信息（某些年份可能有多个年号）。

每个结果对象包含以下字段：

```typescript
interface EraResult {
  dynasty: string;      // 朝代名称，如 "唐"、"宋"
  reign_title: string;  // 年号，如 "武德"、"贞观"
  year_num: string;     // 年份，如 "元年"、"三年"
}
```

#### 示例

```javascript
// 普通年份
convertYear(627);
// [{ dynasty: '唐', reign_title: '贞观', year_num: '元年' }]

// 改元年份（一年内有多个年号）
convertYear(626);
// [
//   { dynasty: '唐', reign_title: '武德', year_num: '九年' },
//   { dynasty: '唐', reign_title: '贞观', year_num: '元年' }
// ]

// 南北朝等分裂时期（多个政权并存）
convertYear(420);
// [
//   { dynasty: '南朝宋', reign_title: '永初', year_num: '元年' },
//   { dynasty: '北魏', reign_title: '泰常', year_num: '五年' }
// ]
```

## 使用场景

- 历史研究：快速查询历史事件对应的年号
- 游戏开发：古风游戏中的时间系统
- 文化应用：古籍阅读、历史教育应用
- 日期转换：公历与中国传统纪年互转
- 内容创作：自动为历史内容标注年号

## 支持的朝代范围

本库支持从 **秦朝（公元前 221 年）** 到 **清朝（公元 1912 年）** 的年号转换，涵盖：

- 秦朝、汉朝（西汉、东汉）
- 三国（魏、蜀、吴）
- 晋朝（西晋、东晋）、南北朝
- 隋朝、唐朝
- 五代十国
- 宋朝（北宋、南宋）、辽、金、西夏
- 元朝
- 明朝
- 清朝

## 注意事项

1. **改元情况**：某些年份会返回多个结果，这通常发生在：
   - 皇帝改元（同一年内更换年号）
   - 朝代更替
   - 历史分裂时期的多个政权并存

2. **年份范围**：目前支持公元前 221 年到公元 1912 年，超出范围会返回空数组

3. **历史准确性**：年号数据基于主流历史记载，个别争议年份以通史为准

## 开发

```bash
# 克隆仓库
git clone https://github.com/frankslin/cn-era.git

# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build
```

## 贡献

欢迎提交 Issue 和 Pull Request！

如果发现历史数据有误，请提供可靠的历史文献来源。

## 许可证

[MIT](LICENSE)

## 致谢

感谢所有为中国历史研究做出贡献的学者和开源贡献者。

---

如果这个项目对你有帮助，欢迎 Star 支持！
