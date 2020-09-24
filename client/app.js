import React from "react"

import { Navbar, AllItems } from "./components"
import Routes from "./routes"
import Cart from "./components/cart"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
