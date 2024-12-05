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
const backendURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
console.log(backendURL);
new AxiosHelper(backendURL);
