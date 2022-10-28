import React from "react";
import "./imghoverzoom.css";
const ImageHoverZoom = ({ imagePath }) => {
    return (
        <div className="img-wrapper">
            <img
                src={imagePath}
                alt=""
                className="hover-zoom"
                height={180}
            />
        </div>
    );
};
export default ImageHoverZoom;