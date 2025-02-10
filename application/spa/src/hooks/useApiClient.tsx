import { apiClientClass } from "../shared/api";
import { useAuthStore } from "../store/useAuthStore";

const useApiClient = () => {
  const { token } = useAuthStore(state => ({
    token: state.token,
  }));

  const apiClient = new apiClientClass({
    baseUrl: "https://virtual.robocross.ru",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return apiClient;
};

export default useApiClient;