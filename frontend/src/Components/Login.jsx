import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const { login, register, getToken } = useGlobalContext();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, name, password };
      const newUser = await register(userData);
      setMessage("Registracija uspešna! Sada se možete prijaviti.");
      setIsSignUp(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`Err: ${error.response.data.error}`);
      } else {
        setMessage("Registration error. Try again!");
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

      localStorage.setItem("token", user.token);
      setIsLoggedIn(true);
      setMessage("");

      getToken(user.token);
    } catch (exception) {
      setMessage("Invalid username or password");
      console.error(exception);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isSignUp ? "Sign Up" : "Login"}</h2>
      {message && <p style={styles.message}>{message}</p>}{" "}
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
        {isSignUp && (
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
