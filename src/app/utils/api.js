import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

// interseptors for all api requests
api.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...config.headers,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response for all api's
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      error["response"] = {
        data: {
          errors: [
            {
              message:
                "Проверьте подключение к Интернету или Сервер не отвечает",
            },
          ],
        },
      };

      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      alert(error.message);
    } else if (error.response.status === 400) {
      if (Array.isArray(error.response.data.data.messages)) {
        alert(error.response.data.data.messages[0].message);

        return Promise.reject(error);
      } else {
        alert(error?.response.data?.data.messages.message);

        return Promise.reject(error);
      }
    } else {
      alert(error?.response.data?.data.messages.message);
    }
  }
);
