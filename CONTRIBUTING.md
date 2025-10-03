# Contributing to cn-era

Thank you for your interest in contributing to cn-era! This document provides guidelines for contributing to the project.

[中文版本](#中文版本)

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [Issues](https://github.com/frankslin/cn-era/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment (OS, Node version, etc.)

### Contributing Historical Data

We welcome contributions of historical era data! When adding era names:

1. **Ensure accuracy**: Provide reliable historical sources
   - Wikipedia (Chinese historical records)
   - CBDB (China Biographical Database)
   - Academic publications
   - Classical historical texts

2. **Use Traditional Chinese (繁體中文)**: All era names must be in Traditional Chinese to match historical documents

3. **Check for era changes (改元)**: Some years have multiple era names
   - Example: Year 712 had three era names (太極, 延和, 先天)
   - Example: Year 1912 was both Xuantong 4th year and ROC 1st year

4. **Handle concurrent regimes**: During periods of division, multiple regimes may coexist
   - Example: Northern and Southern Dynasties (420-589)
   - Example: Song-Liao-Jin-Xia concurrent period

### Data Format

Add era data to `src/data/eras.ts`:

```typescript
{ dynasty: Dynasty.DYNASTY_NAME, reign_title: '年號', start_year: 起始年, end_year: 結束年 }
```

Example:
```typescript
import { Dynasty } from '../dynasty';

// 明朝
{ dynasty: Dynasty.MING, reign_title: '洪武', start_year: 1368, end_year: 1398 },
{ dynasty: Dynasty.MING, reign_title: '建文', start_year: 1399, end_year: 1402 },
```

**Note**: We use the `Dynasty` enum (based on CBDB entity IDs) instead of strings for better type safety and consistency.

### Adding Tests

When adding new era data, please add corresponding test cases to `tests/index.test.ts`:

```typescript
import { Dynasty } from '../src/dynasty';

it('应该正确转换明朝洪武元年', () => {
  const result = convertYear(1368, { mode: 'all' });
  expect(result).toContainEqual({
    dynasty: Dynasty.MING,
    dynasty_name: '明',
    reign_title: '洪武',
    year_num: '元年',
  });
});
```

For era change years with concurrent regimes, use `mode: 'all'` and `toContainEqual`:
```typescript
it('should handle era change year', () => {
  const result = convertYear(1368, { mode: 'all' });
  expect(result).toHaveLength(2);
  expect(result).toContainEqual({
    dynasty: Dynasty.YUAN,
    dynasty_name: '元',
    reign_title: '至正',
    year_num: '二十八年'
  });
  expect(result).toContainEqual({
    dynasty: Dynasty.MING,
    dynasty_name: '明',
    reign_title: '洪武',
    year_num: '元年'
  });
});
```

### Development Workflow

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cn-era.git
   cd cn-era
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/add-sui-dynasty
   ```

5. **Make your changes**
   - Add era data to `src/data/eras.ts`
   - Add tests to `tests/index.test.ts`
   - Update documentation if needed

6. **Run tests**
   ```bash
   npm test
   ```

7. **Run linter**
   ```bash
   npm run lint
   ```

8. **Build the project**
   ```bash
   npm run build
   ```

9. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add Sui Dynasty era data (581-618)"
   ```

10. **Push to your fork**
    ```bash
    git push origin feature/add-sui-dynasty
    ```

11. **Create a Pull Request**
    - Go to the original repository
    - Click "New Pull Request"
    - Select your fork and branch
    - Describe your changes

### Commit Message Guidelines

We follow conventional commits:

- `feat:` New features or era data additions
- `fix:` Bug fixes
- `docs:` Documentation updates
- `test:` Test additions or updates
- `chore:` Maintenance tasks

Examples:
```
feat: add Sui Dynasty era data (581-618)
fix: correct Ming Jiajing reign end year
docs: update README with new dynasty coverage
test: add tests for Five Dynasties period
```

### Code Style

- Use TypeScript strict mode
- Follow existing code formatting
- Run `npm run lint:fix` before committing
- Keep code simple and readable

### Pull Request Review

Your PR will be reviewed for:
- Historical accuracy
- Code quality
- Test coverage
- Documentation completeness

We may ask for revisions. Please be patient and responsive to feedback.

## Current Status

As of **v0.3.0**, all historical era data is complete:

✅ **Complete Coverage** (498 era names from 140 BCE to 1912 CE):
- Western Han, Xin, Eastern Han
- Three Kingdoms (Wei, Shu Han, Wu)
- Jin Dynasty (Western Jin, Eastern Jin)
- Northern and Southern Dynasties
- Sui Dynasty
- Tang Dynasty, Wu Zhou
- Five Dynasties and Ten Kingdoms
- Song, Liao, Jin, Western Xia
- Yuan, Ming, Qing
- Republic of China (1912-present)

**Future Contributions Welcome**:
- Data accuracy verification and corrections
- Additional test coverage
- Documentation improvements
- Feature enhancements (see [TODO.md](TODO.md))

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Check existing documentation
- Review the TODO.md file

Thank you for contributing to cn-era!

---

# 中文版本

# 贡献指南

感谢你对 cn-era 项目的关注！本文档提供了贡献代码的指南。

## 如何贡献

### 报告问题

如果你发现 bug 或有功能建议：

1. 检查 [Issues](https://github.com/frankslin/cn-era/issues) 中是否已存在相同问题
2. 如果没有，创建新 issue，包含：
   - 清晰的标题和描述
   - 重现步骤（针对 bug）
   - 预期行为 vs 实际行为
   - 你的环境信息（操作系统、Node 版本等）

### 贡献历史数据

我们欢迎贡献历史年号数据！添加年号时请注意：

1. **确保准确性**：提供可靠的历史来源
   - 维基百科（中文历史记录）
   - CBDB（中国历代人物传记资料库）
   - 学术出版物
   - 古籍文献

2. **使用繁体中文**：所有年号必须使用繁体中文，以符合历史文献原貌

3. **注意改元情况**：某些年份有多个年号
   - 例：712年有三个年号（太極、延和、先天）
   - 例：1912年既是宣统四年，也是民国元年

4. **处理政权并存**：分裂时期可能有多个政权并存
   - 例：南北朝时期（420-589）
   - 例：宋辽金夏并存时期

### 数据格式

在 `src/data/eras.ts` 中添加年号数据：

```typescript
{ dynasty: Dynasty.朝代名, reign_title: '年號', start_year: 起始年, end_year: 結束年 }
```

示例：
```typescript
import { Dynasty } from '../dynasty';

// 明朝
{ dynasty: Dynasty.MING, reign_title: '洪武', start_year: 1368, end_year: 1398 },
{ dynasty: Dynasty.MING, reign_title: '建文', start_year: 1399, end_year: 1402 },
```

**注意**：我们使用 `Dynasty` 枚举（基于 CBDB 实体 ID）而非字符串，以获得更好的类型安全性和一致性。

### 添加测试

添加新数据时，请在 `tests/index.test.ts` 中添加对应的测试用例：

```typescript
import { Dynasty } from '../src/dynasty';

it('应该正确转换明朝洪武元年', () => {
  const result = convertYear(1368, { mode: 'all' });
  expect(result).toContainEqual({
    dynasty: Dynasty.MING,
    dynasty_name: '明',
    reign_title: '洪武',
    year_num: '元年',
  });
});
```

对于改元年份或并存政权，使用 `mode: 'all'` 和 `toContainEqual`：
```typescript
it('应该处理改元年份', () => {
  const result = convertYear(1368, { mode: 'all' });
  expect(result).toHaveLength(2);
  expect(result).toContainEqual({
    dynasty: Dynasty.YUAN,
    dynasty_name: '元',
    reign_title: '至正',
    year_num: '二十八年'
  });
  expect(result).toContainEqual({
    dynasty: Dynasty.MING,
    dynasty_name: '明',
    reign_title: '洪武',
    year_num: '元年'
  });
});
```

### 开发流程

1. **Fork 本仓库**

2. **克隆你的 fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cn-era.git
   cd cn-era
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **创建功能分支**
   ```bash
   git checkout -b feature/add-sui-dynasty
   ```

5. **进行修改**
   - 在 `src/data/eras.ts` 中添加年号数据
   - 在 `tests/index.test.ts` 中添加测试
   - 必要时更新文档

6. **运行测试**
   ```bash
   npm test
   ```

7. **运行 linter**
   ```bash
   npm run lint
   ```

8. **构建项目**
   ```bash
   npm run build
   ```

9. **提交修改**
   ```bash
   git add .
   git commit -m "feat: add Sui Dynasty era data (581-618)"
   ```

10. **推送到你的 fork**
    ```bash
    git push origin feature/add-sui-dynasty
    ```

11. **创建 Pull Request**
    - 访问原仓库
    - 点击 "New Pull Request"
    - 选择你的 fork 和分支
    - 描述你的修改

### 提交信息规范

我们遵循约定式提交：

- `feat:` 新功能或年号数据添加
- `fix:` Bug 修复
- `docs:` 文档更新
- `test:` 测试添加或更新
- `chore:` 维护任务

示例：
```
feat: add Sui Dynasty era data (581-618)
fix: correct Ming Jiajing reign end year
docs: update README with new dynasty coverage
test: add tests for Five Dynasties period
```

### 代码风格

- 使用 TypeScript 严格模式
- 遵循现有代码格式
- 提交前运行 `npm run lint:fix`
- 保持代码简洁易读

### Pull Request 审查

你的 PR 将被审查：
- 历史准确性
- 代码质量
- 测试覆盖率
- 文档完整性

我们可能会要求修改。请耐心并积极响应反馈。

## 当前状态

截至 **v0.3.0**，所有历史年号数据已完整：

✅ **完整覆盖**（498个年号，公元前140年至1912年）：
- 西汉、新、东汉
- 三国（魏、蜀汉、吴）
- 晋朝（西晋、东晋）
- 南北朝
- 隋朝
- 唐朝、武周
- 五代十国
- 宋、辽、金、西夏
- 元、明、清
- 中华民国（1912年至今）

**欢迎贡献**：
- 数据准确性验证和修正
- 增加测试覆盖率
- 文档改进
- 功能增强（查看 [TODO.md](TODO.md)）

## 有疑问？

如有疑问，欢迎：
- 开 issue 讨论
- 查阅现有文档
- 查看 TODO.md 文件

感谢你为 cn-era 做出贡献！
