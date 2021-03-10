import * as PIXI from "pixi.js"
import anime from "animejs"
import FontFaceObserver from "fontfaceobserver"

export default class PixiApp {
  constructor(refCanvas, { resolution, width, height, backgroundColor }) {
    this.DOM = { canvas: refCanvas }
    this.resolution = resolution
    this.width = width
    this.height = height
    this.backgroundColor = backgroundColor
    this.fonts = {}
  }

  init = () => {
    this.app = new PIXI.Application({
      view: this.DOM.canvas,
      resolution: this.resolution,
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor || 0xffffff,
      backgroundAlpha: true,
      autoDensity: true,
      antialias: true,
      resizeTo: window,
    })
  }

  loadFonts = (fontName) => {
    const font = new FontFaceObserver(fontName)

    font.load().then(() => {
      this.fonts = fontName
    })

    return font.load()
  }

  createSplitText = (text, fontSize) => {
    const letters = text.split("")
    this.pixiLetters = letters.map((letter) => {
      const pLetter = new PIXI.Text(letter, {
        fontFamily: this.fonts,
        fontSize: fontSize || 100,
        fill: this.textColor || 0x000000,
        align: "center",
      })

      this.container.addChild(pLetter)

      return pLetter
    })
    this.pixiLetters.forEach((letter, i) => {
      if (i > 0) {
        letter.x = this.pixiLetters[i - 1].width + this.pixiLetters[i - 1].x + 10
      }
    })
  }

  showText = (text, fontSize) => {
    if (text) {
      this.text = text
    }

    this.app.stage.removeChild(this.container)
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    this.createSplitText(this.text, fontSize)

    // center the container
    this.container.pivot.set(this.container.width / 2, this.container.height / 2)
    this.container.x = this.width / 2
    this.container.y = this.height / 2

    // create a mask on the container
    const containerMask = new PIXI.Graphics()
    this.app.stage.addChild(containerMask)
    containerMask.x = this.container.x - this.container.width / 2
    containerMask.y = this.container.y - this.container.height / 2
    containerMask.beginFill(0x000000)
    containerMask.drawRect(0, 0, this.container.width, this.container.height)
    this.container.mask = containerMask

    this.fadeUpThemAll()
  }

  updateTextColor = (newColor) => {
    this.textColor = newColor
    this.pixiLetters.forEach((letter) => (letter.style.fill = this.textColor))
  }

  updateTextFontSize = (newFontSize) => {
    this.showText(null, newFontSize)
  }

  destroy = () => {
    this.app.destroy()
  }

  fadeUpThemAll = () => {
    this.tl = anime
      .timeline({
        easing: "easeOutQuad",
        duration: 500,
        loop: true,
        direction: "alternate",
        autoplay: false,
        update: () => {
          if (this.progressBar) {
            this.progressBar(this.tl.progress)
          }
        },
      })
      .add({
        targets: this.pixiLetters,
        y: (e) => {
          return [e.height, e.y]
        },
        alpha: [0, 1],
        delay: anime.stagger(30, { start: 200 }),
      })

    this.tl.play()
  }
}
