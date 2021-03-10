import { useState } from "react"

const ControlPanel = ({ state }) => {
  const [text, setText] = useState("")
  const [fontSize, setFontSize] = useState(100)
  const app = state.pixiApp

  const handleTextInput = (e) => {
    setText(e.target.value)
    if (app) {
      app.showText(e.target.value)
    }
  }

  const handleFontSizeInput = (e) => {
    setFontSize(+e.target.value)
    if (app) {
      app.showText(text || "hello world", +e.target.value)
    }
  }

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
        <label>Font Size : {fontSize}</label>
        <button onClick={() => app.tl.play()}>Play</button>
        <button onClick={() => app.tl.pause()}>Pause</button>
        <button onClick={() => app.tl.restart()}>Restart</button>
      </div>
    </section>
  )
}

export default ControlPanel
