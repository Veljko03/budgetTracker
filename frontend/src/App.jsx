import { useState, useEffect } from "react";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import styled from "styled-components";
import Incomes from "./Components/Incomes/Incomes";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expences from "./Components/Expences/Expences";
import { useGlobalContext } from "./context/GlobalContext";

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

const DisplayData = ({ activeToShow }) => {
  switch (activeToShow) {
    case 1:
      return <Dashboard />;
    case 2:
      return <Dashboard />;
    case 3:
      return <Incomes />;
    case 4:
      return <Expences />;

    default:
      return <Dashboard />;
  }
};
const App = () => {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);
  return (
    <AppStyled className="App">
      <div style={MainLayout}>
        <Navigation active={active} setActive={setActive} />
        <main>
          <DisplayData activeToShow={active} />
        </main>
      </div>
    </AppStyled>
  );
};

export default App;
