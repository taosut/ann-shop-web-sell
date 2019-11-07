export interface PagingHeaders {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
}