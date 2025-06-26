import type { Schema } from "../amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>()

function LoadGame() {
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

  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            Score: {game.gameScore}, Click Points: {game.upgrade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadGame;
