export const navLinks = [
  { label: 'Home', route: '/', exact: true },
  { label: 'Dashboard', route: '/admin/dashboard', exact: false },
  { label: 'Users', route: '/admin/users-list', exact: false },
  { label: 'Tasks Summary', route: '/tasks-summary', exact: false },
  { label: 'Add Task', route: '/admin/add-task', exact: false },
];

export const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Urgent', value: 'urgent' },
];