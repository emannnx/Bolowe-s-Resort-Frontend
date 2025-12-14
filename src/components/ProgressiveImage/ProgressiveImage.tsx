import { useState, useEffect } from "react";
import "./ProgressiveImage.scss";

const ProgressiveImage = ({ placeholderSrc, src, className, ...props }:any) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  
    useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        setImgSrc(src);
    };
    }, [src]);

    const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";
  
    return (
      <img
        {...{ src: imgSrc, ...props }}
        alt={props.alt || ""}
        className={`${className} ${customClass}`}
      />
    );
  };
  export default ProgressiveImage;