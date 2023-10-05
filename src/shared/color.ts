export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

// 16进制的color转换为rgb
export const hexToRgb = (hex: string) => {
  const rgb = []
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return rgb
}

export const getDirection = (color: string) => {
  const [r, g, b] = hexToRgb(color);
  // 根据灰度值判断是深色还是浅色
  // https://www.w3.org/TR/AERT/#color-contrast
  const gray = (r * 299 + g * 587 + b * 114) / 1000
  if (gray >= 125) {
    return 'dark'
  } else {
    return 'light'
  }
}

export const getNearColor = (color: string, step: number) => {
  const [r, g, b] = hexToRgb(color)
  const newColor = [r + step, g + step, b + step];
  const result = newColor.map((c) => {
    if(isNaN(c)) {
      return 0
    }
    if (c < 0) {
      return 0
    } else if (c > 255) {
      return 255
    } else {
      return c
    }
  })
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`
}

export const getMiddleColor = (color1: string, color2: string) => {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)
  const r = Math.floor((r1 + r2) / 2)
  const g = Math.floor((g1 + g2) / 2)
  const b = Math.floor((b1 + b2) / 2)
  return `rgb(${r}, ${g}, ${b})`
}
