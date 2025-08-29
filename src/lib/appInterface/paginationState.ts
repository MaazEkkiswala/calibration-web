export default interface IPaginationState {
  sortBy: null | any;
  isReload: boolean;
  offset: number;
  limit: number;
  totalData?: number | null;
}
