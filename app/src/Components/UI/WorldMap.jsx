"use client";

import { useRef, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import DottedMap from "dotted-map";

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();

  const [tooltip, setTooltip] = useState(null);
  // tooltip = { x, y, text }

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    [],
  );

  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.25,
      color: theme === "dark" ? "#FFFFFF40" : "#e5e7eb",
      shape: "circle",
    });
  }, [theme, map]);

  const projectPoint = (lat, lng) => {
    const width = 1056;
    const height = 495;

    const x = (lng + 180) * (width / 360);
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = height / 2 - (width * mercN) / (2 * Math.PI);

    return { x, y };
  };

  const handleMouseEnter = (e, dot) => {
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      label: dot.start.label,
      src: dot.src,
    });
  };

  // const handleMouseMove = (e) => {
  //   if (!tooltip) return;
  //   const rect = containerRef.current.getBoundingClientRect();
  //   setTooltip((prev) => ({
  //     ...prev,
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   }));
  // };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[2/1] rounded-lg relative font-sans"
      // onMouseMove={handleMouseMove}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 1056 495"
        className="w-full h-full absolute inset-0 select-none"
      >
        <defs>
          <filter
            id="point-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="-1"
              stdDeviation="1"
              floodColor={lineColor}
              floodOpacity="0.6"
            />
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodColor={lineColor}
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const p = projectPoint(dot.start.lat, dot.start.lng);

          return (
            <g
              key={i}
              className="cursor-target pointer-events-auto"
              onMouseEnter={(e) => handleMouseEnter(e, dot)}
              onMouseLeave={handleMouseLeave}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill={lineColor}
                filter="url(#point-shadow)"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill={lineColor}
                opacity="0.5"
                filter="url(#point-shadow)"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="8"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* ✅ Tooltip overlay */}
      {tooltip && (
        <div
          className="absolute z-50 bg-white dark:bg-neutral-900 text-sm text-neutral-700 dark:text-neutral-300 px-3 py-2 rounded-md shadow-lg pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <img src={tooltip.src} className="w-16 h-16 rounded-md" />
          <p>{tooltip.label}</p>
        </div>
      )}
    </div>
  );
}
