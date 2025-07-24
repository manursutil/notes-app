const NotesList = ({ notes }) => {
    return (
        <div>
            {notes.map((note) => {
                <div>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>;
            })}
        </div>
    );
};

export default NotesList;