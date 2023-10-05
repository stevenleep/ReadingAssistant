import { useRemarkConfigContext } from './RemarkConfigContext'
import { getDirection, randomColor } from '../shared/color'

export default function CreateRemarkColor() {
  const [_, handleUpdateValues] = useRemarkConfigContext()

  const createColor = () => {
    const color = randomColor()
    handleUpdateValues((values) => {
      console.log('values', values.colors)
      return {
        ...values,
        colors: [
          ...values.colors!,
          {
            name: 'new color' + color,
            bgColor: color,
            color: getDirection(color) === 'light' ? '#fff' : '#000',
          },
        ],
      }
    })
  }

  return <button className='create-color-btn' onClick={createColor}>Generate a color configuration</button>
}
