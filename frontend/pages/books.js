import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', price: '' });
  const [token, setToken] = useState(null);  // 💡 Token is now state

  useEffect(() => {
    const storedToken = localStorage.getItem('access');
    setToken(storedToken);

    if (storedToken) {
      axios.get('http://127.0.0.1:8000/api/books/', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then(res => setBooks(res.data))
      .catch(err => alert('Unauthorized. Please login again.'));
    } else {
      alert('No token found. Please login.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You're not logged in");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/books/', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book added!');
      window.location.reload();  // refresh list
    } catch {
      alert('Failed to add book.');
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.title} - {b.author} - ₹{b.price}</li>
        ))}
      </ul>

      <h3>Add New Book</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} /><br/>
        <input type="text" placeholder="Author" onChange={e => setForm({ ...form, author: e.target.value })} /><br/>
        <input type="number" step="0.01" placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} /><br/>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
