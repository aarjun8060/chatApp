import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { uploadImage } from "@/mocks/uploadImage";
import { Paperclip, SendHorizontal } from "lucide-react";
import { useRef, useState } from "react";

const ChatInput = ({ userId, user, isOnline }) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const sendMessageHandle = () => {
    socket.emit("chat-message", {
      receiverId: userId,
      senderId: user?.id,
      message: message,
      messageType: "Message",
      status: isOnline ? "Unread" : "Delivered",
    });
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", { receiverId: userId, senderId: user?.id });
  };

  const handlePauseTyping = () => {
    socket.emit("typing", { receiverId: userId, senderId: "" });
  };

  const handlePaperclipClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full h-[80px] border-t absolute bottom-0">
      <div className="w-full !h-full border-t flex justify-center items-center">
        <div className="relative w-11/12">
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden" // Hide the input element
              onChange={async (e) => {
              
                let img = e.target.files && e.target.files[0];
                if (img) {
                  let url = await uploadImage(img)
                  if(!url){
                    return
                  }
                  socket.emit("chat-message", {
                    receiverId: userId,
                    senderId: user?.id,
                    message: url,
                    messageType: "Image",
                    status: isOnline ? "Unread" : "Delivered",
                  });

                }

              }}
            />
            <Paperclip
              color="#ea580c"
              className="absolute right-14 top-2 cursor-pointer"
              onClick={handlePaperclipClick}
            />
          </div>
          <div className="absolute right-2 top-[8px] bg-orange-100 rounded-md p-1 cursor-pointer">
            <SendHorizontal color="#ea580c" onClick={sendMessageHandle} />
          </div>
          <Input
            placeholder="Type your message here"
            className="text-lg h-12"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={handleTyping}
            onKeyUp={handlePauseTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
