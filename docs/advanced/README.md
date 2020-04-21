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

这时候可以使用类型断言，可以试代码正常工作，不过代码不免复杂：
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