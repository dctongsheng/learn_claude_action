# Claude Code GitHub Actions 示例

这是一个完整的示例项目，展示如何在实际项目中使用 Claude Code GitHub Actions。

## 项目简介

这个项目包含：
- 一个简单的计算器类（包含一些故意留下的 bug）
- 相应的测试用例
- 完整的 GitHub Actions workflow 配置
- Claude Code 项目配置（CLAUDE.md）

## 功能特性

本项目配置了 3 个 GitHub Actions workflow：

### 1. 基础响应 (claude-basic.yml)
- 在 PR/Issue 评论中使用 `@claude` 触发
- 自动代码审查
- 基础对话功能

### 2. 自动修复测试 (claude-fix-tests.yml)
- 测试失败时自动修复
- 支持手动触发
- 让 Claude 分析并修复代码问题

### 3. 每日报告 (claude-daily-report.yml)
- 每天自动生成项目报告
- 总结 commits、issues、PRs
- 提供代码质量建议

## 快速开始

### 步骤 1: Fork 这个项目

点击右上角的 Fork 按钮，将项目 fork 到你的账号下。

### 步骤 2: 安装 Claude GitHub App

访问 https://github.com/apps/claude 并安装到你的 fork 仓库。

需要的权限：
- Contents: Read & write
- Issues: Read & write
- Pull requests: Read & write

### 步骤 3: 添加 API Key

1. 访问 https://console.anthropic.com/ 获取你的 API Key
2. 在你的 fork 仓库中，进入 Settings → Secrets and variables → Actions
3. 点击 "New repository secret"
4. Name: `ANTHROPIC_API_KEY`
5. Value: 你的 API key

### 步骤 4: 复制 workflow 文件

workflow 文件已经在 `.github/workflows/` 目录中，不需要额外操作。

## 使用示例

### 示例 1: 让 Claude 修复 bug

1. 创建一个新的 Issue：
   ```
   Title: 修复除零检查

   calculator.js 的 divide 方法没有处理除数为零的情况。
   当除数为 0 时应该抛出错误。
   ```

2. 在 Issue 评论中输入：
   ```
   @claude 请修复这个问题
   ```

3. Claude 会分析代码，实现修复，添加测试，并创建 PR！

### 示例 2: 代码审查

1. 创建一个 PR
2. 在 PR 评论中输入：
   ```
   @claude 请审查这个 PR 的代码质量
   ```

3. Claude 会分析代码并提供详细的反馈

### 示例 3: 自动修复失败的测试

1. 运行测试（会失败）：
   ```bash
   npm test
   ```

2. 创建一个 PR，workflow 会自动检测到测试失败
3. 在 PR 评论中输入：
   ```
   @claude 测试失败了，请修复
   ```

4. Claude 会分析失败的测试，修复代码，并推送更新

### 示例 4: 添加新功能

1. 创建一个 Issue：
   ```
   Title: 添加幂运算功能

   请在 Calculator 类中添加一个 power 方法，
   计算 base 的 exponent 次方。
   ```

2. 在 Issue 中评论：
   ```
   @claude 请实现这个功能
   ```

3. Claude 会：
   - 分析现有代码风格
   - 实现新功能
   - 添加 JSDoc 注释
   - 编写测试
   - 创建 PR

### 示例 5: 使用斜杠命令

在 PR 或 Issue 评论中：

```
@claude /review
@claude /fix
@claude /test
@claude /refactor
```

## 高级用法

### 自定义触发词

在 workflow 文件中修改 `trigger_phrase` 参数：

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    trigger_phrase: "@ai-assistant"  # 自定义触发词
```

### 限制对话轮数

防止 Claude 过度迭代：

```yaml
claude_args: "--max-turns 3"
```

### 指定模型

使用特定的 Claude 模型：

```yaml
claude_args: "--model claude-opus-4-5-20251101"
```

### 组合多个参数

```yaml
claude_args: |
  --max-turns 5
  --model claude-sonnet-4-5
  --allowed-tools Read,Write,Edit,Bash
```

## 项目结构说明

```
claude-github-action-example/
├── .github/
│   └── workflows/
│       ├── claude-basic.yml         # 基础响应和代码审查
│       ├── claude-fix-tests.yml     # 自动修复测试
│       └── claude-daily-report.yml  # 每日报告
├── src/
│   ├── calculator.js                # 主代码（有 bug）
│   └── calculator.test.js           # 测试文件
├── CLAUDE.md                        # Claude 配置文件
├── package.json
└── README.md
```

## 本地测试

```bash
# 安装依赖
npm install

# 运行测试（会失败）
npm test

# 让 Claude 修复
# 1. 提交代码到 GitHub
# 2. 创建 PR
# 3. 在 PR 中 @claude 请求修复
```

## 常见问题

### Q: Claude 没有响应？

检查：
1. GitHub App 是否正确安装
2. API Key 是否正确设置在 Secrets 中
3. workflow 是否已启用
4. 评论中是否包含 `@claude`

### Q: 如何限制成本？

使用以下策略：
1. 设置 `--max-turns` 限制对话轮数
2. 使用更小的模型（如 claude-haiku）
3. 只在特定分支上启用 workflow
4. 设置 workflow timeout

### Q: 可以在本地使用相同的配置吗？

可以！Claude Code CLI 也会读取 CLAUDE.md 文件：
```bash
# 在终端中运行
claude
```

## 成本估算

- **GitHub Actions**: 消耗 GitHub Actions 分钟
- **Claude API**: 每次调用消耗 tokens
  - 简单修复: ~1K-5K tokens
  - 代码审查: ~5K-15K tokens
  - 复杂任务: ~15K-50K tokens

建议设置 `--max-turns` 来控制成本。

## 进阶配置

### 使用 AWS Bedrock 或 Google Vertex AI

参考官方文档配置企业级部署：

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    use_bedrock: true
    # AWS Bedrock 配置
```

### 自定义 GitHub App

创建自己的 GitHub App：
1. 在 GitHub Settings → Developer settings → GitHub Apps 中创建
2. 设置必要的权限
3. 在 workflow 中使用自定义 App token

## 资源链接

- [Claude Code 官方文档](https://code.claude.com/docs/en/github-actions)
- [Claude API 文档](https://docs.anthropic.com/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 PR！试试让 Claude 来帮你贡献吧 😄

---

**提示**: 记得在 Settings → Actions 中确保启用了 workflows！
