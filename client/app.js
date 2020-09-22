import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Cart from './components/cart'

const App = () => {
  return (
    <div>
      <Navbar />
      <Cart />
      <Routes />
    </div>
  )
}

export default App
