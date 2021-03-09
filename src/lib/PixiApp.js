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
    })
  }

  loadFonts = (fontName) => {
    const font = new FontFaceObserver(fontName)

    font.load().then(() => {
      this.fonts = fontName
    })

    return font.load()
  }

  showText = (text) => {
    const container = new PIXI.Container()
    this.app.stage.addChild(container)

    const letters = text.split("")

    this.pixiLetters = letters.map((letter) => {
      const pLetter = new PIXI.Text(letter, { fontFamily: this.fonts, fontSize: 100, fill: 0xff1010, align: "center" })
      // pLetter.anchor.set(0.5)
      container.addChild(pLetter)
      return pLetter
    })

    this.pixiLetters.forEach((letter, i) => {
      if (i > 0) {
        letter.x = this.pixiLetters[i - 1].width + this.pixiLetters[i - 1].x + 20
      }

      const grid = new PIXI.Graphics()

      grid.lineStyle(2, 0xfeeb00, 1)
      grid.drawRect(letter.x, letter.y, letter.width, letter.height)

      container.addChild(grid)
    })

    const grid = new PIXI.Graphics()

    grid.lineStyle(2, 0x000000, 1)
    grid.drawRect(0, 0, container.width, container.height)

    container.addChild(grid)

    container.pivot.set(container.width / 2, container.height / 2)
    container.x = this.width / 2
    container.y = this.height / 2
  }

  destroy = () => {
    this.app.destroy()
  }

  anime = () => {
    let random = () => Math.floor(Math.random() * (100 - -100 + 1) + -100)
    anime({
      targets: this.pixiLetters,
      x: (e, i) => {
        return e.x + random()
      },
      y: (e, i) => {
        return e.y + random()
      },
      delay: anime.stagger(100),
      complete: () => {
        this.anime()
      },
    })
  }
}
