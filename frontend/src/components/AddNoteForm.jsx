import { useState } from "react";

const AddNoteForm = ({ onAddNote }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle && !trimmedContent) return;

        onAddNote({ title: trimmedTitle, content: trimmedContent });

        setTitle("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-4 mb-6 p-4 border-b border-gray-200 shadow-sm rounded bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a New Note</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Note title"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
                    placeholder="Write your note..."
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Add Note
            </button>
        </form>
    );
};

export default AddNoteForm;
