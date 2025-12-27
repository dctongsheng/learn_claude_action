# 使用场景示例

本文档展示了 Claude Code GitHub Actions 的实际使用场景。

## 场景 1: 修复 Bug

### 问题描述
计算器的 `divide` 方法没有处理除数为零的情况。

### 操作步骤

1. **创建 Issue**
   ```
   Title: 修复除零检查

   在 src/calculator.js 的 divide 方法中添加除零检查。
   当除数为 0 时，应该抛出错误："除数不能为零"。
   ```

2. **在 Issue 中评论**
   ```
   @claude 请修复这个 bug
   ```

3. **Claude 的响应**
   Claude 会：
   - 分析代码，找到 divide 方法
   - 添加参数验证
   - 实现错误处理
   - 添加或更新测试
   - 创建 PR

4. **审查并合并**
   - 检查 Claude 的修改
   - 运行测试确认通过
   - 合并 PR

### 预期结果

```javascript
divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}
```

---

## 场景 2: 添加新功能

### 问题描述
需要在计算器中添加幂运算功能。

### 操作步骤

1. **创建 Issue**
   ```
   Title: 添加幂运算方法

   需求：
   - 添加一个 power(base, exponent) 方法
   - 计算 base 的 exponent 次方
   - 处理 edge cases（0 的 0 次方、负数指数等）
   - 添加完整的测试用例
   ```

2. **在 Issue 中评论**
   ```
   @claude 请实现这个功能，遵循 CLAUDE.md 中的代码风格
   ```

3. **Claude 的处理过程**
   - 阅读现有代码，理解代码风格
   - 查看 CLAUDE.md 了解规范
   - 实现 power 方法
   - 添加 JSDoc 注释
   - 编写全面的测试
   - 创建 PR

### 预期结果

```javascript
/**
 * 幂运算
 * @param {number} base - 底数
 * @param {number} exponent - 指数
 * @returns {number} 结果
 */
power(base, exponent) {
  if (exponent === 0) {
    return base === 0 ? NaN : 1;
  }
  return Math.pow(base, exponent);
}
```

---

## 场景 3: 代码审查

### 场景
有人提交了一个 PR，需要代码审查。

### 操作步骤

1. **创建 PR** 或使用现有的 PR

2. **在 PR 中评论**
   ```
   @claude /review

   请重点关注：
   - 代码安全性
   - 错误处理
   - 性能问题
   - 代码风格一致性
   ```

3. **Claude 的审查内容**
   - 整体架构评价
   - 潜在的 bug
   - 安全问题
   - 性能优化建议
   - 代码风格问题
   - 测试覆盖度

### 示例审查评论

```
## 代码审查报告

### 整体评价: 良好 ✅

代码结构清晰，逻辑正确。

### 发现的问题

#### 🔴 严重问题
1. **除零检查缺失** (line 45)
   - `divide` 方法没有检查除数是否为零
   - 建议：添加 `if (b === 0) throw new Error(...)`

#### 🟡 建议改进
1. **输入验证** (line 78)
   - `average` 方法应该验证数组是否为空
   - 建议：添加数组长度检查

2. **性能优化** (line 82)
   - 可以使用 `reduce` 的初始值参数简化代码

#### 🟢 优点
- ✅ JSDoc 注释完整
- ✅ 命名清晰
- ✅ 代码结构良好

### 总结
建议修复严重问题后可以合并。其他改进可以在后续 PR 中处理。
```

---

## 场景 4: 重构代码

### 场景
代码可以工作，但需要重构以提高可读性和性能。

### 操作步骤

1. **创建 Issue**
   ```
   Title: 重构 average 方法

   当前的 average 方法可以简化，
   并添加更好的错误处理。
   请重构以提高代码质量。
   ```

2. **在 Issue 中评论**
   ```
   @claude /refactor

   请重构 average 方法：
   1. 添加输入验证
   2. 简化逻辑
   3. 添加完整的错误处理
   4. 保持 API 不变
   ```

3. **Claude 的重构**
   - 分析现有代码
   - 识别改进点
   - 重构代码
   - 确保测试通过
   - 更新文档

### 重构前后对比

**Before:**
```javascript
average(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}
```

**After:**
```javascript
/**
 * 计算数组的平均值
 * @param {number[]} numbers - 数字数组
 * @returns {number} 平均值
 * @throws {Error} 如果数组为空或包含非数字值
 */
average(numbers) {
  // 验证输入
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('数组不能为空');
  }

  if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
    throw new Error('数组只能包含数字');
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}
```

---

## 场景 5: 调试失败的测试

### 场景
测试失败了，需要找出原因并修复。

### 操作步骤

1. **查看失败的测试**
   ```bash
   npm test
   ```

2. **创建 Issue**
   ```
   Title: 修复 average 方法的空数组测试

   测试失败信息：
   ❌ average 应该处理空数组

   Expected: throw an error
   Received: NaN
   ```

