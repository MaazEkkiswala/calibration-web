import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const { getState, dispatch } = store;
// -------------------------------------------------------------- API Service Calls
//#region 
async function post(url: string, data: any = null) {
  const config: AxiosRequestConfig = {
    url,
    method: 'post'
  };

  if (data) {
    config.data = data;
  }
  const result = await axios(config);
  return result;
}

async function postWithDownload(url: string, data: any = null) {
  const config: AxiosRequestConfig = {
    url,
    method: 'post',
    responseType: 'blob'
  };
  if (data) {
    config.data = data;
  }
  const result = await axios(config);
  return result;
}

async function get(url: string, isDownloadRequest: boolean = false) {
  const config: AxiosRequestConfig = {
    url,
    method: 'get'
  };

  if (isDownloadRequest) {
    config.responseType = 'blob';
  }

  const result = await axios(config);
  return result;
}

async function put(url: string, data: any = null) {
  const config: AxiosRequestConfig = {
    url,
    method: 'put',
    data
  };
  const result = await axios(config);
  return result;
}

async function deleteCall(url: string) {
  const config: AxiosRequestConfig = {
    url,
    method: 'delete'
  };
  const result = await axios(config);
  return result;
}
//#endregion

// -------------------------------------------------------------- Default API Configurations
//#region 
// Defaults
// axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.baseURL = 'https://www.smartrecovery.in/api/api/';
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(async (config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

async function refreshTokens() {
  return false;
}

// Response interceptor
axios.interceptors.response.use(async (response: AxiosResponse): Promise<any> => {
  if (response.data instanceof Blob) {
    const { data } = response;
    return { data }
  }

  return response.data;
}, async (error: AxiosError) => {
  const data: any = await error.response?.data;
  const status = error.response?.status;
  if (status === axios.HttpStatusCode.UnprocessableEntity) {
    return { data: null, errors: data.errors }
  }

  if ([
    axios.HttpStatusCode.InternalServerError,
    axios.HttpStatusCode.NotFound,
    axios.HttpStatusCode.BadRequest
  ].includes(status as any)) {
    const toastPayload: toastType = {
      title: appUtils.getErrorMsgFromBadRequest(data.errors),
      variant: 'destructive',
    }

    dispatch(showToast(toastPayload))
    return { data: null };
  }

  if (status === axios.HttpStatusCode.UnprocessableEntity) {
    return { data: null, errors: data.errors };
  }

  if (status === axios.HttpStatusCode.Forbidden) {
    await ApiService.deleteCall(ApiUrls.logout);
    const toastPayload: toastType = {
      title: appUtils.getErrorMsgFromBadRequest(data.errors),
      variant: 'destructive',
    }

    dispatch(showToast(toastPayload))
    dispatch(logout());
    return { data: null };
  }

  if (status === axios.HttpStatusCode.Unauthorized) {
    return { data: null };
  }

  return { data: null, errors: data.errors };
});

//#endregion
const ApiService = {
  post,
  get,
  put,
  deleteCall,
  postWithDownload
};

export default ApiService;

// -------------------------------------------------------------- API URLs
//#region 
export const ApiUrls = {
  // Auth
  login: 'auth/login/portal',
  logout: 'auth/logout/portal',
};
//#endregion