import { productFilters } from '../types/productFilters';

const formatSortField = (filterData: productFilters) => {
  const sortDataString = filterData.sort;

  if (/latest/i.test(sortDataString)) return 'date-1';
  if (/oldest/i.test(sortDataString)) return 'date1';
  if (/priciest/i.test(sortDataString)) return 'price-1';
  if (/cheapest/i.test(sortDataString)) return 'price1';
  if (/a - z/i.test(sortDataString)) return 'name1';
  if (/z - a/i.test(sortDataString)) return 'name-1';

  return '';
};

export const formatFilterString = (filterData: productFilters) => {
  let sortString = `sort=${formatSortField(filterData) || ''}`;
  let sexString = `sex=${filterData.sex === 'all' ? '' : filterData.sex || ''}`;
  let categoryString = `category=${
    filterData.category === 'all' ? '' : filterData.category || ''
  }`;

  return `${sortString}&${sexString}&${categoryString}`;
};
