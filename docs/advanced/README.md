# 高级类型

## 类型保护

对于联合类型来说，使用一些属性可能会报错：
```typescript
interface Chinese {
  name: string,
  wechat: string
}

interface Japanese {
  name: string,
  line: string
}

let getPerson = function(): Chinese | Japanese {
  return {
    name: '123',
    wechat: '123'
  }
}
let fawen = getPerson()

// 使用这些都报错
if(fawen.line){
  console.log(fawen.line)
}else if(fawen.wechat){
  console.log(fawen.wechat)
}
```

这时候可以使用类型断言，可以使代码通过类型检查，不过代码不免复杂：
```typescript
if((person as Japanese).line){
  console.log((person as Japanese).line)
}else if((person as Chinese).wechat){
  console.log((person as Chinese).wechat)
}
```

### in
通过`in`可以安全地使用这些变量：
```typescript
if('line' in fawen){
  console.log(fawen.line)
}else if('wechat' in fawen){
  console.log(fawen.wechat)
}
```


### 自定义防护
通过自定义函数的形式来使用这些变量：
```typescript
// 通过创建 isChinese 函数来确定具体类型
function isChinese(user: Chinese | Japanese): user is Chinese {
  return (user as Chinese).wechat !== undefined
}

if(!isChinese(fawen)){
    console.log(fawen.line)
}else if(fawen.wechat){
    console.log(fawen.wechat)
}
```

### instanceof 
通过`instanceof`也可以很好地识别构造函数或者类的实例。
```typescript
class Foo {
  name = "foo";
  foo = "123";
}

class Bar {
  name = "bar";
  bar = "123";
}

function getExtension(arg: Foo | Bar): string {
  if (arg instanceof Foo) {
    return arg.foo;
  } else return arg.bar;
}
```

### typeof
还记得之间的泛型`T`吗？通过`typeof`可以使函数通过类型检查：
```typescript
function getArgs<T>(arg: T): T{
  if(typeof arg === 'string'){
    // 可以使用 length 属性了！
    console.log(arg.length)
  }
  return arg
}
```

## 空类型
在 TypeScript 中，有两种空类型，`null`和`undefined`，它们是任何类型的子类型，意味着在默认情况下可以赋给任何变量：
```typescript
let s: string = "foo";

s = null;

let n: number = 5;

n = undefined
// 默认通过检查！
```

通过`--strictNullChecks`配置可以检查这种类型的错误。

## 可选

`--strictNullChecks`启用后，会自动给可选的参数添加`| undefined`
```typescript
// 约等于 (x: number, y?: number | undefined)
function add(x: number, y?: number) {
  return x + (y || 0)
}

add(1, 2);
add(1);
add(1, undefined);
add(1, null); // Error: Argument of type 'null' is not assignable to parameter of type 'number | undefined'
```

对于类的可选属性也有类似处理：
```typescript
class Person {
  name: string,
  wechat?: string
}

let fawen = new Person();

fawen.name = 'fawen';
fawen.wechat = '123456';
fawen.name = undefined; // Error: Type 'undefined' is not assignable to type 'string'
fawen.wechat = undefined;
fawen.wechat = null; // Error: Type 'null' is not assignable to type 'string | undefined'
```

## 类型别名

类型别名`type`类似于`interface`，都是声明新的类型，不过使用上还是有细微的差别，总体来说，尽量使用`interface`，如果`interface`不能满足需求，再使用类型别名。
比如说如果要使用`implements`和`extends`，应该使用`interface`，如果要使用联合类型，使用`type`会更方便。
```typescript
type Alias = { num: number }
interface Interface {
  num: number;
}
```

## 字面量类型
字面量类型是通过字面来准确描述一个变量。
```typescript
let fawen: 'Fawen';
// 创建一个 fawen 的变量，它只能为`Fawen`
fawen = 123; // Error: Type '123' is not assignable to type '"Fawen"'
fawen = 'Fawen'; // 通过检查
```

通过联合类型可以组合一个变量的所有可能：
```typescript
type Direction = 'north' | 'south' | 'west' | 'east'

function getDirection(direction: Direction) {
  return direction
}

getDirection('1'); // Error: Argument of type '"1"' is not assignable to parameter of type 'Direction'.
getDirection('north'); // 通过
```

## 判断联合类型

当接口中含有字面量成员的时候，可以通过它来判断联合类型：
```typescript
interface Chinese {
  country: 'china'
}

interface Japanese {
  country: 'japan'
}

interface Korean {
  country: 'korea'
} 

type Person = Chinese | Japanese | Korean
```
在声明了一个 Person 类之后，不同成员有不同属性，在函数中可以有多重方法来识别他们：
```typescript
function info(person: Person) {
  if(person.country === 'china') { }
  else if(person.country === 'japan') { }
  // 由于排除了两种情况，TypeScript 能知道最后一种，不过通常来说会避免这种写法，因为实际可能会漏写
  else { }
}
```
使用 Switch 语句：
```typescript
function info(person: Person) {
  switch (person.country) {
    case 'china':
      break;
    case 'japan':
      break;
    case 'korea':
      break;
    default: 
      // 通过 never 检查代码有没有疏漏，或者写个 never 函数抛出错误
      const _exhaustiveCheck: never = person;
      return _exhaustiveCheck
  }
}
```

## 索引类型

通过索引类型，TypeScript 能够检查使用了动态属性名的代码，比如下面一个获取对象一些属性的值：
```javascript
function pluck(o, names) {
  return names.map(n => o[n]);
}
```
通过 TypeScript 可以定义如下：
```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']);
```
以上代码主要在 pluck 的定义中，首先定义了两种类型 T 和 K，
接着使用索引类型查询操作符`keysof T`查询 T 上已知的公共属性名的联合：
```typescript
interface Fawen {
  name: string,
  age: number
}

let keys = keysof Fawen
//等价于 'name' | 'age'
```
通过上面的类型定义，当传入的`names`不在已知范围内的时候就会抛出错误，更有利于防止错误的产生。