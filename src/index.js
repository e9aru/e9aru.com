import * as PIXI from "pixi.js"
import "./style.css"

// include the web-font loader script
/* eslint-disable */
;(function () {
  const wf = document.createElement("script")
  wf.src = `${
    document.location.protocol === "https:" ? "https" : "http"
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`
  wf.type = "text/javascript"
  wf.async = "true"
  const s = document.getElementsByTagName("script")[0]
  s.parentNode.insertBefore(wf, s)
})()
/* eslint-enabled */

window.WebFontConfig = {
  google: {
    families: ["Saira:400,900"],
  },

  active() {
    init()
  },
}

const copy =
  "Hi o/\nMarcin here. I'm a software engineer and caffeine junkie.\n<3 making stuff :D\n\n#webdev #gamedev #kaizen"
const closeNav = "nope :v"
const socials = {
  twitter: ["#1da1f2"],
  instagram: ["#c32aa3"],
  soundcloud: ["#ff5500"],
  linkedin: ["#0a66c2", "marcin.marzewski"],
  github: ["#171515"],
  discord: ["#5865f2"],
}
socials[closeNav] = ["white"]

const setupDOM = () => {
  // Nav
  const nav = document.createElement("nav")

  Object.entries(socials).forEach(([key, value]) => {
    const a = document.createElement("a")
    const span = document.createElement("span")

    span.textContent = key

    a.title = key
    a.target = "_blank"
    a.href = `https://${key}.com/${value[1] || "e9aru"}`
    a.style.setProperty("--bg", value[0])
    a.appendChild(span)

    nav.appendChild(a)

    if (key === closeNav) {
      a.href = "#"
      a.addEventListener("click", (event) => {
        event.preventDefault()
        nav.toggleAttribute("aria-pressed")
      })
    }
  })
  document.body.appendChild(nav)

  // Footer
  const footer = document.createElement("footer")
  const footerLink = document.createElement("a")

  footerLink.target = "_blank"
  footerLink.href = "https://github.com/e9aru/e9aru.com"
  footerLink.textContent = "Check code on Github"

  footer.appendChild(footerLink)
  document.body.appendChild(footer)

  const followMe = document.createElement("a")
  followMe.title = followMe.textContent = "Follow me"
  followMe.href = "#followme"
  followMe.id = "followme"
  followMe.addEventListener("click", (event) => {
    event.preventDefault()
    nav.toggleAttribute("aria-pressed")
  })
  document.body.appendChild(followMe)

  // VH
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  )
}

const initTwitter = () => {
  const url = `/.netlify/functions/fetch-twitter`
  fetch(url)
    .then((res) => res.json())
    .then(console.log)
}

const initPIXI = () => {
  const w = Math.min(window.innerWidth, 800)
  const h = window.innerHeight * 0.666

  class RandomPoint extends PIXI.Point {
    constructor(x = w, y = h) {
      super(Math.round(Math.random() * x), Math.round(Math.random() * y))
    }
  }

  class Particle extends PIXI.Sprite {
    static graphics
    static texture
    static maxSpeed = 4

    static setup() {
      Particle.graphics = new PIXI.Graphics()
      Particle.graphics.beginFill(0xffffff)
      Particle.graphics.drawCircle(0, 0, 1)
      Particle.graphics.endFill()
    }

    constructor(x, y) {
      super(app.renderer.generateTexture(Particle.graphics))

      // this.velocity = new PIXI.Point()
      // this.destination = new PIXI.Point(x, y)
      this.x = x
      this.y = y
      this.anchor.set(0.5)
    }

    update() {
      return

      this.distance = Math.sqrt(
        (this.destination.x - this.x) ** 2 + (this.destination.y - this.y) ** 2
      )

      // if (this.distance <= 1 && this.velocity.x < 1 && this.velocity.y < 1) return

      this.velocity.x = Math.max(
        -Particle.maxSpeed,
        Math.min(Particle.maxSpeed, (this.destination.x - this.x) * 0.5)
      )

      this.velocity.y = Math.max(
        -Particle.maxSpeed,
        Math.min(Particle.maxSpeed, (this.destination.y - this.y) * 0.5)
      )

      this.x += this.velocity.x
      this.y += this.velocity.y

      this.velocity.x *= 0.98
      this.velocity.y *= 0.98
    }
  }
  Particle.setup()

  const pool = new PIXI.ParticleContainer(1)

  const text = new PIXI.Text(copy, {
    fontFamily: "Saira",
    fontSize: 48,
    fontWeight: 900,
    fill: 0x666666,
    align: "center",
    wordWrap: true,
    wordWrapWidth: w * 0.9,
  })
  text.anchor.set(0.5)
  text.position.set(w / 2, h / 2)

  const app = new PIXI.Application({ width: w, height: h })
  document.body.appendChild(app.view)

  app.stage.addChild(text)
  app.stage.addChild(pool)

  const tmpCanvas = app.renderer.plugins.extract.canvas(app.stage)
  const imageData = tmpCanvas.getContext("2d").getImageData(0, 0, w, h)
  const widthDiff = (w - tmpCanvas.width) / 2
  const heightDiff = (h - tmpCanvas.height) / 2

  // app.stage.removeChild(text)

  let sprite, graphics

  for (let y = 0; y < h; y += 10) {
    for (let x = 0; x < w; x += 10) {
      if (imageData.data[(y * imageData.width + x) * 4 + 3] > 128) {
        pool.addChild(new Particle(x + widthDiff, y + heightDiff))
      }
    }
  }

  // app.ticker.add(() => pool.children.forEach((p) => p.update()))
  console.log(pool.children.length)
}

const init = () => {
  initPIXI()
  setupDOM()
  // initTwitter()
}
