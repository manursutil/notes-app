import { useState } from "react";

const NotesList = ({ notes, onSelectNote }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-xl mx-auto mt-6">
            <input
                type="text"
                placeholder="🔍 Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-b shadow-sm rounded"
            />
            <ul className="space-y-2">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <li
                            key={note.id}
                            onClick={() => onSelectNote(note.id)}
                            className="cursor-pointer px-4 py-2 hover:bg-blue-50 border rounded shadow-sm transition border-b border-gray-200 shadow-sm rounded bg-gray-50"
                        >
                            <span className="font-medium text-gray-800">{note.title}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 italic">No matching notes found.</li>
                )}
            </ul>
        </div>
    );
};

export default NotesList;
