import axios from "axios";

const localBackendUrl =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:8080";

const baseURL = import.meta.env.DEV
  ? `${localBackendUrl.replace(/\/$/, "")}/api`
  : "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: false,
});

const csrfClient = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: false,
});

let csrfRequest = null;
let sessionController = new AbortController();
let demo = JSON.parse(localStorage.getItem("auth") || "null")?.demo === true;

export const changeApiSession = (user) => {
  sessionController.abort();
  sessionController = new AbortController();
  demo = user?.demo === true;
  clearCsrfToken();
};


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
  const controller = sessionController;
  config.signal = config.signal
    ? AbortSignal.any([config.signal, controller.signal])
    : controller.signal;
  const method = config.method?.toLowerCase();
  const isUnsafeMethod = !["get", "head", "options"].includes(method);

  if (isUnsafeMethod && demo && !["/auth/demo-login", "/auth/signin", "/auth/signout"].includes(config.url)) {
    throw new axios.AxiosError(
      "Preview only in demo mode. Changes, orders and payments are disabled.",
      "DEMO_READ_ONLY", config, null,
      { status: 403, data: { code: "DEMO_READ_ONLY", message: "Preview only in demo mode. Changes, orders and payments are disabled." } },
    );
  }
  if (isUnsafeMethod) {
    const token = await getCsrfToken();
    config.headers[token.headerName] = token.token;
  }

  return config;
});

export default api;