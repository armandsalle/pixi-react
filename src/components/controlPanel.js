import { useRef, useState, useEffect } from "react"

const ControlPanel = ({ state }) => {
  const tlProgressRef = useRef(null)

  const [text, setText] = useState("")
  const [fontSize, setFontSize] = useState(100)
  const [color, setColor] = useState("#000000")
  const [tlProgress, setTlProgress] = useState(0)

  const app = state.pixiApp

  const handleTextInput = (e) => {
    const newText = e.target.value
    setText(newText)

    if (app) {
      app.showText(newText)
    }
  }

  const handleFontSizeInput = (e) => {
    const newFontSize = +e.target.value
    setFontSize(newFontSize)

    if (app) {
      app.updateTextFontSize(newFontSize)
    }
  }

  const handleColorInput = (e) => {
    const newColor = e.target.value
    setColor(newColor)

    if (app) {
      app.updateTextColor(newColor)
    }
  }

  const handleTlProgressInput = (e) => {
    const newProgress = e.target.value
    setTlProgress(newProgress)

    app.tl.seek(app.tl.duration * (newProgress / 100))
  }

  useEffect(() => {
    if (app) {
      app.progressBar = setTlProgress
    }
  }, [app])

  return (
    <section className="panel">
      <div className="input-wrapper">
        <label>Text</label>
        <input type="text" placeholder="Hello World" value={text} onChange={(e) => handleTextInput(e)} />
      </div>
      <div className="input-wrapper">
        <label>Font Size : {fontSize}</label>
        <input type="range" min="20" max="200" step="1" value={fontSize} onChange={(e) => handleFontSizeInput(e)} />
      </div>
      <div className="input-wrapper">
        <label>Color</label>
        <input type="color" value={color} onChange={(e) => handleColorInput(e)} />
      </div>
      <div className="input-wrapper">
        <label>Timeline controls</label>
        <button onClick={() => app.tl.play()}>Play</button>
        <button onClick={() => app.tl.pause()}>Pause</button>
        <button onClick={() => app.tl.restart()}>Restart</button>
        <input
          ref={tlProgressRef}
          type="range"
          min="0"
          max="100"
          step=".001"
          value={tlProgress}
          onChange={(e) => handleTlProgressInput(e)}
        />
      </div>
    </section>
  )
}

export default ControlPanel
