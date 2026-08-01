import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACK_END_URL}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

const csrfClient = axios.create({
  baseURL,
  withCredentials: true,
});

let csrf = null;
let csrfRequest = null;

export const clearCsrfToken = () => {
  csrf = null;
  csrfRequest = null;
};

const getCsrfToken = async () => {
  if (csrf) return csrf;

  if (!csrfRequest) {
    csrfRequest = csrfClient
      .get("/auth/csrf")
      .then(({ data }) => {
        csrf = data;
        return data;
      })
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
