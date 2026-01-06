# TODO: Add Assign to User Field for Add-Task

- [x] Update ITodo interface in src/app/shared/models/todo.model.ts to include assignedUser?: number;
- [x] Modify TodoService.addTask in src/app/services/todo.service.ts to accept and set assignedUser in the new task object.
- [x] Update TaskFormComponent in src/app/shared/task-form/task-form.component.ts to inject UserService, fetch users, and add users property.
- [x] Add select dropdown for assignedUser in src/app/shared/task-form/task-form.component.html.
- [x] Test the add-task functionality to ensure the new field works correctly.
