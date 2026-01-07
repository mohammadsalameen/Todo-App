# TODO: Integrate Admin Dashboard with API

## Completed
- [x] Analyze project structure and API requirements
- [x] Create implementation plan
- [x] Get user confirmation

## In Progress
- [x] Update models in todo.model.ts (Add IUser, change ITodo id to string, comments to string[])
- [x] Update UserService (HttpClient, observables, methods)
- [x] Update AdminDashboardComponent (subscribe to users)
- [x] Update UserTableComponent (subscribe, use userName, navigate with userId)
- [x] Update routes (add :userId to user-tasks)
- [x] Update UserTasksComponent (get userId from route, pass to TaskTable)
- [x] Update TaskTableComponent (accept userId, filter tasks)
- [x] Update ViewTaskComponent (subscribe to task, display comments list)
- [x] Update ViewTaskComponent.html (show comments as list)

## Followup
- [x] Add auth interceptor
- [ ] Test API integration
- [ ] Verify navigation and data display
- [ ] Handle loading/error states if needed
