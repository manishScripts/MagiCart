import React, { useState, useEffect } from 'react'
import { Plus, List, CheckCircle } from 'lucide-react';

const Sidebar = ({ onSelectItem, selectedItem }) => {
  const [activeItem, setActiveItem] = useState(selectedItem || 'add');

  useEffect(() => {
    if (selectedItem !== undefined) setActiveItem(selectedItem);
  }, [selectedItem]);

  const menuItems = [
    { id: 'add', label: 'Add Items', icon: Plus },
    { id: 'list', label: 'List Items', icon: List },
    { id: 'orders', label: 'View Orders', icon: CheckCircle }
  ];

  return (
    <aside className="w-64 bg-slate-800 shadow-lg h-full hidden md:flex md:flex-col">
      <nav className="flex flex-col p-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                if (onSelectItem) onSelectItem(item.id);
              }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-2
                ${isActive 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-slate-700'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
