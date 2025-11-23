export const ITEMS_PER_PAGE_OPTIONS = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: 'All', value: -1 }
];


export function CREATE_PAGING_MANAGER(itemsPerPage: number = 10, id?: any): any {
  return {
    id: id ?? 'PagId',
    currentPage: 1,
    itemsPerPage: itemsPerPage,
    totalItems: 0,
  };
}