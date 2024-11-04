import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";

export const LeaderboardList = () => {
  const navigate = useNavigate();

  const apiClient = useApiClient();

  return (
    <div>
      <h1>Leaderboard</h1>
      Доработать
    </div>
  );
};
