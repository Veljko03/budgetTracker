import { useState, useEffect } from "react";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import styled from "styled-components";
const AppStyled = styled.div`
  height: 100vh;

  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const App = () => {
  const [active, setActive] = useState(1);
  return (
    <AppStyled className="App">
      <div style={MainLayout}>
        <Navigation active={active} setActive={setActive} />
        <main></main>
      </div>
    </AppStyled>
  );
};

export default App;
