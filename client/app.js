import React from 'react'

import {Navbar, AllItems, Cart} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Cart />
      <Routes />
      <AllItems />
    </div>
  )
}

export default App
