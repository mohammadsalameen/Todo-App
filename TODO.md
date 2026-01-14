# TODO: Implement Pagination for Tasks using Paged API

## Tasks
- [x] Add getTasksPaged and getMyTasksPaged methods to task.service.ts
- [x] Modify task-table.component.ts to use server-side pagination:
  - [x] Add loadTasks() method
  - [x] Update ngOnInit to call loadTasks()
  - [x] Modify search() to reset page and call loadTasks()
  - [x] Modify pageChanged() to call loadTasks()
  - [x] Modify onItemsPerPageChange() to reset page and call loadTasks()
  - [x] Keep filters (completed/urgent) client-side on loaded tasks
- [x] Test pagination in admin user-tasks and user dashboard
- [x] Verify API integration
