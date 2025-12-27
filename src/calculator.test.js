const Calculator = require('./calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  describe('add', () => {
    test('应该正确相加两个正数', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    test('应该正确相加负数', () => {
      expect(calc.add(-2, -3)).toBe(-5);
    });
  });

  describe('subtract', () => {
    test('应该正确相减两个正数', () => {
      expect(calc.subtract(5, 3)).toBe(2);
    });
  });

  describe('divide', () => {
    test('应该正确相除两个正数', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    test('除数为零时应该抛出错误', () => {
      expect(() => calc.divide(10, 0)).toThrow('除数不能为零');
    });
  });

  describe('average', () => {
    test('应该正确计算平均值', () => {
      expect(calc.average([2, 4, 6, 8])).toBe(5);
    });

    test('空数组应该返回0或抛出错误', () => {
      // 这个测试会失败，需要处理空数组情况
      expect(() => calc.average([])).toThrow();
    });
  });
});
