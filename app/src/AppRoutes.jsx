import React from "react";
import { Routes, Route } from "react-router-dom";
import { RoutersConfig } from "./Config/RoutersConfig";
export const AppRoutes = () => {
  return (
    <Routes>
      {RoutersConfig.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            Component={route.Component}
          />
        );
      })}
    </Routes>
  );
};
