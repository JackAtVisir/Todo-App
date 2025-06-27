import type { Schema } from "../amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from "react-router-dom";

const client = generateClient<Schema>()

function LoadGame() {

  const navigate = useNavigate()
  const [games, setGames] = useState<Array<Schema["Game"]["type"]>>([]);

  useEffect(() => {
    console.log("Available models:", Object.keys(client.models))

    const subscription = client.models.Game.observeQuery().subscribe({
      next: (data) => {
        console.log("observeQuery data:", data);
        setGames([...data.items]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoad = (score:number, pointsPerClick: number) => {
     navigate("/cookie", {
      state: { loadScore: score, loadUpgrade: pointsPerClick }  
    });

  }

   function handleDelete(id: string) {
    client.models.Game.delete({ id })
  }

  return (
   <div
  style={{
    backgroundColor: "#f3e0c7", // cookie dough base
    border: "2px solid #d6b88d",
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "600px",
    margin: "2rem auto",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "Comic Sans MS, cursive, sans-serif",
  }}
>
  <h2 style={{ color: "#6b3e26", textAlign: "center" }}>Saved Games</h2>

  {games.length > 0 ? (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {games.map((game) => (
        <li
          key={game.id}
          style={{
            backgroundColor: "#fff2dc", // light cookie center
            border: "1px solid #dab58f",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "#4b2e1d", fontWeight: "bold" }}>
            🍪 Score: {game.gameScore}, Click Points: {game.upgrade}
          </span>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() =>
                handleLoad(game.gameScore ?? 0, game.upgrade ?? 0)
              }
              style={{
                backgroundColor: "#d6a15e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                boxShadow: "2px 2px 5px #aa7f4f",
                fontWeight: "bold",
              }}
            >
              Load
            </button>
            <button
              onClick={() => handleDelete(game.id)}
              style={{
                backgroundColor: "#bc544b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                boxShadow: "2px 2px 5px #8a3e36",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p
      style={{
        color: "#7b4b23",
        backgroundColor: "#fff5e6",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      No Saved Games 🍂
    </p>
  )}

  <button
    onClick={() => {
      navigate("/");
    }}
    style={{
      backgroundColor: "#a05f2c",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      marginTop: "1rem",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      boxShadow: "2px 2px 5px #7b4b23",
    }}
  >
    🏠 Home
  </button>
</div>

  )
}

export default LoadGame;
