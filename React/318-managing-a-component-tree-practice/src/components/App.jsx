import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [items, setItems] = useState([]);

  function ToDoItemData(text) {
    this.id = uuidv4();
    this.text = text;
  }


  function addItem(itemText) {
    setItems(prevItems => {
      return [...prevItems, new ToDoItemData(itemText)];
    });
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return item.id !== id;
      });
    });
  }

  function renderToDoItem(id, itemText) {
    return (
      <ToDoItem
        key={id}
        id={id}
        text={itemText}
        onChecked={deleteItem}
      />
    );
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onSubmit={addItem}/>
      <div>
        <ul>
          {items.map(todoItem => renderToDoItem(todoItem.id, todoItem.text))}
        </ul>
      </div>
    </div>
  );
}

export default App;
