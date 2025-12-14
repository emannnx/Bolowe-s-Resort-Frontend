import React, { useEffect } from 'react';

interface PaginationItemProps {
  page: number;
  index: number;
  selected: boolean;
  setCurrentPage: (page: number) => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({ page, index, selected, setCurrentPage, ...item }) => {
  useEffect(() => {
    if (selected) setCurrentPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <li
      key={index}
      {...item}
      className='list-none text-[15px] leading-[18px] font-bold cursor-pointer mx-4 transition-all duration-1000'
      style={{
        color: selected ? '#000' : 'rgba(0,0,0,0.4)',
        textDecoration: selected ? 'underline' : undefined,
      }}
    >
      {page}
    </li>
  );
};

export default PaginationItem;
