import { setLogout } from 'context/auth';

export const handleError = (error) => {
  const { config, request, response } = error;

  let data = { config };
  if (response) {
    data = {
      status: response.status,
      headers: response.headers,
      response: response.data || null,
    };

    if (response.status === 404) return data;

    if (response.status === 401 && response.data.message === 'jwt expired') {
      setLogout();
      return;
    }

    return data;
  } else if (request) {
    return {
      ...data,
      ...error.request,
      message: 'Check internet connection',
    };
  } else {
    return { ...data, message: error.message };
  }
};
