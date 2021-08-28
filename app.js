document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`
)

const init = () => {
  const url = `/.netlify/functions/fetch-twitter`
  fetch(url)
    .then((res) => res.json())
    .then(console.log)
}

init()
