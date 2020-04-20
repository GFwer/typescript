# 枚举

## 枚举类型
在最开头我们介绍了枚举类型：
```typescript
enum Color {
  Red,
  Blue,
  Green
}

console.log(Color.Red); // 0
```
我们知道，枚举的时候会赋予初始值（从`0`开始），默认是数字枚举。

### 字符串枚举
赋初始值的时候可以给予字符串的值，如果给了某个变量字符串类型的初始值，那么其后的变量都要给初始值，直到数字类型。
```typescript
enum Color {
  Red = 'red',
  Blue = 'blue',
  Green = 'green'
}

console.log(Color); // { "Red": "red", "Blue": "blue", "Green": "green" } 
```

### 异构枚举
如果一个枚举中同时包含了数字和字符串，就称为异构枚举（通常不建议这么做）。
```typescript
enum Color {
  Red = 1,
  Blue = 'blue',
  Green = 'green'
}
```

## 计算
在给枚举的对象赋初始值的时候，我们可以使用加减乘除或者位运算，在计算结果为`NaN`或者`Infinity`的时候编译会报出错误：
```typescript
enum Color {
  Red = 1,
  Blue = 7 >> 2,
  Green = 1 + 8,
  Black = Green | Blue
}
```
