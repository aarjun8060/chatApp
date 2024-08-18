import ChatContainer from "@/content/dasboard/chat-container";
import SideBar from "@/content/dasboard/sidebar";
import ChatInput from "@/layouts/chat-input";
import Header from "@/layouts/header";
import socket from "@/lib/socket";
import { authApi } from "@/mocks/auth";
import { chatApi } from "@/mocks/chat";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log('userId',userId)
  const [user, setUser] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [loading,setLoading] = useState(false)
  const [chatUser,setChatUser] = useState(null)
  useEffect(() => {
    socket.on("welcome", (message) => {
      console.log(message);
    });

    if (!user?.id) {
      return;
    }
    socket.emit("add-user", { userId: user.id });
    socket.emit("check-online", { userId });
    socket.emit("messageStatus", { senderId: user?.id, receiverId: userId });
    socket.on("check-online", (status) => {
      setIsOnline(status ? true : false);
    });

    socket.on("chat-message", (chat) => {
      setChats((prev) => {
        const prevChats = [...prev];
        prevChats.push(chat);
        return prevChats;
      });
    });

    socket.on("typing", ({ senderId }) => {
      if (userId === senderId && isTyping) {
        return;
      } else if (userId === senderId) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });

    socket.on("messageStatus", (UpdatedChats) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          UpdatedChats.find((updatedChat) => updatedChat.id === chat.id)
        )
      );
    });

    return () => {
      socket.off("welcome");
      socket.off("typing");
      socket.off("messageStatus")
      socket.off("chat-message")
      socket.off("check-online")
    };
  }, [socket]);

  const getUserhandle = async () => {
    try {
      const result = await authApi.authGetUser();
      if (result) {
        setUser(result);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserhandle();
  }, []);

  const getAllChatsBetweenUser = async () => {
    try {
      setLoading(true)
      if (!userId) {
        return;
      }
      setChats([])
      const res = await chatApi.chatGetUsers(userId);
      if (res) {
        setChats(res);
        setLoading(false)
        return 
      }
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
    }
  };

  const getAllChatsUserHandle = async () => {
    try {
      setLoading(true)
      const res = await chatApi.chatWithAllUsers();
      if (res) {
        setUserDetails(res);
        setLoading(false)
      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllChatsBetweenUser();
  }, [userId]);

  useEffect(() => {
    getAllChatsUserHandle();
  }, []);
  
  return (
    <div className="w-full min-h-[100vh] flex">
      <div className="w-1/3 border !h-full">
        <SideBar userDetails={userDetails} setUserDetails={setUserDetails} setChatUser={setChatUser}/>
      </div>
      {userId ? (
        <div className="w-2/3 !overflow-none min-h-[100vh] relative">
          <Header isOnline={isOnline} isTyping={isTyping} user={chatUser} />
          {
            loading ? (<div className= "mt-[300px] text-center">Loading...</div>) : (
            <ChatContainer messages={chats} currentChatUser={user} />
            )
          }
          <ChatInput user={user} userId={userId} isOnline={isOnline} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DashBoard;
