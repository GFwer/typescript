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

### 枚举
通过枚举类型`enum`快速为一组数组赋予数据：
```typescript
enum Color { Red, Green, Blue }
```
编译成 JavaScript 是这样的：
```javascript
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
```
默认从 0 开始编号，不过你可以在枚举中给相应的 key 赋值，赋值后，这个 key 后面的值也会自动改变：
```typescript
enum Color { Red, Green = 2, Blue }; // 0,2,3

let myColor: Color = Color.Red
let myColor2: string = Color[2]

console.log(myColor); // 0
console.log(myColor2); // 'Green'，因为它的 index 是 2
```

### Any
通过使用`any`来移除某个变量的具体类型检查，标识这个变量的类型可能来源于动态的内容或尚不明确，在使用 any 时，TypeScript 会直接让这些变量通过类型检查。
```typescript
let variable: any;

variable = 'fawen';
variable = 18;
// 没有错误
```
`any`也可以对数组生效：
```typescript
let array: any = [1, 2, 3]

array[3] = true
```

### Void
`void`通常用来标识函数没有任何返回值。
```typescript
// 有返回值的
function square(num: number): number {
  return num * num
}

// 无返回值的
function log(msg: string): void {
  console.log(msg)
}
```

### null 和 undefined
`null`和`undefined`同样是类型之一，不过在非`strictNullChecks`模式下，它们可以是任何类型的子类型，这表示可以把变量赋给其他类型的变量。
```typescript
let num: null = null

let num2: number = 3

num2 = num; // 不会报错
```

### Never
`nerver`表示了永远不存在值的类型，比如在下列情况下可以声明为`never`：
- 从来不会有返回值的函数
- 总会抛出错误的函数

`never`类型是任何类型的子类型（可以赋值给任何类型），但是除了`never`类型，所有类型都不能赋值给`never`类型（包括`any`）
```typescript
function error(msg: string): never {
    throw new Error(msg);
}

let foo: never = 123; // 错误，number 类型不可以赋值给 never 类型
let num1: number;
let num2 :number;
```