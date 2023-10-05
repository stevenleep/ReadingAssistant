export function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

export function mapToArray(map: Map<any, any>) {
  return Array.from(map.values())
}
