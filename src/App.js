import { useReducer, useRef, useState } from "react";
import "./styles.css";

const ACTIONS = {
  ADD_TODO: "add_todo",
  DELETE_TODO: "delete_todo",
  TOGGLE_TODO: "toggle_todo"
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, action.value];
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.value.id);
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.value.id) {
          //todo.isCompleted = !todo.isCompleted;
          return { ...todo, isCompleted: !todo.isCompleted };
        } else return todo;
      });
    default:
      return todos;
  }
};

export default function App() {
  //const [input, setInput] = useState("");

  const inputRef = useRef("");

  const [todos, dispatch] = useReducer(reducer, []);

  const addTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TODO,
      value: {
        id: Math.random(),
        value: inputRef.current.value,
        isCompleted: false
      }
    });
    inputRef.current.value = "";
  };
  console.log(todos);
  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input
          type="text"
          ref={inputRef}
          // value={inputRef.current.value}
          onChange={(e) => (inputRef.current.value = e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </form>
      {todos &&
        todos.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                border: "solid black 1px",
                margin: "5px auto",
                width: "50%",
                background: item.isCompleted ? "green" : "blue",
                cursor: "pointer"
              }}
              onClick={() => {
                dispatch({ type: ACTIONS.TOGGLE_TODO, value: item });
              }}
            >
              {item.value}
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={() =>
                  dispatch({ type: ACTIONS.DELETE_TODO, value: item })
                }
              >
                X
              </span>
            </div>
          );
        })}
    </div>
  );
}
