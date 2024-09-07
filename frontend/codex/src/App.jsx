import './index.css'; 
import Python from './components/Python';
import Nav from './components/Nav';
import Bash from './components/Bash';
import About from './components/About';
import Secret from './components/Secret';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Python />} />
        <Route path="/bash" element={<Bash />} />
        <Route path="/about" element={<About />} />
        <Route path="/secret" element={<Secret />} />

      </Routes>
    </Router>
  )
}

export default App;
