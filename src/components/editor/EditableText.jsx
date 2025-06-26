import React, { useState, useRef, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import contentManager from '../../lib/contentManager';

const { FiSave, FiX, FiEdit3 } = FiIcons;

const EditableText = ({ 
  children, 
  contentKey, 
  editMode, 
  type = 'text', // 'text', 'textarea', 'heading'
  className = '',
  placeholder = 'Click to edit...'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(children);
  const [tempContent, setTempContent] = useState(children);
  const [isLoading, setIsLoading] = useState(false);
  const editRef = useRef(null);

  useEffect(() => {
    if (contentKey) {
      loadContent();
    }
  }, [contentKey]);

  const loadContent = async () => {
    try {
      const savedValue = await contentManager.getContentValue(contentKey);
      if (savedValue !== null) {
        setContent(savedValue);
        setTempContent(savedValue);
      } else {
        setContent(children);
        setTempContent(children);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setContent(children);
      setTempContent(children);
    }
  };

  const handleClick = (e) => {
    if (editMode && !isEditing && contentKey) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
      setTempContent(content);
      setTimeout(() => {
        if (editRef.current) {
          editRef.current.focus();
          if (type === 'text') {
            editRef.current.select();
          }
        }
      }, 100);
    }
  };

  const handleSave = async () => {
    if (!contentKey) return;
    
    setIsLoading(true);
    try {
      await contentManager.updateContent(contentKey, tempContent);
      setContent(tempContent);
      setIsEditing(false);
      showSaveNotification(true);
    } catch (error) {
      console.error('Error saving content:', error);
      showSaveNotification(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && type === 'text') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const showSaveNotification = (success) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce ${
      success 
        ? 'bg-green-600 text-white' 
        : 'bg-red-600 text-white'
    }`;
    
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          ${success 
            ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>'
            : '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>'
          }
        </svg>
        <span>${success ? 'Saved Permanently!' : 'Save Failed - Using Local Storage'}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  if (isEditing) {
    return (
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            ref={editRef}
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`${className} border-2 border-green-500 bg-green-50 min-h-[100px] resize-y`}
            placeholder={placeholder}
            disabled={isLoading}
          />
        ) : (
          <input
            ref={editRef}
            type="text"
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`${className} border-2 border-green-500 bg-green-50 w-full`}
            placeholder={placeholder}
            disabled={isLoading}
          />
        )}
        
        {/* Edit Controls */}
        <div className="absolute -top-12 left-0 flex space-x-2 bg-white rounded-lg shadow-lg border p-2 z-50">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
          >
            <SafeIcon icon={FiSave} className="text-xs" />
            <span>{isLoading ? 'Saving...' : 'Save'}</span>
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
          >
            <SafeIcon icon={FiX} className="text-xs" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} ${editMode && contentKey ? 'relative group cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {content}
      
      {/* Edit Indicator */}
      {editMode && contentKey && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            <SafeIcon icon={FiEdit3} className="inline mr-1" />
            Click to edit
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableText;