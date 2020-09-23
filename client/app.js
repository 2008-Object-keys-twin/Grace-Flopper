import React from 'react'

import {Navbar, AllItems} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllItems />
    </div>
  )
}

export default App
