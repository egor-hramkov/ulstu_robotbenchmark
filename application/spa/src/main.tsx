import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TournamentList } from "./components/TournamentList/TournamentList.tsx";
import { App } from "./App.tsx";
import { LeaderboardList } from "./components/Leaderboard/LeaderboardList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TournamentList />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
