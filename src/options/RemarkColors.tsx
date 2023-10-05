import { useMemo } from 'react'
import { ICustomColor } from './RemarkConfigContext'
import RemarkColorItem from './RemarkColorItem'
import CreateRemarkColor from './CreateRemarkColor'
import "./RemarkColors.css"

interface RemarkCustomColorOptionsProps {
  colors?: ICustomColor[]
}

export default function RemarkColors(props: RemarkCustomColorOptionsProps) {
  const colors = useMemo(() => props.colors || [], [props.colors]);

  function RenderColors({ colors }: { colors: ICustomColor[] }) {
    return colors.length ? (
      <ul className="remark-colors">
        {colors.map((color) => (
          <RemarkColorItem key={color.name} color={color} />
        ))}
      </ul>
    ) : null
  }

  return (
    <div className='remark-colors-component'>
      <CreateRemarkColor />
      <RenderColors colors={colors} />
    </div>
  )
}
