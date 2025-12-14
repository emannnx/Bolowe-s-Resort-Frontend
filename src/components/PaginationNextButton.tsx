import React, { useRef, MouseEvent } from 'react';
import NextIcon from "../assets/icons/next.svg";

interface PaginationNextButtonProps {
  disabled: boolean;
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
}

const PaginationNextButton: React.FC<PaginationNextButtonProps> = ({ disabled, onClick, ...item }) => {
  const listRef = useRef<HTMLLIElement>(null);

  const listStyle: React.CSSProperties = {
    color: disabled ? '#828282' : 'rgba(0,0,0,1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const iconStyle: React.CSSProperties = {
    filter: disabled ? 'invert(52%) sepia(43%) saturate(14%) hue-rotate(315deg) brightness(90%) contrast(96%)' : undefined,
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
      className='flex flex-row items-center gap-3 ml-4'
      style={listStyle}
      {...item}
    >
      <span className='hidden md:flex'>Next</span>
      <img src={NextIcon} style={iconStyle} alt='next' />
    </li>
  );
};

export default PaginationNextButton;

