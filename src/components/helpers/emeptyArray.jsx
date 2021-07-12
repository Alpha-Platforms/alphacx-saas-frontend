import React from "react";
import { NotFoundIcon } from "../../assets/images/svgs";
export default function EmeptyArray({ text }) {
  return (
    <div className="emeptyArrayWrap">
      {NotFoundIcon}
      <p>Opps No Result Found</p>
      <span>{text}</span>
    </div>
  );
}
