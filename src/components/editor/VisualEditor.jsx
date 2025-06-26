import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit3, FiSave, FiX, FiType, FiImage, FiEye, FiEyeOff } = FiIcons;

const VisualEditor = ({ editMode, setEditMode, isAdmin }) => {
  if (!isAdmin) return null;

  return (
    <>
      {/* Floating Edit Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            editMode 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
          title={editMode ? 'Exit Edit Mode (Ctrl+E)' : 'Enter Edit Mode (Ctrl+E)'}
        >
          <SafeIcon icon={editMode ? FiEyeOff : FiEdit3} className="text-xl" />
        </button>
      </div>

      {/* Edit Mode Indicator */}
      {editMode && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiEdit3} />
            <span className="font-medium">Edit Mode Active</span>
          </div>
          <div className="text-xs mt-1">Click on any text or image to edit</div>
        </div>
      )}
    </>
  );
};

export default VisualEditor;