# 函数

## 基础

在函数上，TypeScript 其实和 JavaScript 差别不大，下面是几种基本的函数类型声明：
```typescript
function add(x: number, y: number): number {
  return x + y
}

const add = function(x: number, y: number): number {
  return x + y
}

const add = (x: number, y: number): number => x + y

// 完整的类型声明，通常对于实际部分可以忽略
let add: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
```
TypeScript 能够自动根据`return`语句判断返回类型，所以通常可以省略对返回值的类型声明。

函数定义了类型声明后，参数数量不一致都会报错：
```typescript
function getName(name: string) {
  return name;
}

getName(); // Error: An argument for 'name' was not provided
getName("fawen");
getName("fawen", "wenfan"); // Error: Expected 1 arguments, but got 2
```

## 可选参数
和接口类似，函数上也可以直接定义参数是可选的（毕竟接口也可以形容函数）。
```typescript
function getFullName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  return firstName;
}
```

## 默认参数
和 JavaScript 一样有默认参数。
```typescript
function getFullName(firstName: string, lastName: string = 'nihao') {
  return firstName + " " + lastName;
}
```

## 剩余参数
通过扩展运算符`...`可以传入不定数量的参数：
```typescript
function getMessage(msg: string, ...rest: string[]) {
  return `${msg} ${rest.join(" ")}`;
}
```