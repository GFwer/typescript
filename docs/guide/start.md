# 开始

## 类型介绍

TypeScript 使用了 Type Annotation 语法，通过`:`标识前面变量的类型。
```typescript
let num: number;

num = 321
```

下面分别简述在 TypeScript 中的各种类型。

### 数字
TypeScript 中数字同样是是浮点数，通过`number`可以声明十进制、十六进制、八进制等数字。
```typescript
let num: number = 5
let num2: number = 0xaaa
```

### 布尔
布尔类型十分简单，只有`true`和`false`。
```typescript
let bool1: boolean = true
let bool2: boolean = false
```

### 字符串
字符串用`string`标识，可以使用单引号、双引号或模板字符串。
```typescript
let name: string = 'fawen'
let describe: string = `My name is ${name}`
```

### 数组
数组通过`[]`来声明，同时在前面加上基本类型表示数组内子项的类型。
```typescript
let array: string[] = ['1', '2']
```
还可以通过数组泛型（之后会详细讲）来声明：
```typescript
let array: Array<string> = ['1', '2']
```
### 元组
有时候，数组内部类型可能是多种多样的，通过元组可以声明有着不同类型的数组。
```typescript
let multiArray: [string, boolean]

multiArray = ['fawen', true]; // 正确
multiArray = [true, 'fawen']; // 错误，顺序不正确
```
超出元组范围的子项会发出警告：
```typescript
multiArray[2] = 'fawen'; // Index '3' is out-of-bounds in tuple of length 2.
```