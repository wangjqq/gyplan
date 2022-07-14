import axios from "axios"
import {
  Message
} from "element-ui";
const request = axios.create({
  // baseURL: "http://127.0.0.1:3007",
  baseURL: "https://z40872287j.goho.co/:3007",
  timeout: 5000
})

// response interceptor响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 2000,
    });
    return Promise.reject(error);
  }
);

export default request;