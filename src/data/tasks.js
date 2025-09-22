// Initial dummy task data
const initialTasks = {
  todo: [
    {
      id: 'task-1',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      status: 'todo',
      comments: 12,
      files: 0
    },
    {
      id: 'task-2',
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      priority: 'High',
      status: 'todo',
      comments: 10,
      files: 3
    },
    {
      id: 'task-3',
      title: 'Wireframes',
      description: 'Low fidelity wireframes include the most basic content and visuals.',
      priority: 'High',
      status: 'todo',
      comments: 12,
      files: 0
    }
  ],
  progress: [
    {
      id: 'task-4',
      title: 'App Design',
      description: 'Designing the user interface for the mobile application.',
      priority: 'Low',
      status: 'progress',
      comments: 8,
      files: 2
    },
    {
      id: 'task-5',
      title: 'Backend API',
      description: 'Implementing the RESTful API endpoints for the application.',
      priority: 'High',
      status: 'progress',
      comments: 15,
      files: 5
    },
    {
      id: 'task-6',
      title: 'User Testing',
      description: 'Conducting user testing sessions to gather feedback.',
      priority: 'Low',
      status: 'progress',
      comments: 6,
      files: 1
    }
  ],
  done: [
    {
      id: 'task-7',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      status: 'done',
      comments: 12,
      files: 0
    },
    {
      id: 'task-8',
      title: 'Design System',
      description: 'It just needs to adapt the UI from what you did before.',
      priority: 'Completed',
      status: 'done',
      comments: 12,
      files: 15
    }
  ]
};

export default initialTasks;
