# cn-era

[![npm version](https://badge.fury.io/js/cn-era.svg)](https://www.npmjs.com/package/cn-era)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Convert Gregorian calendar years to Chinese historical era names (年號)

A lightweight JavaScript/TypeScript library for converting Gregorian calendar years to corresponding Chinese dynasty era names and year numbers.

[中文文档](./README.zh-CN.md)

## Current Status

**Early Development (v0.1.0)**

This library is in early development. Currently includes:
- **Tang Dynasty** - Complete (618-907 CE)
- **Wu Zhou** - Complete (684-705 CE)
- **Song Dynasty** - Complete (960-1279 CE)
- **Yuan Dynasty** - Complete (1260-1368 CE)
- **Ming Dynasty** - Complete (1368-1644 CE)
- **Qing Dynasty** - Complete (1644-1911 CE)
- **Republic of China** - Complete (1912-present)

We are actively working on adding complete historical era data for other dynasties. Contributions are welcome! See [TODO.md](TODO.md) for the data completion roadmap.

## Features

- Accurate era conversion: Supports historical era names from Qin Dynasty to Qing Dynasty
- Comprehensive historical data: Covers all major Chinese dynasties
- Multiple era support: Handles cases where multiple era names coexist in the same year (e.g., era changes)
- Zero dependencies: No additional packages required
- TypeScript support: Complete type definitions included
- Lightweight: Small bundle size, minimal impact on your project
- Traditional Chinese output: All era names in Traditional Chinese characters

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
import { convertYear } from 'cn-era';

// Basic usage
const result = convertYear(618);
console.log(result);
// Output: [{ dynasty: '唐', reign_title: '武德', year_num: '元年' }]
```

**CommonJS**

```javascript
const { convertYear } = require('cn-era');

const result = convertYear(618);
console.log(result);
// Output: [{ dynasty: '唐', reign_title: '武德', year_num: '元年' }]
```

**More Examples**

```javascript
import { convertYear } from 'cn-era';

// Multiple eras in one year (era change)
convertYear(690);
// [
//   { dynasty: '唐', reign_title: '載初', year_num: '二年' },
//   { dynasty: '武周', reign_title: '天授', year_num: '元年' }
// ]

// Republic of China era (post-1912)
convertYear(2024);
// [{ dynasty: '中華民國', reign_title: '民國', year_num: '一百一十三年' }]
```

## API Documentation

### `convertYear(year: number): EraResult[]`

Convert a Gregorian calendar year to Chinese historical era name(s).

#### Parameters

- `year` (number): Gregorian calendar year (range: -841 to 3000, 0 is invalid)

#### Returns

Returns an array containing all era information for that year (some years may have multiple eras).

Each result object contains the following fields:

```typescript
interface EraResult {
  dynasty: string;      // Dynasty name, e.g., "唐", "宋"
  reign_title: string;  // Era name, e.g., "武德", "貞觀"
  year_num: string;     // Year in era, e.g., "元年", "三年"
}
```

#### Examples

```javascript
// Regular year
convertYear(627);
// [{ dynasty: '唐', reign_title: '貞觀', year_num: '元年' }]

// Era change year (multiple eras in one year)
convertYear(626);
// [
//   { dynasty: '唐', reign_title: '武德', year_num: '九年' },
//   { dynasty: '唐', reign_title: '貞觀', year_num: '元年' }
// ]

// Coexisting regimes (e.g., Northern and Southern Dynasties)
convertYear(420);
// [
//   { dynasty: '南朝宋', reign_title: '永初', year_num: '元年' },
//   { dynasty: '北魏', reign_title: '泰常', year_num: '五年' }
// ]

// Republic of China
convertYear(1912);
// [{ dynasty: '中華民國', reign_title: '民國', year_num: '元年' }]

// BCE year
convertYear(-140);
// [{ dynasty: '西漢', reign_title: '建元', year_num: '元年' }]
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

1. **Era changes**: Some years return multiple results, which typically occurs when:
   - Emperor changes era name (multiple era names within the same year)
   - Dynasty transitions
   - Coexisting regimes during periods of division

2. **Year range**: Currently supports 841 BCE to 3000 CE. Years outside this range will throw an error.

3. **Historical accuracy**: Era name data is based on mainstream historical records. Disputed years follow standard histories.

4. **BCE years**: Negative numbers represent BCE years (e.g., -221 = 221 BCE)

5. **Traditional Chinese**: All output is in Traditional Chinese characters, which matches historical documents. Users can convert to Simplified Chinese as needed.

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
