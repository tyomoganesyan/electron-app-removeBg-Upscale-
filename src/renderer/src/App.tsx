import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Removebg } from './components/Removebg';
import Navbar from './components/Navbar';
import { Upscale } from './components/Upscale';
import { useState } from 'react';

function App() {

  const [apiKey, setApiKey] = useState<string>('');

  return (
    <Router>
      <Navbar
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/removebg" />} />
        <Route path="/removebg" element={<Removebg apiKey={apiKey} />} />
        <Route path="/upscale" element={<Upscale apiKey={apiKey} />} />
      </Routes>
    </Router>
  );
}

export default App;
