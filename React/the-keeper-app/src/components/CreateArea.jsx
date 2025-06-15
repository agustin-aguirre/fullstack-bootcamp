import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";


export default function CreateArea(props) {

  const [shownState, setShownState] = useState({
    isExpanded: false
  });

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

  function handleOnClick(event) {
    setShownState(prev => {
      return {
        ...prev,
        isExpanded: true
      }
    })
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleOnSubmit}>
        {shownState.isExpanded && (
          <input 
          onChange={handleOnChange} 
          name="title"
          value={inputsState.title}
          placeholder="Title" 
          />
        )}
        <textarea 
        onClick={handleOnClick} 
        onChange={handleOnChange} 
        name="content" 
        value={inputsState.content} 
        placeholder="Take a note..." 
        rows={shownState.isExpanded? 3 : 1}
        />
        <Zoom in={shownState.isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}