import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Removebg } from './components/Removebg';
import Navbar from './components/Navbar';
import { Upscale } from './components/Upscale';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/removebg" />} />
        <Route path="/removebg" element={<Removebg />} />
        <Route path="/upscale" element={<Upscale />} />
      </Routes>
    </Router>
  );
}

export default App;
