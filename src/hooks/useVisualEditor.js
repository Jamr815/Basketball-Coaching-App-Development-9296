import { useState, useEffect } from 'react';

export const useVisualEditor = () => {
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    setIsAdmin(adminAuth === 'true');
    
    // Listen for keyboard shortcut (Ctrl/Cmd + E)
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e' && isAdmin) {
        e.preventDefault();
        setEditMode(!editMode);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [editMode, isAdmin]);

  return {
    editMode,
    setEditMode,
    isAdmin
  };
};