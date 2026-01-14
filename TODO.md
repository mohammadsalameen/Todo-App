# TODO: Implement Pagination and Search for Admin Dashboard and Users List

## Tasks
- [x] Add getUsersPaged method to user.service.ts
- [x] Add refreshSubject to user.service.ts for triggering data refresh
- [x] Modify user-table.component.ts to use server-side pagination:
  - [x] Remove client-side filtering logic (allUsers, getFilteredUsers)
  - [x] Add loadUsers() method
  - [x] Update ngOnInit to call loadUsers()
  - [x] Modify search() to reset page and call loadUsers()
  - [x] Modify pageChanged() to call loadUsers()
  - [x] Modify onItemsPerPageChange() to reset page and call loadUsers()
  - [x] Subscribe to refreshSubject in ngOnInit
  - [x] Update refreshUsers() to call loadUsers()
- [x] Update admin-dashboard.component.ts to remove getAllUsers subscription
- [x] Update users-list.component.ts to trigger refreshSubject after operations
- [x] Test pagination and search functionality
- [x] Verify API integration
- [x] Ensure refresh after add/edit/delete operations
