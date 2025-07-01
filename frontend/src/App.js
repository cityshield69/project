import React, { useEffect, useState } from 'react';

// Use environment variable or fallback to relative path
const API_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

async function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch existing notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch(`${API_BASE}/notes/`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fetch error:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = { title, content };

    try {
      const response = await fetch(`${API_BASE}/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      const data = await response.json();
      setNotes(prevNotes => [...prevNotes, data]); // Add new note to UI
      setTitle('');
      setContent('');
    } catch (err) {
      console.error("Post error:", err);
    }
  };


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>My Notes</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          placeholder="Content"
          value={content}
          required
          onChange={e => setContent(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit">Add Note</button>
      </form>

      {/* List */}
      <ul>
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: '10px' }}>
            <strong>{note.title}</strong><br />
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
