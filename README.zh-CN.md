# cn-era

[![npm version](https://img.shields.io/npm/v/cn-era.svg)](https://www.npmjs.com/package/cn-era)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 将公元年份转换为中国历史年号纪年

一个轻量级的 JavaScript/TypeScript 库，用于将公元年份转换为对应的中国历史朝代年号和年份。

[English](./README.md)

## 当前状态

**正式版本 (v0.4.0)**

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

- **智能主线模式**：自动返回正统朝代年号，实用性更强（v0.3.0 新增）
- **朝代枚举系统**：使用标准化的 CBDB（中国历代人物传记数据库）朝代编码，可靠识别（v0.3.0 新增）
- **灵活查询**：可按朝代筛选或查看所有并存政权（v0.3.0 新增）
- **精确的年号转换**：支持从公元前140年至今的历史年号
- **完整的历史数据**：涵盖中国历史各主要朝代（498个年号）
- **多年号支持**：处理同一年份多个年号并存的情况
- **零依赖**：无需额外安装其他包
- **TypeScript 支持**：提供完整的类型定义
- **轻量化**：体积小巧（~37KB minified），不影响项目大小
- **繁体输出**：所有年号使用繁体中文，符合历史文献原貌

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
import { convertYear, Dynasty } from 'cn-era';

// 基础用法 - 默认返回主线朝代
const result = convertYear(618);
console.log(result);
// 输出: [{ dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }]
```

**CommonJS**

```javascript
const { convertYear, Dynasty } = require('cn-era');

const result = convertYear(618);
console.log(result);
// 输出: [{ dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }]
```

**浏览器/CDN（jsDelivr 或 unpkg）**

```html
<!-- 从 jsDelivr 加载 -->
<script src="https://cdn.jsdelivr.net/npm/cn-era@0.3.1/dist/index.global.js"></script>

<!-- 或从 unpkg 加载 -->
<script src="https://unpkg.com/cn-era@0.3.1/dist/index.global.js"></script>

<script>
  // 通过全局对象 CnEra 访问
  const { convertYear, Dynasty } = CnEra;

  const result = convertYear(618);
  console.log(result);
  // 输出: [{ dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }]
</script>
```

**更多示例**

```javascript
import { convertYear, Dynasty } from 'cn-era';

// 默认模式：只返回主线/正统朝代
convertYear(690);
// [{ dynasty: 6, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' }]

// 查看所有并存年号（包括武周）
convertYear(690, { mode: 'all' });
// [
//   { dynasty: 6, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' },
//   { dynasty: 77, dynasty_name: '武周', reign_title: '天授', year: 1, year_num: '元年' }
// ]

// 使用朝代枚举筛选特定朝代
convertYear(618, { dynasty: Dynasty.SUI });
// [
//   { dynasty: 5, dynasty_name: '隋', reign_title: '大業', year: 14, year_num: '十四年' },
//   { dynasty: 5, dynasty_name: '隋', reign_title: '義寧', year: 2, year_num: '二年' },
//   { dynasty: 5, dynasty_name: '隋', reign_title: '皇泰', year: 1, year_num: '元年' }
// ]

// 民国纪年
convertYear(2024);
// [{ dynasty: 21, dynasty_name: '中華民國', reign_title: '民國', year: 113, year_num: '一百一十三年' }]
```

## API 文档

### `convertYear(year: number, opts?: ConvertYearOptions): EraResult[]`

将公元年份转换为中国历史年号纪年。

#### 参数

- `year` (number): 公元年份（范围：-841 到 3000，0 不合法）
- `opts` (ConvertYearOptions, 可选): 转换选项
  - `mode?: 'mainline' | 'all'` - 转换模式（默认：`'mainline'`）
    - `'mainline'`：只返回正统/主线朝代（推荐用于大多数场景）
    - `'all'`：返回所有并存的年号，包括非正统政权
  - `dynasty?: Dynasty` - 使用朝代枚举筛选特定朝代

#### 返回值

返回一个数组，包含该年份对应的所有年号信息。

每个结果对象包含以下字段：

```typescript
interface EraResult {
  dynasty: Dynasty;     // 朝代枚举值（如 Dynasty.TANG = 6）
  dynasty_name: string; // 朝代中文名称，如 "唐"、"宋"
  reign_title: string;  // 年号，如 "武德"、"貞觀"
  year: number;         // 年份（数字），如 1、3
  year_num: string;     // 年份（如 "元年"、"三年"）
}

enum Dynasty {
  XI_HAN = 29,      // 西汉
  DONG_HAN = 25,    // 东汉
  SUI = 5,          // 隋
  TANG = 6,         // 唐
  SONG = 15,        // 宋
  YUAN = 18,        // 元
  MING = 19,        // 明
  QING = 20,        // 清
  ROC = 21,         // 中华民国
  // ... 更多朝代（详见 src/dynasty.ts）
}
```

#### 示例

```javascript
import { convertYear, Dynasty } from 'cn-era';

// 普通年份 - 主线模式（默认）
convertYear(627);
// [{ dynasty: 6, dynasty_name: '唐', reign_title: '貞觀', year: 1, year_num: '元年' }]

// 同一朝代改元
convertYear(626, { mode: 'all' });
// [
//   { dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 9, year_num: '九年' },
//   { dynasty: 6, dynasty_name: '唐', reign_title: '貞觀', year: 1, year_num: '元年' }
// ]

// 主线模式过滤到正统朝代（宋而非辽）
convertYear(1000);
// [{ dynasty: 15, dynasty_name: '宋', reign_title: '咸平', year: 3, year_num: '三年' }]

// all 模式显示并存政权
convertYear(1000, { mode: 'all' });
// [
//   { dynasty: 16, dynasty_name: '遼', reign_title: '統和', year: 18, year_num: '十八年' },
//   { dynasty: 15, dynasty_name: '宋', reign_title: '咸平', year: 3, year_num: '三年' }
// ]

// 按朝代筛选
convertYear(1000, { dynasty: Dynasty.LIAO });
// [{ dynasty: 16, dynasty_name: '遼', reign_title: '統和', year: 18, year_num: '十八年' }]

// 三国 - 主线模式返回魏（正统）
convertYear(221);
// [{ dynasty: 26, dynasty_name: '魏', reign_title: '黃初', year: 2, year_num: '二年' }]

// 三国 - all 模式显示并存政权
convertYear(221, { mode: 'all' });
// [
//   { dynasty: 26, dynasty_name: '魏', reign_title: '黃初', year: 2, year_num: '二年' },
//   { dynasty: 53, dynasty_name: '蜀漢', reign_title: '章武', year: 1, year_num: '元年' }
// ]

// 民国纪年
convertYear(1912, { mode: 'all' });
// [
//   { dynasty: 20, dynasty_name: '清', reign_title: '宣統', year: 4, year_num: '四年' },
//   { dynasty: 21, dynasty_name: '中華民國', reign_title: '民國', year: 1, year_num: '元年' }
// ]

// 公元前年份
convertYear(-140);
// [{ dynasty: 29, dynasty_name: '西漢', reign_title: '建元', year: 1, year_num: '元年' }]
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

1. **主线模式 vs All 模式**（v0.3.0 新增）：
   - **`mode: 'mainline'`**（默认）：只返回正统/主线朝代。适合大多数需要"标准"历史参考的场景。
   - **`mode: 'all'`**：返回所有并存的年号，包括非正统政权。适合详细的历史研究。
   - 示例：公元 1000 年，主线模式返回宋（宋），all 模式同时返回宋和辽（遼）。

2. **朝代枚举系统**（v0.3.0 新增）：
   - 朝代值现在使用 `Dynasty` 枚举表示，采用 CBDB 实体 ID
   - 每个结果同时包含 `dynasty`（枚举值）和 `dynasty_name`（中文名称）
   - 使用 `Dynasty.TANG`、`Dynasty.SONG` 等进行类型安全的朝代筛选

3. **改元情况**：某些年份会返回多个结果，通常发生在：
   - 皇帝改元（同一年内更换年号）
   - 朝代更替
   - 历史分裂时期的多个政权并存（使用 `mode: 'all'` 查看全部）

4. **年份范围**：目前支持 -140 到 3000 年，超出范围会抛出错误

5. **历史准确性**：年号数据基于主流历史记载，个别争议年份以通史为准。朝代优先级遵循正统历史传统。

6. **公元前年份**：负数表示公元前年份（如 -140 = 公元前140年，年号制度开始）

7. **繁体中文**：所有输出使用繁体中文字符，符合历史文献原貌。用户可根据需要转换为简体中文。

## 最近更新

### v0.4.0
- 在 `EraResult` 中增加了 `year: number` 字段，以返回数字年份。
- 更新了文档和示例。

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
