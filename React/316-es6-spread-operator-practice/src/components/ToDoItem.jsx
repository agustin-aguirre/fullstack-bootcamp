import { useState } from "react";


export default function ToDoItem(props) {
    const [isDone, setIsDone] = useState(false);
    return (
        <div onClick={() => { props.onChecked(props.id) }}>
            <li style={{ textDecoration: isDone ? "line-through" : "None" }} >
                {props.text}
            </li>
        </div>
    );
}