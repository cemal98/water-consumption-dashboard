import axios, { AxiosInstance } from "axios";
import { getError } from "./api.helper";

export class AxiosHelper {
  static instance: AxiosInstance;

  constructor(baseURL: string) {
    if (!AxiosHelper.instance) {
      AxiosHelper.instance = axios.create({ baseURL });
      this.addMws();
    }
  }

  private addMws() {
    AxiosHelper.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        throw getError(error);
      }
    );

    AxiosHelper.instance.interceptors.request.use((config) => {
      return config;
    });
  }
}

new AxiosHelper("http://localhost:5000");
