import frog from "../../img/frog.png";
import { menuItems } from "../../utils/menuItems";
import { singOut } from "../../utils/icons";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(140, 140, 140);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
  .bottom-nav {
    display: flex;
    justify-content: left;

    button {
      background-color: #222260;
      color: #fff;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background-color: #ffffff;
        color: #222260;
        border: 2px solid #222260;
      }
    }
  }
`;

function Navigation({ active, setActive, handleLogout }) {
  const { user } = useGlobalContext();
  return (
    <NavStyled>
      <div className="user-con">
        <img src={frog} height="100px" alt="" />
        <div className="text">
          <h2>{user ? user : "Mike"}</h2>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <button onClick={handleLogout}>{singOut} Signout</button>
      </div>
    </NavStyled>
  );
}

export default Navigation;
