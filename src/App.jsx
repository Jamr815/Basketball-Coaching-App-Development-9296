import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import VisualEditor from './components/editor/VisualEditor';
import { useVisualEditor } from './hooks/useVisualEditor';
import Home from './pages/Home';
import Programs from './pages/Programs';
import About from './pages/About';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import DrillsLibrary from './pages/DrillsLibrary';
import Admin from './pages/Admin';

function App() {
  const { editMode, setEditMode, isAdmin } = useVisualEditor();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/drills" element={<DrillsLibrary />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </motion.main>
        <Footer />
        
        {/* Visual Editor */}
        <VisualEditor editMode={editMode} setEditMode={setEditMode} isAdmin={isAdmin} />
      </div>
    </Router>
  );
}

export default App;