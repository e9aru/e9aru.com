import styled from "styled-components"

const Main = styled.main`
  :before,
  :after {
    content: ".";
    font-size: 0;
    clear: both;
  }

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-width: 640px;
  margin: auto;
`

const App = () => {
  return (
    <Main>
      <h1>ꑀ ꁅ ꁲ ꌅ ꌈ</h1>
      <p>
        Marcin, Software engineer
        <br />
        #webdev #indiegamedev #kaizen
        <br />
        🎮 PC PS4 Switch
        <br />
        💪 caffeine junkie
      </p>
    </Main>
  )
}

export default App
