# 接口

前面介绍了在 Typescript 中基本类型的定义，但是如果变量是一个复杂类型的话该如何定义呢？

## 基础

依照上一节的内容我们可能会写出下面的定义：
```typescript
let user: {name: string, age: number}

user = {
  name: 'fawen',
  age: 18
}
```
看起来好像不错，不过这样的定义显然不适合扩展和阅读，如果一个对象里面在包括了另一个对象，那么反而会更乱，下面我们用`interface`修改上面的定义：
```typescript
interface User {
  name: string,
  age: number
}

let user: User = {
  name: 'fawen',
  age: 18
}
```

## 属性

对象是很复杂的，对应的`interface`也有许多属性来形容，下面就来看一看：

### 可选
对于对象来说，并非所有属性都是一定存在的，用`?`来标记某个属性是可选的：
```typescript
interface User {
  name: string,
  age?: number
}

let user: User = {
  name: 'fawen'
}
// 不会报错
```

### 只读
有些属性只能在首次创建的时候修改，这些属性通过`readonly`来修饰：
```typescript
interface User {
  readonly name: string,
  age?: number
}

let user: User = {
  name: 'fawen'
}

user.name = 'wenfa'; // Cannot assign to 'name' because it is a read-only property
```

### 额外属性
对于某些对象来说，像刚刚那样的类型定义并不能满足需求，因为他们随时会添加新的属性：
```typescript
interface User {
  name: string,
}

let user: User = {
  name: 'fawen',
  age: 18
}
// Type '{ name: string; age: number; }' is not assignable to type 'User'.
```
`age`属性是后期添加上去的，但是我们不希望在这时候通不过类型检查，可以通过类型断言：
```typescript
let user: User = {
  name: 'fawen',
  age: 18
} as User
```
不过更好的方式是通过`[]`来描述其他属性的类型：
```typescript
interface User {
  name: string,
  [propName: string]: any
  // 如果使用 number 的话，由于 name 也是 string 类型，所以会报错
}
```
## 函数
`interface`除了描述对象，也可以用来描述函数，如下所示：
```typescript
interface getName {
  (id: number): string; 
}

let fn: getName
// 参数可以不和 interface 中定义的一样
fn = function(i: number): string {
  return id.toString()
}
```
这表示了这个函数接收一个数字类型的`id`并返回一个字符串。

## 索引签名
在描述数组的时候，通过索引可以描述其通过索引访问的值的类型：
```typescript
interface indexArray {
  [index: number]: string
}

let array: indexArray = ['f','a','n','w']

array[4] = 4; // Type '4' is not assignable to type 'string'
```

TypeScript 支持两种索引签名，数字索引和字符串索引，不过数字索引的类型必须是字符串的子类型，原因在于通过数字索引访问的时候，实际上都是先把数字转换成字符串再访问的。
```typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：数值型的是字符串类型的父类型
// Error:  Numeric index type 'Animal' is not assignable to string index type 'Dog'
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

## Class

通过`interface`同样可以描述 Class：
```typescript
interface UserInterface {
  name: string;
  getName(): string;
}

class User implements UserInterface {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  getName(): string {
    return this.name;
  }
}
```

注意，这里的 interface 只描述类的公共部分，而不描述它的静态部分，如果你尝试通过声明构造器的类型接口来描述一个类是会报错的：
```typescript
interface UserConstructor {
  new (name: string)
}

// Error:  Class 'User' incorrectly implements interface 'UserConstructor'.
class User implements UserConstructor {}
```

## 继承
接口也可以实现继承：
```typescript
interface Person {
  name: string;
}
interface Chinese {
  idCard: string;
}
// 多个可以通过逗号分割
interface Student extends Person, Chinese {
  school: string;
}

let fawen: Student = {
  name: "fawen",
  school: "high",
  idCard: "123455789012345678",
};
```

接口除了继承接口，还可以继承 Class，举一个官网上的例子:
```typescript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// Error: Property 'state' is missing in type 'Image'.
class ImageControl implements SelectableControl {
  // state 是 Control 的私有属性，所以只有子类才实现了这个属性
  private state: any;
  select() {}
}
```

