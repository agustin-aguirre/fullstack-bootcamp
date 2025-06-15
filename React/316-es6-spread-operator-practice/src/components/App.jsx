import {useState} from "react";

function App() {

  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  
  function handleOnChange(event) {
    const text = event.target.value;
    setInputText(text);
  }

  function addItem(event) {
    setItems((prevItems) => [...prevItems, inputText]);
    setInputText("");
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form className="form">
        <input onChange={handleOnChange} type="text" name="itemInput" value={inputText}/>
        <button type="submit" onClick={addItem}>
          <span>Add</span>
        </button>
      </form>
      <div>
        <ul>
          {items.map((todoItem) => <li>{todoItem}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
