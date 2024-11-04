import { apiClientClass } from "../shared/api";
import { useAuthStore } from "../store/useAuthStore";

const useApiClient = () => {
  const { token } = useAuthStore(state => ({
    token: state.token,
  }));

  // Create the apiClient instance with the current token
  const apiClient = new apiClientClass({
    baseUrl: "http://localhost:8000",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return apiClient;
};

export default useApiClient;