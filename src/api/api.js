import axios from "axios";

const localBackendUrl =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:8080";

const baseURL = import.meta.env.DEV
  ? `${localBackendUrl.replace(/\/$/, "")}/api`
  : "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

const csrfClient = axios.create({
  baseURL,
  withCredentials: true,
});

let csrfRequest = null;

export const clearCsrfToken = () => {
  csrfRequest = null;
};

const getCsrfToken = async () => {
  if (!csrfRequest) {
    csrfRequest = csrfClient
      .get("/auth/csrf")
      .then(({ data }) => data)
      .finally(() => {
        csrfRequest = null;
      });
  }

  return csrfRequest;
};

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();
  const isUnsafeMethod = !["get", "head", "options"].includes(method);

  if (isUnsafeMethod) {
    const token = await getCsrfToken();
    config.headers[token.headerName] = token.token;
  }

  return config;
});

export default api;
