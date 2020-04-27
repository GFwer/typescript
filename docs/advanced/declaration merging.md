# 声明合并

声明合并指的是编译器将相同名称的声明合并成一个声明，这个合并后的声明具有两个声明的功能，合并的数量不受限制。

下面来一个个介绍在 TypeScript 中的声明合并。

## 合并接口
最简单的是接口合并：
```typescript
interface Fawen {
  name: string
}

interface Fawen {
  age: number
}

let fawen: Fawen = { name: 'fawen', age: 18 }
```