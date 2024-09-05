import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Stanje za registraciju
  const [name, setName] = useState(""); // Stanje za ime prilikom registracije
  const [message, setMessage] = useState(""); // Stanje za prikazivanje poruka

  const { login, register } = useGlobalContext();

  // Funkcija za registraciju korisnika
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, name, password };
      const newUser = await register(userData); // Poziv nove funkcije za registraciju iz konteksta
      setMessage("Registracija uspešna! Sada se možete prijaviti.");
      setIsSignUp(false); // Prebaci na login nakon uspešne registracije
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`Greška: ${error.response.data.error}`);
      } else {
        setMessage("Greška prilikom registracije. Pokušajte ponovo.");
      }
      console.error("Registration error:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });
      console.log("user,", user);
      localStorage.setItem("token", user.token);
      setIsLoggedIn(true);
      setMessage("");
    } catch (exception) {
      setMessage("Neispravno korisničko ime ili lozinka."); // Prikaži grešku za neispravne kredencijale
      console.error(exception);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isSignUp ? "Sign Up" : "Login"}</h2>
      {message && <p style={styles.message}>{message}</p>}{" "}
      {/* Prikaži poruku ako postoji */}
      <form
        onSubmit={isSignUp ? handleRegister : handleLogin}
        style={styles.form}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        {isSignUp && ( // Prikaži polje za ime samo prilikom registracije
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
      <p style={styles.toggleText}>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage("");
          }}
          style={styles.toggleButton}
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

// CSS-in-JS stilovi
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "30px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    marginBottom: "10px",
  },
  toggleText: {
    marginTop: "20px",
    color: "#333",
  },
  toggleButton: {
    marginLeft: "5px",
    color: "#007bff",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
  },
  message: {
    color: "#d9534f",
    marginBottom: "15px",
    fontSize: "1rem",
  },
};

export default Login;
