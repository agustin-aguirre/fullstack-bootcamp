import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"

import notes from "../data/notes"


function createNote(noteData) {
  return <Note 
  key={noteData.key}
  title={noteData.title}
  content={noteData.content}
  />;
}


function App() {
  
  return (
    <>
    <Header />
    {notes.map(noteData => createNote(noteData))}
    <Footer />
    </>
  )
}

export default App
