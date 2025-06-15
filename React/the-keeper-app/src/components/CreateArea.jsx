import { useState } from "react";


export default function CreateArea(props) {

  const [inputsState, setInputsState] = useState({
    title: "",
    content: ""
  });

  function handleOnSubmit(event) {
    if (inputsState.title === "" || inputsState.content === "") return;
    event.preventDefault();
    props.onSubmit(inputsState.title, inputsState.content);
    setInputsState({
      title: "",
      content: ""
    });
  }

  function handleOnChange(event) {
    const {name, value} = event.target;
    setInputsState(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input onChange={handleOnChange} name="title" value={inputsState.title} placeholder="Title" />
        <textarea onChange={handleOnChange} name="content" value={inputsState.content} placeholder="Take a note..." rows="3" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}