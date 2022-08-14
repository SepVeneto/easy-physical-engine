export function makeArray<T>(length: number, init: (i: number) => T): T[] {
  const a: T[] = new Array<T>(length)
  for (let i = 0; i < length; ++i) {
    a[i] = init(i)
  }
  return a;
}

export function angleToRadian(angle: number) {
  return (angle / 180) * Math.PI
}