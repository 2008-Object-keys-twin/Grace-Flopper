import React from 'react'

import {Navbar, AllItems} from './components'
import Routes from './routes'
import Cart from './components/cart'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Cart /> */}
      <Routes />
      <AllItems />
    </div>
  )
}

export default App
