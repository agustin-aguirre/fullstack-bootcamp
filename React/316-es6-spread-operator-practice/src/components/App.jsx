import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDoItem from "./TodoItem";


function App() {

  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  
  function handleOnChange(event) {
    const text = event.target.value;
    setInputText(text);
  }

  function createToDoItem(id, itemText) {
    return <ToDoItem 
            key={id}
            id={id}
            text={itemText}
            onChecked={deleteItem}
            />
  }

  function addItem(event) {
    setItems((prevItems) => [...prevItems, { id: uuidv4(), text: inputText}]);
    setInputText("");
    event.preventDefault();
  }

  function deleteItem(id) {
    setItems(prevItems => prevItems.filter((item, index) => {
        return item.id !== id;
    }));
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form className="form" onSubmit={addItem}>
        <input onChange={handleOnChange} type="text" name="itemInput" value={inputText}/>
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
      <div>
        <ul>
          {items.map((item, index) => createToDoItem(item.id, item.text))}
        </ul>
      </div>
    </div>
  );
}

export default App;
