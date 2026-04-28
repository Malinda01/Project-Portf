import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut } from 'lucide-react';

// Temporary dummy data for testing the UI
const dummyFeedback = [
  { id: '1', message: 'Great project! Keep it up.', date: '2026-04-28' },
  { id: '2', message: 'The UI could use some more padding.', date: '2026-04-27' },
];

export default function Dashboard() {
  const [feedback, setFeedback] = useState(dummyFeedback);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic protection: check if user is logged in
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="outline-btn">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="feedback-list">
        {feedback.length === 0 ? (
          <p>No feedback received yet.</p>
        ) : (
          feedback.map((item) => (
            <div key={item.id} className="card">
              <p>{item.message}</p>
              <div className="card-footer">
                <small>{item.date}</small>
                <button className="delete-btn">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}