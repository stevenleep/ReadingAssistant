export function initializeStruct(object: Record<string, any> = {}, structFields: readonly string[] = [], type = 'number') {
  return structFields.reduce((acc, cur) => {
    switch (type) {
      case 'number':
        acc[cur] = object[cur] || 0;
        break;
      case 'string':
        acc[cur] = object[cur] || '';
        break;
      case 'boolean':
        acc[cur] = object[cur] || false;
        break;
      default:
        acc[cur] = object[cur] || null;
    }

    return acc;
  }, {} as Record<string, any>);
}
