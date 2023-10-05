import { ICustomColor } from './RemarkConfigContext'

interface RemarkCustomColorOptionItemProps {
  color?: ICustomColor
}
export default function RemarkColorItem({ color }: RemarkCustomColorOptionItemProps) {
  return (
    <li
      className="remark-color-item"
      style={{
        backgroundColor: color?.bgColor,
        color: color?.color,
      }}
    >
      <span>名称: {color?.name}</span>
      <span>背景色: {color?.bgColor}</span>
      <span>文字色: {color?.color}</span>
    </li>
  )
}
