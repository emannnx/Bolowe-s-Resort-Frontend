import React, { useRef, MouseEvent } from 'react';
import PrevIcon from "../assets/icons/previous.svg"

interface PaginationPrevButtonProps {
  disabled: boolean;
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
}

export const PaginationPrevButton: React.FC<PaginationPrevButtonProps> = ({ disabled, onClick }) => {
  const listRef = useRef<HTMLLIElement>(null);

  const listStyle: React.CSSProperties = {
    color: disabled ? '#828282' : 'rgba(0,0,0,1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const iconStyle: React.CSSProperties = {
    filter: disabled ? 'invert(52%) sepia(43%) saturate(14%) hue-rotate(315deg) brightness(90%) contrast(96%)' : '',
  };

  const clickHandler = (evt: MouseEvent<HTMLLIElement>) => {
    if (disabled) {
      return;
    }

    if ( listRef.current ) {
      listRef.current.style.animationName = 'bounce';
      listRef.current.style.animationDuration = '1s';
    }
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.style.animationName = '';
       }
    }, 1000);
    onClick(evt);
  };

  return (
    <li
      ref={listRef}
      onClick={clickHandler}
      className='flex flex-row items-center gap-3 mr-4'
      style={listStyle}
    >
      <img src={PrevIcon} style={iconStyle} alt='previous' />
      <span className='hidden md:flex'>Previous</span>
    </li>
  );
};


export default  PaginationPrevButton;