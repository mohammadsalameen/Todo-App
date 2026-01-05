export interface NavLink{
  label: string;
  route: string;
  exact: boolean;
  roles: ('Admin' | 'User')[];
}
export const navLinks: NavLink[] = [
  { label: 'Home', route: '/', exact: true, roles:['Admin', 'User'] },
  { label: 'Dashboard', route: '/admin/dashboard', exact: false, roles:['Admin'] },
  { label: 'Dashboard', route: '/user/dashboard', exact: false, roles:['User']  },
  { label: 'Users', route: '/admin/users-list', exact: false, roles:['Admin']  },
  { label: 'Tasks Summary', route: '/tasks-summary', exact: false, roles:['Admin', 'User']  },
  { label: 'Add Task', route: '/admin/add-task', exact: false,roles:['Admin']  },
];

export const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Urgent', value: 'urgent' },
];