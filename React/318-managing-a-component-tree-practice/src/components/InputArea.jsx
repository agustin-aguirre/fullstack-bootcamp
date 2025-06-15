import {useState} from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    setInputText("");
    props.onSubmit(inputText);
  }

  return (
    <form className="form" onSubmit={(event) => handleOnSubmit(event)}>
      <input onChange={handleChange} type="text" value={inputText} />
      <button type="submit">
        <span>Add</span>
      </button>
    </form>
  );
}

export default InputArea;
