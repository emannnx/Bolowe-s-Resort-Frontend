import React from 'react';

type propType = {
    text:string,
    searchText:string,
    className?:string
}

const HighlightedText = ({ text, searchText ,className }:propType) => {
  const highlightedText = text.replace(
    new RegExp(`(${searchText})`, 'gi'),
    '<span class="text-black bg-yellow-200 ">$1</span>'
  );

  return (
    <div
    className={className}
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    />
  );
};

export default HighlightedText;