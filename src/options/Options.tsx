import { useState } from 'react'
import {
  RemarkConfigContextProvider,
  defaultRemarkConfig,
} from './RemarkConfigContext'
import RemarkOptions from './RemarkOptions'
import './Options.css'

function App() {
  const [values, updateValues] = useState(defaultRemarkConfig);
  return (
    <main>
      <RemarkConfigContextProvider value={[values, updateValues]}>
        <RemarkOptions />
      </RemarkConfigContextProvider>
    </main>
  )
}

export default App
