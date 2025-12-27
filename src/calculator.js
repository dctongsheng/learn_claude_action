/**
 * 简单的计算器类
 * 用于演示 Claude Code GitHub Actions 的功能
 */
class Calculator {
  /**
   * 加法运算
   * @param {number} a - 第一个数
   * @param {number} b - 第二个数
   * @returns {number} 和
   */
  add(a, b) {
    return a + b;
  }

  /**
   * 减法运算
   * @param {number} a - 第一个数
   * @param {number} b - 第二个数
   * @returns {number} 差
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * 乘法运算
   * @param {number} a - 第一个数
   * @param {number} b - 第二个数
   * @returns {number} 积
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * 除法运算
   * @param {number} a - 被除数
   * @param {number} b - 除数
   * @returns {number} 商
   */
  divide(a, b) {
    // TODO: 需要添加除零检查
    return a / b;
  }

  /**
   * 计算数组的平均值
   * @param {number[]} numbers - 数字数组
   * @returns {number} 平均值
   */
  average(numbers) {
    // TODO: 需要处理空数组和非数字值
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }
}

module.exports = Calculator;
