# cn-era

[![npm version](https://img.shields.io/npm/v/cn-era.svg)](https://www.npmjs.com/package/cn-era)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Convert Gregorian calendar years to Chinese historical era names (年號)

A lightweight JavaScript/TypeScript library for converting Gregorian calendar years to corresponding Chinese dynasty era names and year numbers.

[中文文档](./README.zh-CN.md)

## Current Status

**Stable Release (v0.4.0)**

This library now includes **complete era name coverage from 140 BCE to present**, covering all major Chinese dynasties and regimes:

**Ancient Period:**
- **Western Han** (140 BCE - 8 CE) - Complete
- **Xin Dynasty** (9-23 CE) - Complete
- **Eastern Han** (25-220 CE) - Complete

**Three Kingdoms & Jin:**
- **Cao Wei** (220-265 CE) - Complete
- **Shu Han** (221-263 CE) - Complete
- **Eastern Wu** (222-280 CE) - Complete
- **Western Jin** (265-316 CE) - Complete
- **Eastern Jin** (317-420 CE) - Complete

**Northern and Southern Dynasties:**
- **Southern Dynasties**: Liu Song, Southern Qi, Liang, Chen (420-589 CE) - Complete
- **Northern Dynasties**: Northern Wei, Eastern Wei, Western Wei, Northern Qi, Northern Zhou (386-581 CE) - Complete

**Unified Dynasties:**
- **Sui Dynasty** (581-618 CE) - Complete
- **Tang Dynasty** (618-907 CE) - Complete
- **Wu Zhou** (690-705 CE) - Complete

**Five Dynasties and Ten Kingdoms:**
- **Five Dynasties**: Later Liang, Later Tang, Later Jin, Later Han, Later Zhou (907-960 CE) - Complete

**Medieval Period:**
- **Song Dynasty** (960-1279 CE) - Complete
- **Liao Dynasty** (916-1125 CE) - Complete (concurrent with Song)
- **Western Xia** (1038-1227 CE) - Complete (concurrent with Song)
- **Jin Dynasty** (1115-1234 CE) - Complete (concurrent with Song)
- **Yuan Dynasty** (1271-1368 CE) - Complete

**Late Imperial:**
- **Ming Dynasty** (1368-1644 CE) - Complete
- **Qing Dynasty** (1644-1912 CE) - Complete

**Modern:**
- **Republic of China** (1912-present) - Complete

**Total Coverage**: 498 historical era names spanning 2,164 years (140 BCE - 2024 CE)

## Features

- **Smart Mainline Mode**: Automatically returns the orthodox/mainline dynasty for practical use (new in v0.3.0)
- **Dynasty Enum System**: Uses standardized CBDB (China Biographical Database) dynasty codes for reliable identification (new in v0.3.0)
- **Flexible Querying**: Filter by specific dynasties or view all concurrent regimes (new in v0.3.0)
- **Accurate Era Conversion**: Supports historical era names from 140 BCE to present
- **Comprehensive Historical Data**: Covers all major Chinese dynasties (498 era names)
- **Multiple Era Support**: Handles cases where multiple era names coexist in the same year
- **Zero Dependencies**: No additional packages required
- **TypeScript Support**: Complete type definitions included
- **Lightweight**: Small bundle size (~37KB minified), minimal impact on your project
- **Traditional Chinese Output**: All era names in Traditional Chinese characters

## Installation

```bash
npm install cn-era
```

Or using yarn:

```bash
yarn add cn-era
```

Or using pnpm:

```bash
pnpm add cn-era
```

## Quick Start

**ESM (ES Modules)**

```javascript
import { convertYear, Dynasty } from 'cn-era';

// Basic usage - returns mainline dynasty by default
const result = convertYear(618);
console.log(result);
// Output: [{ dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }]
```

**CommonJS**

```javascript
const { convertYear, Dynasty } = require('cn-era');

const result = convertYear(618);
console.log(result);
// Output: [{ dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }]
```

**Browser/CDN (jsDelivr or unpkg)**

```html
<!-- Load from jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/cn-era@0.3.1/dist/index.global.js"></script>

<!-- Or from unpkg -->
<script src="https://unpkg.com/cn-era@0.3.1/dist/index.global.js"></script>

<script>
  // Access via global CnEra object
  const { convertYear, Dynasty } = CnEra;

  const result = convertYear(618);
  console.log(result);
  // Output: [{ dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 1, year_num: '元年' }]
</script>
```

**More Examples**

```javascript
import { convertYear, Dynasty } from 'cn-era';

// Default mode: returns only the mainline/orthodox dynasty
convertYear(690);
// [{ dynasty: 6, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' }]

// Get all concurrent eras (including Wu Zhou)
convertYear(690, { mode: 'all' });
// [
//   { dynasty: 6, dynasty_name: '唐', reign_title: '載初', year: 2, year_num: '二年' },
//   { dynasty: 77, dynasty_name: '武周', reign_title: '天授', year: 1, year_num: '元年' }
// ]

// Filter by specific dynasty using Dynasty enum
convertYear(618, { dynasty: Dynasty.SUI });
// [
//   { dynasty: 5, dynasty_name: '隋', reign_title: '大業', year: 14, year_num: '十四年' },
//   { dynasty: 5, dynasty_name: '隋', reign_title: '義寧', year: 2, year_num: '二年' },
//   { dynasty: 5, dynasty_name: '隋', reign_title: '皇泰', year: 1, year_num: '元年' }
// ]

// Republic of China era (post-1912)
convertYear(2024);
// [{ dynasty: 21, dynasty_name: '中華民國', reign_title: '民國', year: 113, year_num: '一百一十三年' }]
```

## API Documentation

### `convertYear(year: number, opts?: ConvertYearOptions): EraResult[]`

Convert a Gregorian calendar year to Chinese historical era name(s).

#### Parameters

- `year` (number): Gregorian calendar year (range: -841 to 3000, 0 is invalid)
- `opts` (ConvertYearOptions, optional): Conversion options
  - `mode?: 'mainline' | 'all'` - Conversion mode (default: `'mainline'`)
    - `'mainline'`: Returns only the orthodox/mainline dynasty (recommended for most use cases)
    - `'all'`: Returns all concurrent eras including non-orthodox regimes
  - `dynasty?: Dynasty` - Filter by specific dynasty using Dynasty enum

#### Returns

Returns an array containing all era information for that year.

Each result object contains the following fields:

```typescript
interface EraResult {
  dynasty: Dynasty;     // Dynasty enum value (e.g., Dynasty.TANG = 6)
  dynasty_name: string; // Dynasty name in Chinese, e.g., "唐", "宋"
  reign_title: string;  // Era name, e.g., "武德", "貞觀"
  year: number;         // Year in era (numeric), e.g., 1, 3
  year_num: string;     // Year in era (Chinese), e.g., "元年", "三年"
}

enum Dynasty {
  XI_HAN = 29,      // Western Han
  DONG_HAN = 25,    // Eastern Han
  SUI = 5,          // Sui
  TANG = 6,         // Tang
  SONG = 15,        // Song
  YUAN = 18,        // Yuan
  MING = 19,        // Ming
  QING = 20,        // Qing
  ROC = 21,         // Republic of China
  // ... and more (see src/dynasty.ts for full list)
}
```

#### Examples

```javascript
import { convertYear, Dynasty } from 'cn-era';

// Regular year - mainline mode (default)
convertYear(627);
// [{ dynasty: 6, dynasty_name: '唐', reign_title: '貞觀', year: 1, year_num: '元年' }]

// Era change within same dynasty
convertYear(626, { mode: 'all' });
// [
//   { dynasty: 6, dynasty_name: '唐', reign_title: '武德', year: 9, year_num: '九年' },
//   { dynasty: 6, dynasty_name: '唐', reign_title: '貞觀', year: 1, year_num: '元年' }
// ]

// Mainline mode filters to orthodox dynasty (Song, not Liao)
convertYear(1000);
// [{ dynasty: 15, dynasty_name: '宋', reign_title: '咸平', year: 3, year_num: '三年' }]

// All mode shows concurrent regimes
convertYear(1000, { mode: 'all' });
// [
//   { dynasty: 16, dynasty_name: '遼', reign_title: '統和', year: 18, year_num: '十八年' },
//   { dynasty: 15, dynasty_name: '宋', reign_title: '咸平', year: 3, year_num: '三年' }
// ]

// Filter by specific dynasty
convertYear(1000, { dynasty: Dynasty.LIAO });
// [{ dynasty: 16, dynasty_name: '遼', reign_title: '統和', year: 18, year_num: '十八年' }]

// Three Kingdoms - mainline returns Wei (orthodox)
convertYear(221);
// [{ dynasty: 26, dynasty_name: '魏', reign_title: '黃初', year: 2, year_num: '二年' }]

// Three Kingdoms - all mode shows concurrent states
convertYear(221, { mode: 'all' });
// [
//   { dynasty: 26, dynasty_name: '魏', reign_title: '黃初', year: 2, year_num: '二年' },
//   { dynasty: 53, dynasty_name: '蜀漢', reign_title: '章武', year: 1, year_num: '元年' }
// ]

// Republic of China
convertYear(1912, { mode: 'all' });
// [
//   { dynasty: 20, dynasty_name: '清', reign_title: '宣統', year: 4, year_num: '四年' },
//   { dynasty: 21, dynasty_name: '中華民國', reign_title: '民國', year: 1, year_num: '元年' }
// ]

// BCE year
convertYear(-140);
// [{ dynasty: 29, dynasty_name: '西漢', reign_title: '建元', year: 1, year_num: '元年' }]
```

## Supported Historical Periods

This library supports era name conversion from **Western Zhou Gonghe Regency (841 BCE)** to **Republic of China (1912-)**, covering:

- Qin Dynasty, Han Dynasty (Western Han, Eastern Han)
- Three Kingdoms (Wei, Shu, Wu)
- Jin Dynasty (Western Jin, Eastern Jin), Northern and Southern Dynasties
- Sui Dynasty, Tang Dynasty
- Five Dynasties and Ten Kingdoms
- Song, Liao, Jin, Western Xia (coexisting regimes)
- Yuan Dynasty
- Ming Dynasty
- Qing Dynasty
- Republic of China (1912-)

## Use Cases

- Historical research: Quickly look up era names for historical events
- Game development: Time systems for historical-themed games
- Cultural applications: Classical text reading, historical education apps
- Date conversion: Convert between Gregorian and traditional Chinese calendar
- Content creation: Automatically annotate historical content with era names

## Important Notes

1. **Mainline vs All Mode** (New in v0.3.0):
   - **`mode: 'mainline'`** (default): Returns only the orthodox/mainline dynasty. Best for most use cases where you want the "standard" historical reference.
   - **`mode: 'all'`**: Returns all concurrent eras including non-orthodox regimes. Useful for detailed historical research.
   - Example: In year 1000, mainline mode returns Song (宋), while all mode returns both Song and Liao (遼).

2. **Dynasty Enum System** (New in v0.3.0):
   - Dynasty values are now represented by `Dynasty` enum using CBDB entity IDs
   - Each result includes both `dynasty` (enum value) and `dynasty_name` (Chinese name)
   - Use `Dynasty.TANG`, `Dynasty.SONG`, etc. for type-safe dynasty filtering

3. **Era Changes**: Years with multiple results typically occur when:
   - Emperor changes era name (multiple era names within the same year)
   - Dynasty transitions
   - Coexisting regimes during periods of division (use `mode: 'all'` to see all)

4. **Year Range**: Currently supports -140 to 3000 CE. Years outside this range will throw an error.

5. **Historical Accuracy**: Era name data is based on mainstream historical records. Disputed years follow standard histories. Dynasty priorities follow orthodox historical tradition.

6. **BCE Years**: Negative numbers represent BCE years (e.g., -140 = 140 BCE, first year with era names)

7. **Traditional Chinese**: All output is in Traditional Chinese characters, which matches historical documents. Users can convert to Simplified Chinese as needed.

## Recent Changes

### v0.4.0
- Added `year: number` to `EraResult` to return numeric year values.
- Updated documentation and examples.

## Development

```bash
# Clone repository
git clone https://github.com/frankslin/cn-era.git

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Contributing

Issues and Pull Requests are welcome!

If you find any errors in historical data, please provide reliable historical sources.

## License

[MIT](LICENSE)

## Acknowledgments

Thanks to all scholars and open-source contributors who have contributed to Chinese historical research.

---

If this project helps you, feel free to Star it!
