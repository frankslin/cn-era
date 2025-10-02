# Contributing to cn-era

感谢你对 cn-era 项目的贡献！

Thanks for your interest in contributing to cn-era!

## 如何贡献 | How to Contribute

### 报告 Bug | Reporting Bugs

使用 [Bug Report template](https://github.com/frankslin/cn-era/issues/new?template=bug_report.yml) 提交 issue。

Use the [Bug Report template](https://github.com/frankslin/cn-era/issues/new?template=bug_report.yml) to submit an issue.

### 建议新功能 | Suggesting Features

使用 [Feature Request template](https://github.com/frankslin/cn-era/issues/new?template=feature_request.yml) 提交建议。

Use the [Feature Request template](https://github.com/frankslin/cn-era/issues/new?template=feature_request.yml) to submit suggestions.

### 修正历史数据 | Correcting Historical Data

使用 [Data Correction template](https://github.com/frankslin/cn-era/issues/new?template=data_correction.yml) 提交数据修正。

Use the [Data Correction template](https://github.com/frankslin/cn-era/issues/new?template=data_correction.yml) to submit corrections.

**重要 | Important**:
- 必须提供可靠的历史文献来源 | Must provide reliable historical sources
- 使用繁体中文 | Use Traditional Chinese characters
- 确保年号起止时间准确 | Ensure accurate start/end dates

## 开发流程 | Development Process

### 1. Fork 并克隆仓库 | Fork and Clone

```bash
git clone https://github.com/frankslin/cn-era.git
cd cn-era
npm install
```

### 2. 创建分支 | Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b data/dynasty-name
```

### 3. 开发和测试 | Develop and Test

```bash
# 运行测试 | Run tests
npm test

# 运行开发模式 | Run in dev mode
npm run dev

# 运行构建 | Build
npm run build
```

### 4. 提交代码 | Commit Changes

```bash
git add .
git commit -m "feat: add Ming Dynasty era data"
# or
git commit -m "fix: correct Tang Dynasty year calculation"
# or
git commit -m "data: add Qing Dynasty eras"
```

**Commit 格式 | Commit Format**:
- `feat:` 新功能 | new feature
- `fix:` Bug 修复 | bug fix
- `data:` 数据添加/修正 | data addition/correction
- `docs:` 文档更新 | documentation update
- `test:` 测试相关 | test related
- `refactor:` 代码重构 | code refactoring

### 5. 推送并创建 PR | Push and Create PR

```bash
git push origin feature/your-feature-name
```

然后在 GitHub 上创建 Pull Request。

Then create a Pull Request on GitHub.

## 代码规范 | Code Standards

### TypeScript
- 使用 TypeScript 编写代码
- 确保类型安全
- 运行 `npx tsc --noEmit` 检查类型错误

### 测试 | Testing
- 为新功能添加测试
- 确保所有测试通过: `npm test -- --run`
- 维持良好的测试覆盖率

### 数据格式 | Data Format

添加年号数据时，使用以下格式：

When adding era data, use this format:

```typescript
{
  dynasty: '朝代名',      // 使用繁体中文 | Use Traditional Chinese
  reign_title: '年号',    // 使用繁体中文 | Use Traditional Chinese
  start_year: 开始年份,   // 公元年份 | Gregorian year
  end_year: 结束年份      // 公元年份 | Gregorian year
}
```

**示例 | Example**:
```typescript
{ dynasty: '明', reign_title: '洪武', start_year: 1368, end_year: 1398 }
```

### 文档要求 | Documentation Requirements

- 所有年号必须使用**繁体中文** | All era names must use **Traditional Chinese**
- 提供历史来源 | Provide historical sources
- 更新相关测试 | Update related tests
- 如有必要，更新 README | Update README if necessary

## 数据来源 | Data Sources

推荐使用以下来源 | Recommended sources:

1. [维基百科 - 中国年号列表](https://zh.wikipedia.org/wiki/中国年号列表)
2. [CBDB (China Biographical Database)](https://projects.iq.harvard.edu/cbdb)
3. 《中国历代年号考》
4. 《资治通鉴》等正史文献 | Official historical records

## 问题? | Questions?

如有任何问题，欢迎：
- 提交 Issue
- 在 PR 中讨论
- 发送邮件到维护者

If you have questions:
- Submit an Issue
- Discuss in your PR
- Email the maintainers

感谢你的贡献！🙏

Thank you for your contribution! 🙏
