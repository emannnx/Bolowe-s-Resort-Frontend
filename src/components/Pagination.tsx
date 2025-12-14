import React from 'react';
import usePagination from '@mui/material/usePagination';
import  PaginationItem  from './PaginationItem';
import  PaginationPrevButton  from './PaginationPrevButton';
import  PaginationNextButton  from './PaginationNextButton';

interface PaginationProps {
  pageCount: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, setCurrentPage }) => {
  const { items } = usePagination({
    count: pageCount,
  });

  return (
    <ul className='flex flex-row items-center'>
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          children = <li key={index}>...</li>;
        } else if (type === 'page') {
          children = (
            <PaginationItem
              key={index}
              page={page as any}
              index={index}
              selected={selected}
              setCurrentPage={setCurrentPage}
              {...item}
            />
          );
        } else if (type === 'previous') {
          children = <PaginationPrevButton key={index} {...item} />;
        } else {
          children = <PaginationNextButton key={index} {...item} />;
        }

        return children;
      })}
    </ul>
  );
};


export default Pagination;
