"use client";

import { useState } from "react";

export const TooltipSVG = ({ children, content, x, y }) => {
  const [show, setShow] = useState(false);

  return (
    <g
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ cursor: "pointer" }}
    >
      {children}

      {show && (
        <foreignObject x={x + 10} y={y + 10} width="200" height="100">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="bg-white dark:bg-neutral-900 text-xs text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700"
          >
            {content}
          </div>
        </foreignObject>
      )}
    </g>
  );
};
