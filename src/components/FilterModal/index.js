import { useState, useEffect } from 'react';
import './index.css';

const FilterModal = ({ onClose, onApplyFilters, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters || {
    priority: [],
    status: []
  });

  const handlePriorityChange = (priority) => {
    setFilters(prev => {
      const newPriorities = prev.priority.includes(priority)
        ? prev.priority.filter(p => p !== priority)
        : [...prev.priority, priority];
      
      return {
        ...prev,
        priority: newPriorities
      };
    });
  };

  const handleStatusChange = (status) => {
    setFilters(prev => {
      const newStatuses = prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status];
      
      return {
        ...prev,
        status: newStatuses
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearAll = () => {
    setFilters({
      priority: [],
      status: []
    });
  };

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal-content">
        <div className="filter-modal-header">
          <h3>Filter Tasks</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="filter-section">
          <h4>Priority</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.priority.includes('High')}
                onChange={() => handlePriorityChange('High')}
              />
              <span className="priority-indicator high"></span>
              High
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.priority.includes('Low')}
                onChange={() => handlePriorityChange('Low')}
              />
              <span className="priority-indicator low"></span>
              Low
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.priority.includes('Completed')}
                onChange={() => handlePriorityChange('Completed')}
              />
              <span className="priority-indicator completed"></span>
              Completed
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h4>Status</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.status.includes('todo')}
                onChange={() => handleStatusChange('todo')}
              />
              To Do
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.status.includes('progress')}
                onChange={() => handleStatusChange('progress')}
              />
              In Progress
            </label>
            <label className="filter-option">
              <input 
                type="checkbox" 
                checked={filters.status.includes('done')}
                onChange={() => handleStatusChange('done')}
              />
              Done
            </label>
          </div>
        </div>

        <div className="filter-actions">
          <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
          <button className="apply-btn" onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
