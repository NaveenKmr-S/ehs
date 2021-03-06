/*jshint esversion: 6 */
import React from "react";

const Images = (props) => {
  return (
    <>
      <img className="mt-3 mb-1 pl-4 leftimages" src={props.src} alt="Images" />
    </>
  );
};

const LeftImages = ({ imgs }) => {
  return (
    <div>
      {imgs.map((v, i) => (
        <div>
          <Images key={i} src={v} />
          </div>
      ))}
    </div>
  );
};

export default LeftImages;
