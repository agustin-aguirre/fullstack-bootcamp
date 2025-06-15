export default function Note(props) {

    function handleOnClick(event) {
        props.onClick(props.id);
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleOnClick}>DELETE</button>
        </div>
    );
}