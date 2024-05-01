import { useEffect } from "react";
import { apiClientClass } from "../../shared/api";
import { ApiConfig } from "../../shared/api/http-client";
import { useAuthStore } from "../../store/useAuthStore";

export const TournamentList = () => {
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
    apiClient.Tournament.tournamentList().then((data) => console.log(data));
  }, []);
  return <h1>Тест</h1>;
};
