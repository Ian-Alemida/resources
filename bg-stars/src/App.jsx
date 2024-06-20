import { styled } from "styled-components"

const BackgroundBlack = styled.div`
 background: radial-gradient(ellipse closest-side at center, #112949 0, #0b1a2c 36%, #000 100%);
  width: 100%;
  margin: 0;
  height: 100vh;
  position: relative;
`
const Stars = styled.div`
  
`

function App() {

  return (
    <BackgroundBlack>
      <Stars></Stars>
    </BackgroundBlack>
  )
}

export default App
