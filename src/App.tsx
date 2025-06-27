import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const App = () => {

    const navigate = useNavigate()

    const { user, signOut } = useAuthenticator();
    const newGame = () => {navigate("/cookie")}
    const loadGame = () => {navigate('/loadGame')}

    return (

        <div
  style={{
    backgroundColor: "#f8e5c2", // light cookie dough
    border: "2px solid #d6b88d", // golden brown edge
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "400px",
    margin: "2rem auto",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "Comic Sans MS, cursive, sans-serif",
    textAlign: "center",
  }}
>
  <h2 style={{ color: "#6b3e26" }}>
    Welcome {user?.signInDetails?.loginId}
  </h2>

  <button
    onClick={loadGame}
    style={{
      backgroundColor: "#d6a15e", // cookie dough
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      margin: "0.5rem",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      boxShadow: "2px 2px 5px #aa7f4f",
    }}
  >
    Load Game
  </button>

  <button
    onClick={newGame}
    style={{
      backgroundColor: "#a05f2c", // slightly darker cookie
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      margin: "0.5rem",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      boxShadow: "2px 2px 5px #7b4b23",
    }}
  >
    New Game
  </button>

  <button
    onClick={signOut}
    style={{
      backgroundColor: "#bc544b", // red velvet cookie vibes
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      margin: "0.5rem",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      boxShadow: "2px 2px 5px #8a3e36",
    }}
  >
    Sign out
  </button>
</div>

    )
}

export default App