import './index.css'
import { useDrag } from 'react-dnd'
import { TbMessageDots } from "react-icons/tb";
import { TiFolderOpen } from "react-icons/ti";

const TaskCard = ({ task, index }) => {
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Determine priority class based on task priority
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high'
      case 'low':
        return 'priority-low'
      case 'completed':
        return 'priority-completed'
      default:
        return 'priority-low'
    }
  }

  return (
    <div 
      ref={drag}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-priority">
        <span className={`priority-tag ${getPriorityClass(task.priority)}`}>{task.priority}</span>
        <span className="nav-icon">⋯</span>
      </div>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <div className="task-members">
          <div className="member-avatar">PJ</div>
          <div className="member-avatar">AB</div>
          <div className="member-avatar">CD</div>
        </div>
        <div className="task-stats">
          <div className="stat-item">
            <span className="nav-icon"><TbMessageDots /></span>
            <span>12 comments</span>
          </div>
          <div className="stat-item">
            <span className="nav-icon"><TiFolderOpen /></span>
            <span>0 files</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard