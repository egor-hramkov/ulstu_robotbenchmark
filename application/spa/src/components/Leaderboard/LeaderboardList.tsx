import { useEffect, useState } from "react";
import { apiClientClass } from "../../shared/api";
import { ApiConfig } from "../../shared/api/http-client";
import { useAuthStore } from "../../store/useAuthStore";

export const LeaderboardList = () => {
  const [data, setData] = useState();

  const configMcc: ApiConfig = {
    baseUrl: "http://localhost:8000",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${useAuthStore((state) => state.token)}`,
      },
    },
  };

  const apiClient = new apiClientClass(configMcc);

  useEffect(() => {
    apiClient.Leaderboard.leaderboardRetrieve().then((data) =>
      console.log(data.data)
    );
  }, []);

  return <div>Лидербоард</div>;
};