3. **在 PR 或 Issue 中**
   ```
   @claude 测试失败了，请调试并修复

   运行 npm test 查看详细的失败信息。
   分析失败原因并修复代码。
   ```

4. **Claude 的调试过程**
   - 运行测试
   - 分析错误堆栈
   - 找出根本原因
   - 修复代码
   - 验证所有测试通过
   - 提交修复

---

## 场景 6: 生成文档

### 场景
需要为项目生成 API 文档。

### 操作步骤

1. **创建 Issue**
   ```
   Title: 生成 API 文档

   请为 Calculator 类生成完整的 API 文档，
   包括所有公共方法的说明和示例。
   ```

2. **在 Issue 中评论**
   ```
   @claude 请生成 API.md 文档

   文档应该包括：
   1. 类的概述
   2. 每个方法的说明
   3. 参数和返回值
   4. 使用示例
   5. 错误情况
   ```

3. **Claude 生成的文档**
   - 分析代码和 JSDoc
   - 生成结构化文档
   - 添加使用示例
   - 创建 API.md 文件
   - 创建 PR

---

## 场景 7: 性能优化

### 场景
代码功能正常，但性能可以优化。

### 操作步骤

1. **使用 Profiler**
   ```bash
   node --prof calculator.js
   ```

2. **创建 Issue**
   ```
   Title: 优化计算器性能

   在处理大数组时，average 方法较慢。
   请优化性能。
   ```

3. **在 Issue 中评论**
   ```
   @claude 请优化 average 方法的性能

   当前实现在处理 100 万个元素的数组时较慢。
   请提供优化方案，并保持功能不变。
   ```

---

## 场景 8: 自动化每日报告

### 场景
每天自动生成项目进展报告。

### 配置
已在 `.github/workflows/claude-daily-report.yml` 中配置

### 报告内容
- 最近的 commits
- 开放的 issues
- 开放的 PRs
- 代码质量建议

### 查看
每天上午 9 点（UTC）自动生成，在 Issues 中查看。

---

## 场景 9: 多轮对话修复

### 场景
复杂问题需要多轮对话。

### 操作步骤

1. **在 PR 中评论**
   ```
   @claude 我需要重构 Calculator 类，
   将所有方法改为静态方法。这样调用更方便。
   ```

2. **Claude 响应**
   ```
   我理解你想把实例方法改为静态方法。
   这样就可以直接调用 Calculator.add(2, 3) 而不需要 new Calculator()。

   我会：
   1. 将所有方法改为静态方法
   2. 更新所有测试用例
   3. 更新 JSDoc 注释

   这样可以吗？
   ```

3. **继续对话**
   ```
   @claude 是的，请继续。另外顺便添加一个
   静态的常量 PI = 3.14159265359
   ```

4. **Claude 完成任务**
   - 实现修改
   - 更新测试
   - 创建 PR

---

## 场景 10: 紧急热修复

### 场景
生产环境发现严重 bug，需要快速修复。

### 操作步骤

1. **创建紧急 Issue**
   ```
   Title: [URGENT] 生产环境 bug：divide 方法返回错误结果

   优先级：Critical

   divide(10, 3) 返回 3.3333333333333335
   但应该四舍五入到两位小数：3.33
   ```

2. **在 Issue 中评论**
   ```
   @claude 紧急修复！

   请立即修复 divide 方法，使结果保留两位小数。
   直接提交到 main 分支（使用 --force）。
   ```

3. **Claude 快速响应**
   - 分析问题
   - 实现修复
   - 添加紧急测试
   - 直接推送到 main

---

## 技巧和最佳实践

### 1. 明确的指令
❌ 不好：
```
@claude 修复代码
```

✅ 好：
```
@claude 请修复 divide 方法中的除零检查问题。
当除数为 0 时，应该抛出 Error("除数不能为零")。
参考 CLAUDE.md 中的错误处理规范。
```

### 2. 提供上下文
```
@claude 我正在实现幂运算功能。
目前已经添加了 power 方法，但测试失败了。
请运行 npm test 查看失败信息，然后修复问题。
```

### 3. 分步执行
```
@claude 请按以下步骤操作：
1. 运行测试查看失败
2. 分析失败原因
3. 修复代码
4. 重新运行测试确认通过
5. 创建 PR
```

### 4. 使用斜杠命令
```
@claude /review      # 代码审查
@claude /fix         # 修复问题
@claude /refactor    # 重构
@claude /test        # 运行测试
```

### 5. 控制成本
```
@claude 请分析这个问题，
--max-turns 3
只给出建议，不要直接修改代码。
```

---

## 总结

Claude Code GitHub Actions 适用于：

- ✅ Bug 修复
- ✅ 功能实现
- ✅ 代码审查
- ✅ 重构优化
- ✅ 测试编写
- ✅ 文档生成
- ✅ 调试问题

记住：
1. 提供清晰的指令
2. 给出足够的上下文
3. 审查 Claude 的修改
4. 使用 CLAUDE.md 定义规范
5. 控制对话轮数以节省成本

祝你使用愉快！🚀
