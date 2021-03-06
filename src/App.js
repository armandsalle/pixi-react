import { useState } from "react"
import Canvas from "./components/canvas"
import ControlPanel from "./components/controlPanel"

const App = () => {
  const [pixiApp, setPixiApp] = useState()

  return (
    <>
      <ControlPanel state={{ pixiApp }} />
      <Canvas options={{ backgroundColor: 0xffffff }} state={{ pixiApp, setPixiApp }} />
    </>
  )
}

export default App
