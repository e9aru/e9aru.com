import * as PIXI from "pixi.js"
import "./style.css"

const socials = {
  twitter: "#1da1f2",
  instagram: "#c32aa3",
  soundcloud: "#ff5500",
  linkedin: "#0a66c2",
  github: "#171515",
  discord: "#5865f2",
}

const setupDOM = () => {
  // Nav
  const nav = document.createElement("nav")

  Object.entries(socials).forEach(([key, color]) => {
    const a = document.createElement("a")
    const span = document.createElement("span")

    span.textContent = key

    a.title = key
    a.target = "_blank"
    a.href = `https://${key}.com/e9aru`
    a.style.setProperty("--bg", color)
    a.appendChild(span)

    nav.appendChild(a)
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

  // VH
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  )
}

const initPIXI = () => {
  const app = new PIXI.Application()

  document.body.appendChild(app.view)
}

const initTwitter = () => {
  const url = `/.netlify/functions/fetch-twitter`
  fetch(url)
    .then((res) => res.json())
    .then(console.log)
}

initPIXI()
setupDOM()
// initTwitter()
