import { useState, useEffect } from "react";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import styled from "styled-components";
import Incomes from "./Components/Incomes/Incomes";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expences from "./Components/Expences/Expences";
import { useGlobalContext } from "./context/GlobalContext";
import Login from "./Components/Login";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dodaj stanje prijave
  const { getToken } = useGlobalContext();

  useEffect(() => {
    // Proveri da li postoji token u localStorage prilikom učitavanja aplikacije
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      getToken(token);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  console.log(isLoggedIn, "SetloggedIn");
  const global = useGlobalContext();
  console.log(global);
  return (
    <AppStyled className="App">
      {isLoggedIn ? (
        <div style={MainLayout}>
          <Navigation
            active={active}
            setActive={setActive}
            handleLogout={handleLogout}
          />
          <main>
            <DisplayData activeToShow={active} />
          </main>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} /> // ako nije ulogovan
      )}
    </AppStyled>
  );
};

export default App;
