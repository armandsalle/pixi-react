import { useEffect, useRef, useState } from "react"
import PixiApp from "../lib/PixiApp"

const Canvas = (props) => {
  const canavsRef = useRef(null)

  const [app, setApp] = useState()
  const [fontIsLoaded, setFontLoad] = useState(false)

  useEffect(() => {
    const pixiApp = new PixiApp(canavsRef.current, {
      resolution: window.devicePixelRatio || 1,
      width: window.innerWidth,
      height: window.innerHeight,

      ...props.options,
    })
    setApp(pixiApp)
  }, [props.options, setApp])

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
      app.showText("Hello")
      app.anime()
    }
  }, [fontIsLoaded, app])

  return <canvas ref={canavsRef} />
}

export default Canvas
