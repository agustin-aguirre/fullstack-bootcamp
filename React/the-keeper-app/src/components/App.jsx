import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
import CreateArea from "./CreateArea"
import notes from "../data/notes"


function App() {

  const [notesData, setNotesData] = useState(notes);

  function NoteData(title, content) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
  }

  function addNote(title, content) {
    setNotesData(prev => {
      return [
        ...prev,
        new NoteData(title, content)
      ];
    })
  }

  function renderNote(noteData) {
    const {id, title, content} = noteData;
    return <Note 
      key={id}
      id={id}
      title={title}
      content={content}
      onClick={deleteNote}
    />;
  }

  function deleteNote(noteId) {
    setNotesData(prev => [...(prev.filter(noteData => noteData.id !== noteId))]);
  }

  return (
    <>
    <Header />
    <CreateArea 
      onSubmit={addNote}
    />
    {notesData.map(noteData => renderNote(noteData))}
    <Footer />
    </>
  )
}

export default App
