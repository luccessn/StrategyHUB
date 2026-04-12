import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { RoutersConfig } from "./Config/RoutersConfig";
import { motion } from "framer-motion";

export const AppRoutes = () => {
  const [isLoading, setisLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setisLoading(true);

    const timer = setTimeout(() => {
      setisLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      {isLoading ? (
        <div>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="flex items-center justify-center gap-6">
              <div className="load">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" />
                </svg>
              </div>

              <div className="load triangle">
                <svg viewBox="0 0 86 80">
                  <polygon points="43 8 79 72 7 72" />
                </svg>
              </div>

              <div className="load">
                <svg viewBox="0 0 80 80">
                  <rect x="8" y="8" width="64" height="64" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          {RoutersConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.Component}
            />
          ))}
        </Routes>
      )}
    </>
  );
};
