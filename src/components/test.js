import { BitmapText, Container, Stage } from "@inlet/react-pixi"

import * as PIXI from "pixi.js"
import FontFaceObserver from "fontfaceobserver"

import { useState, useRef, useEffect } from "react"

const Test = () => {
  const textRef = useRef()
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false)
  const [world, setWorldVisible] = useState(false)

  const style = {
    fontSize: 100,
    font: "Oswald",
  }

  const font = new FontFaceObserver("Oswald")
  font.load().then(() => {
    PIXI.BitmapFont.from("Oswald", style, { resolution: res })
    setFontsAreLoaded(true)
  })

  const res = window.devicePixelRatio || 1
  const winWidth = window.innerWidth
  const winHeight = window.innerHeight

  useEffect(() => {
    if (fontsAreLoaded) {
      console.log(textRef.current.width)
      textRef.current.transform.position.x = -250
      // console.log(textRef.current.getLocalBounds())
    }
  }, [fontsAreLoaded])

  return (
    fontsAreLoaded && (
      <>
        <Stage
          width={winWidth}
          height={winHeight}
          options={{
            resolution: res,
            backgroundColor: 0xeef1f5,
            backgroundAlpha: true,
            autoDensity: true,
            antialias: true,
          }}
        >
          <Container position={[winWidth / 2, winHeight / 2]} anchor={0.5} resolution={res}>
            <BitmapText
              text={"hello"}
              anchor={0.5}
              x={0}
              y={0.5}
              resolution={res}
              ref={textRef}
              style={{ fontName: "Oswald", fontSize: 100 }}
            />
            {world && (
              <BitmapText
                text={"world"}
                anchor={0.5}
                x={0}
                y={0.5}
                resolution={res}
                // ref={textRef}
                style={{ fontName: "Oswald", fontSize: 100 }}
              />
            )}
          </Container>
        </Stage>
        {/* <div
          style={{
            fontSize: 50,
            fontFamily: "Oswald",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            margin: 0,
            padding: 0,
            display: "block",
            fontWeight: 400,
            color: "red",
          }}
        >
          Hello
        </div> */}
        <button onClick={() => setWorldVisible(true)}>click</button>
      </>
    )
  )
}

export default Test
