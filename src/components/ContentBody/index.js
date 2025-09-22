import './index.css'
import { useState, useEffect, useMemo } from 'react'
import { GrFormEdit } from "react-icons/gr";
import { IoLinkOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { CiFilter, CiCalendarDate } from "react-icons/ci";
import { useDrop } from 'react-dnd'
import TaskCard from '../TaskCard'
import initialTasks from '../../data/tasks'
import AddTaskModal from '../AddTaskModal'
import FilterModal from '../FilterModal'

// Drop target for each column
const TaskColumn = ({ status, title, tasks, onAddTask, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, item.status, status)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div 
      ref={drop} 
      className={`kanban-column column-${status}`}
      style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}
    >
      <div className="column-header">
        <div className="column-title">
          <span>{title}</span>
          <span className="column-count">{tasks.length}</span>
        </div>
        {status === 'todo' && (
          <span className="nav-icon" onClick={onAddTask}><FaPlus /></span>
        )}
      </div>
      <div className="column-indicator"></div>
      
      {tasks.map((task, index) => (
        <TaskCard key={task.id} task={task} index={index} />
      ))}
    </div>
  )
}

const ContentBody = () => {
  // State for tasks and modals
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })
  const [showModal, setShowModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filters, setFilters] = useState(() => {
    // Load filters from localStorage if available
    const savedFilters = localStorage.getItem('taskFilters')
    return savedFilters ? JSON.parse(savedFilters) : {
      priority: [],
      status: []
    }
  })

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  // Filter tasks based on selected filters
  const filteredTasks = useMemo(() => {
    const filterTask = (task) => {
      // If no filters are selected, show all tasks
      if (filters.priority.length === 0 && filters.status.length === 0) {
        return true;
      }
      
      // Check if task matches priority filter
      const priorityMatch = filters.priority.length === 0 || filters.priority.includes(task.priority);
      
      // Check if task matches status filter
      const statusMatch = filters.status.length === 0 || filters.status.includes(task.status);
      
      // Task must match both filters to be included
      return priorityMatch && statusMatch;
    };
    
    return {
      todo: tasks.todo.filter(filterTask),
      progress: tasks.progress.filter(filterTask),
      done: tasks.done.filter(filterTask)
    };
  }, [tasks, filters])
  
  // Handle applying filters
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem('taskFilters', JSON.stringify(newFilters));
  }

  // Function to move a task from one column to another
  const moveTask = (taskId, sourceStatus, targetStatus) => {
    setTasks(prevTasks => {
      // Find the task in the source column
      const taskToMove = prevTasks[sourceStatus].find(task => task.id === taskId)
      if (!taskToMove) return prevTasks

      // Create a copy of the task with updated status
      const updatedTask = { ...taskToMove, status: targetStatus }

      // Create new state with task moved to target column
      return {
        ...prevTasks,
        [sourceStatus]: prevTasks[sourceStatus].filter(task => task.id !== taskId),
        [targetStatus]: [...prevTasks[targetStatus], updatedTask]
      }
    })
  }

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      todo: [...prevTasks.todo, { ...newTask, id: `task-${Date.now()}`, status: 'todo' }]
    }))
    setShowModal(false)
  }

  return (
      <div className="content-body">
        {/* Project Header */}
        <div className="project-header">
          <div className="project-title">
            Mobile App
            <span className="nav-icon"><GrFormEdit /></span>
            <span className="nav-icon"><IoLinkOutline /></span>
          </div>
          <div className="project-actions">
            <button className="invite-btn">
              <span className="nav-icon"><FaPlus /></span>
              Invite
            </button>
            <div className="team-members">
              <div className="team-avatar">PJ</div>
              <div className="team-avatar">AB</div>
              <div className="team-avatar">CD</div>
              <div className="team-avatar">EF</div>
              <div className="more-members">+2</div>
            </div>
          </div>
        </div>

        {/* Filter and Today */}
        <div className="filter-container">
          <button 
            className={`filter-btn ${(filters.priority.length > 0 || filters.status.length > 0) ? 'filter-active' : ''}`}
            onClick={() => setShowFilterModal(true)}
          >
            <span className="nav-icon"><CiFilter /></span>
            Filter {(filters.priority.length > 0 || filters.status.length > 0) ? `(${filters.priority.length + filters.status.length})` : ''}
          </button>
          <button className="today-btn">
            <span className="nav-icon"><CiCalendarDate /></span>
            Today
          </button>
        </div>

        {/* Kanban Board */}
        <div className="kanban-container">
          <TaskColumn 
            status="todo" 
            title="To Do" 
            tasks={filteredTasks.todo} 
            onAddTask={() => setShowModal(true)} 
            moveTask={moveTask} 
          />
          <TaskColumn 
            status="progress" 
            title="On Progress" 
            tasks={filteredTasks.progress} 
            moveTask={moveTask} 
          />
          <TaskColumn 
            status="done" 
            title="Done" 
            tasks={filteredTasks.done} 
            moveTask={moveTask} 
          />
        </div>

        {/* Add Task Modal */}
        {showModal && (
          <AddTaskModal 
            onClose={() => setShowModal(false)} 
            onAddTask={addTask} 
          />
        )}
        
        {/* Filter Modal */}
        {showFilterModal && (
          <FilterModal
            onClose={() => setShowFilterModal(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={filters}
          />
        )}
      </div>
  )
}

export default ContentBody