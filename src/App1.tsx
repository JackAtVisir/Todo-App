import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App1() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => {console.log("observeQuery data:", data); setTodos([...data.items])}, 
    });
    
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
    console.log('client', client)
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>{todo.content}
          </li>
        ))}
      </ul> 
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App1;
