import React, {useState} from 'react'
import useDarkSide from '../hooks/useDarkSide'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Switcher = () => {

  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkside] = useState( colorTheme === 'light' ? true : false )

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme)
    setDarkside(checked)
  }


  return (
    <>
    <DarkModeSwitch
      // style={{ marginBottom: '2rem' }}
      checked={darkSide}
      onChange={toggleDarkMode}
      size={20}
    />
      
    </>
  )
}

export default Switcher