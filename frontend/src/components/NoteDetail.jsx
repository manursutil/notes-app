import { useParams } from "react-router-dom";
import { useState } from "react";

const NoteDetail = ({ notes, onBack, onDeleteNote, onEditNote }) => {
    const { id } = useParams();
    const note = notes.find((n) => n.id === id);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note?.title || "");
    const [editedContent, setEditedContent] = useState(note?.content || "");

    if (!note) {
        return (
            <div className="max-w-xl mx-auto mt-8 text-center text-red-600">
                <p className="text-lg font-medium">Note not found.</p>
                <button
                    onClick={onBack}
                    className="mt-4 text-blue-600 underline hover:text-blue-800"
                >
                    Back to list
                </button>
            </div>
        );
    }

    const handleSave = () => {
        onEditNote(note.id, {
            title: editedTitle.trim(),
            content: editedContent.trim()
        });
        setIsEditing(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white border rounded shadow">
            {isEditing ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">Edit Note</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Content</label>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows={5}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{note.title}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{note.content}</p>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteNote(note.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}

            <button
                onClick={onBack}
                className="mt-6 text-blue-600 underline hover:text-blue-800 block"
            >
                ← Back to list
            </button>
        </div>
    );
};

export default NoteDetail;
