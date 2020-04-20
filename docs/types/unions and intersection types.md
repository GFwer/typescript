# 联合和交叉类型

## 联合类型

在前面的类型定义中，我们往往对一个变量只定义了一种类型，但是实际情况往往是复杂的，下面是对一个变量定义了多种类型：
```typescript
let fawen: string | number

fawen = 'string'
fawen = 18
```

上面声明了一个变量，它可能具有字符串类型，也可能具有数字类型，所以编译器不会报错。

## 接口
如果联合类型的对象是接口的话：
```typescript
interface Chinese {
  name: string,
  wechat: string
}

interface Japanese {
  name: string,
  line: string
}

let person: Chinese | Japanese = {
  name: 'aha',
  wechat: '123',
  line: '123'
  // wechat 和 line 至少要有一个存在
}
```

## 交叉类型
还是上面那个例子，如果使用`&`符号代表变量具有所有类型属性：
```typescript
let person2: Japanese & Chinese = {
  name: 'aah',
  line: 'asd',
  wechat: '321'
  // 两个都必须存在，取并集
}
```