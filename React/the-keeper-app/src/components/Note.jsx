export default function Note() {
    const title = "This is the note title";
    const content = "This is the note content"
    return (
        <div className="note">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
}