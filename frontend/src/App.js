import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch existing notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch('http://localhost:8000/api/notes/')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = { title, content };

    fetch('http://localhost:8000/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then(data => {
        setNotes(prevNotes => [...prevNotes, data]); // Add new note to UI
        setTitle('');
        setContent('');
      })
      .catch(err => console.error("Error:", err));
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
