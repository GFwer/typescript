# 泛型

## 基础
根据上一节函数的内容，如果我们想要创建一个函数，这个函数返回值是传入的参数，可能会这样定义：
```typescript
function getArgs(arg: any): any{
  return arg
}
```
但是这种情况下，会丢失一个信息：接收参数和返回参数的类型应该是相同的。

这时候可以用泛型来解决，定义一个类型`T`：
```typescript
function getArgs<T>(arg: T): T{
  return arg
}
```
在上面的例子中定义了一个类型`T`，通过维护类型`T`来让传入的参数和返回值类型保持一致。

定义完成之后，一般情况下，编译器可以自动根据传入的变量确定返回值的类型：
```typescript
const str = getArgs('string')
```
不过在复杂的情况下，需要使用`<>`明确传入的类型，以便编译器能推断出相应类型：
```typescript
const str = getArgs<string>('string')
```

## 泛型变量
不过还有许多问题，比如这样使用的时候：
```typescript
function getArgs<T>(arg: T): T{
  console.log(arg.length); // Error: Property 'length' does not exist on type 'T'
  return arg
}
```
这里编译器告诉我们，`length`属性不存在，实际上在我们定义类型`T`，的时候，`T`代表任意类型，如果是`number`类型就没有相关属性了。那么我们可以把`T`当做是类型的一部分而不是整个类型，假设参数是数组类型：
```typescript
function getArgs<T>(arg: T[]): T[]{
  console.log(arg.length); // 通过检查
  return arg
}
```
上面同样可以这样实现：
```typescript
function getArgs<T>(arg: Array<T>): Array<T>{
  console.log(arg.length); // 通过检查
  return arg
}
```

## 泛型类型

在`interface`中说过，`interface`也可以形容函数，如果带上泛型的话：
```typescript
interface getArgsInterface {
  <T>(arg: T): T; 
}

function getArgs<T> (args: T): T {
  return args
}

let fn: getArgsInterface = getArgs;
// 等价于
let fn: {<T>(arg: T): T} = getArgs
```
注意，在`interface`中定义类型`T`代表泛型来描述函数，如果把`<T>`移动到外面：
```typescript
interface getArgsInterface<T> {
  (arg: T): T; 
}

function getArgs<T> (args: T): T {
  return args
}

let fn: getArgsInterface<string> = getArgs;
```
这样代表把泛型当做这个接口的参数，在使用接口的时候需要传入一个类型参数来指定类型，这样接口内部就能清楚地知道类型了。

## 泛型类
泛型类具体和`interface`差别不大，同样可以传入类型参数来描述类型：
```typescript
class User<T> {
  name: T
  getName():T {
    return this.name
  }
}

let fawen = new User<string>();

fawen.name = 'fawen';
console.log(fawen.getName()); // 'fawen'
```

## 泛型约束
在之前的例子中，我们定义了一个泛型函数，但是访问这个泛型函数的`length`属性无法通过检查：
```typescript
function getArgs<T>(arg: T): T{
  console.log(arg.length);
  return arg
}
```

这时候我们确实想访问`length`属性怎么办，可以定义一个接口来约束泛型：
```typescript
interface limit {
  length: number
}
function getArgs<T extends limit>(arg: T): T{
  console.log(arg.length);
  return arg
}
```
通过接口描述了`length`属性约束类型`T`，这样就能访问了，不过相应的`T`不再代表所有类型：
```typescript
getArgs(5); // Error: Argument of type '5' is not assignable to parameter of type 'limit'
```

现在所有传入的参数都必须包含`length`属性了。

