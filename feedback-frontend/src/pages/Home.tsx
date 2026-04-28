import React, { useState } from 'react';
import { submitFeedback } from '../services/api';
import { Send } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFeedback(text);
      setText('');
      setStatus('Feedback sent anonymously!');
    } catch (err) {
      setStatus('Failed to send. Try again.');
    }
  };

  return (
    <div className="container">
      <h1>Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          required
        />
        <button type="submit">
          <Send size={18} /> Send Feedback
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}