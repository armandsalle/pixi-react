import { useEffect, useRef, useState } from "react"
import PixiApp from "../lib/PixiApp"

const Canvas = (props) => {
  const canavsRef = useRef(null)

  const [fontIsLoaded, setFontLoad] = useState(false)

  const app = props.state.pixiApp
  const setPixiApp = props.state.setPixiApp

  useEffect(() => {
    if (!app) {
      const pixiApp = new PixiApp(canavsRef.current, {
        resolution: window.devicePixelRatio || 1,
        width: window.innerWidth,
        height: window.innerHeight,

        ...props.options,
      })
      setPixiApp(pixiApp)
    }
  }, [setPixiApp, props.options, app])

  useEffect(() => {
    if (app) {
      app.init()
      app.loadFonts("Oswald").then(() => {
        setFontLoad(true)
      })
    }

    return () => {
      if (app) {
        app.destroy()
      }
    }
  }, [app])

  useEffect(() => {
    if (fontIsLoaded) {
      app.showText("Hello world")
      app.fadeUpThemAll()
    }
  }, [fontIsLoaded, app])

  return <canvas ref={canavsRef} />
}

export default Canvas
