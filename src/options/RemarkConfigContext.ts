import React from 'react'

export type ICustomColorName =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'cyan'
  | 'brown'
  | 'gray'
  | 'black'
  | 'white'
  | string

export type ICustomColor = {
  name: ICustomColorName
  bgColor?: string // 背景色
  color?: string // 字体颜色
  [key: string]: any
}

export interface IRemarkConfig {
  enable: boolean
  noMatchSite: string[]
  noMatchTags: string[]
  colors: ICustomColor[]
  [key: string]: any
}
export interface IRemarkConfigContext extends Partial<IRemarkConfig> {}

export const defaultRemarkConfig: IRemarkConfigContext = {
  /**
   * 是否启用划词标注功能
   */
  enable: true,

  /**
   * 不允许划词的网站
   */
  noMatchSite: [],

  /**
   * 不允许划词的标签
   */
  noMatchTags: [],

  /**
   * 用户自定义的标注色彩
   */
  colors: [
    {
      name: 'new color#32253d',
      bgColor: '#32253d',
      color: '#fff',
    },
    {
      name: 'new color#d8f41b',
      bgColor: '#d8f41b',
      color: '#000',
    },
    {
      name: 'new color#2ab907',
      bgColor: '#2ab907',
      color: '#fff',
    },
    {
      "name": "new color#5125d1",
      "bgColor": "#5125d1",
      "color": "#fff"
    },
    {
      "name": "new color#dd2ee9",
      "bgColor": "#dd2ee9",
      "color": "#fff"
    }
  ],
}

export const RemarkConfigContext = React.createContext<
  [IRemarkConfigContext, React.Dispatch<React.SetStateAction<IRemarkConfigContext>>]
>([{}, () => {}])

RemarkConfigContext.displayName = 'RemarkConfigContext'

export const RemarkConfigContextProvider = RemarkConfigContext.Provider
export const RemarkConfigContextConsumer = RemarkConfigContext.Consumer

export const useRemarkConfigContext = () => React.useContext(RemarkConfigContext)
