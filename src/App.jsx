import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Process from './pages/Process';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isVisible={loading} />
      <div className={`app-container ${loading ? 'loading' : ''}`}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/process" element={<Process />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
