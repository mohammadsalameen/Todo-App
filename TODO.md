# TODO: Implement addTask API Integration

- [x] Update `src/app/shared/task-form/task-form.component.ts`: Add selectedUser property and logic to emit transformed data (assignedUserId, assignedUserName, isUrgent, createdAt).
- [x] Update `src/app/shared/task-form/task-form.component.html`: Add (change) event on user select to set selectedUser.
- [x] Update `src/app/services/task.service.ts`: Change addTask method to POST to /api/Tasks and return Observable.
- [x] Update `src/app/tasks/add-task/add-task.component.ts`: Modify submitTask to subscribe to addTask Observable and handle navigation.
- [x] Test the add task functionality.
