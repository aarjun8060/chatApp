import axios from "axios";
import { BackendURL } from "@/lib/constant";
class AuthApi {
  async authRegister(data) {
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/userapp/auth/register`,
        data
      );
      if (response && response?.data?.status === "SUCCESS") {
        return true;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  async authLogin(data) {
    try {
      const response = await axios.post(
        `${BackendURL}/api/v1/userapp/auth/login`,
        data
      );
      if (response && response?.data?.status === "SUCCESS") {
        localStorage.setItem("accessToken", response?.data?.data.accessToken);
        return true;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  async authGetUser() {
    try {
      const response = await axios.get(
        `${BackendURL}/api/v1/userapp/auth/get`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response && response?.data?.status === "SUCCESS") {
        return response?.data?.data;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
}

export const authApi = new AuthApi();
