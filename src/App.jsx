import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddressNavbar from './Shared/AddressNavbar/AddressNavbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddressNavbar/>
    </>
  )
}

export default App
