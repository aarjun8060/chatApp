import axios from "axios";
import { BackendURL } from "@/lib/constant";
class ChatApi {
  async chatGetUsers(id) {
    try {
      const response = await axios.get(
        `${BackendURL}/api/v1/userapp/chat/chatById/${id}`,
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

  async chatWithAllUsers() {
    try {
      const response = await axios.get(
        `${BackendURL}/api/v1/userapp/auth/allUsersChats`,
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

export const chatApi = new ChatApi();
