import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Dodaj stanje za registraciju
  const [name, setName] = useState(""); // Stanje za ime, potrebno prilikom registracije

  const { login } = useGlobalContext();

  // Dodaj register funkciju
  const register = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, password }), // Pošalji podatke za registraciju
      });

      if (response.ok) {
        alert("Registracija uspešna! Sada se možete prijaviti.");
        setIsSignUp(false); // Postavi na prijavu nakon uspešne registracije
      } else {
        const errorData = await response.json();
        alert(`Greška: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Greška prilikom registracije:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });
      console.log("userr,", user);
      localStorage.setItem("token", user.token); // Sačuvaj token u localStorage
      setIsLoggedIn(true); // Postavi da je korisnik ulogovan
    } catch (exception) {
      console.error(exception);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={isSignUp ? register : handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isSignUp && ( // Prikaži polje za ime samo prilikom registracije
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Login;
