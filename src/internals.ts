type Pipe = {
  <A>(a: A): A
  <A, B>(a: A, ab: (a: A) => B): B
  <A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
  <A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
}

export const pipe: Pipe = (value: unknown, ...fns: any[]) =>
  fns.reduce((v, fn) => fn(v), value)

export const hasProperty = <O extends object, K extends PropertyKey>(
  o: O,
  k: K,
): o is O & {[k in K]: unknown} => k in o

export const isObject = (o: unknown): o is object =>
  typeof o === 'object' && o !== null

export type Path<_> = PropertyKey[]
type Get<O, _ extends Path<O>> = unknown
type Set<O, _ extends Path<O>, V> = unknown

export const get = <O, P extends Path<O>>(o: O, path: P): Get<O, P> => {
  if (!isObject(o)) return o
  if (path.length === 0) return o
  return get((o as any)[path[0]], path.slice(1))
}

export const set = <O, P extends Path<O>, V>(
  o: O,
  path: P,
  value: V,
): Set<O, P, V> => {
  if (!isObject(o)) return value
  if (path.length === 0) return value

  let newValue = set((o as any)[path[0]], path.slice(1), value)
  if (Array.isArray(o)) return setIndex(o, path[0] as number, newValue)

  return {...o, [path[0]]: newValue}
}

export const setIndex = <T extends unknown[], I extends number, V>(
  xs: T,
  i: I,
  v: V,
) => {
  let ys = [...xs]
  ys[i] = v
  return ys
}
