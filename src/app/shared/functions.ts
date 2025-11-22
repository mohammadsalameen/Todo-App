export function CREATE_PAGING_MANAGER(itemsPerPage: number = 10, id?: any): any {
  return {
    id: id ?? 'PagId',
    currentPage: 1,
    itemsPerPage: itemsPerPage,
    totalItems: 0,
  };
}