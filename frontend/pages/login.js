import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: form.username,
        password: form.password
      });

      localStorage.setItem('access', res.data.access);
      alert('Login successful');
      router.push('/books');
    } catch (err) {
      console.log(err.response?.data);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={e => setForm({ ...form, username: e.target.value })}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        /><br/>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
