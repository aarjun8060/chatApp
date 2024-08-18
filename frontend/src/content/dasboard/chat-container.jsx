import { calculateTime } from "@/lib/CalculateTime";

const ChatContainer = ({ messages = [], currentChatUser }) => {
  return (
    <div className="h-[78vh] w-full relative flex-grow overflow-auto custom-scrollbar mt-16">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 left-0 !top-5 z-[-10] fixed"></div>
      <div className="mx-4 my-6 relative bottom-0 z-40 !left-0 ">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto mt-1">
            {messages && currentChatUser?.id && 
              messages.length > 0 &&
              messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${!(message?.senderId === currentChatUser?.id) ? "justify-start" : "justify-end"}`}
                >
                  {message?.messageType === "Message" && (
                    <div
                      className={`px-2 py-[5px] text-sm rounded-md font-medium flex gap-2 items-end max-w-[45%] ${message.senderId === currentChatUser.id ? "bg-primary text-white " : "bg-black/5 text-black/70"} `}
                    >
                      <span className="break-all">{message.message}</span>
                      <div className="flex gap-0 justify-end items-end">
                        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                          {calculateTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  )}
                  {message?.messageType === "Image" && (
                    
                    <div
                      className={`p-1 rounded-lg  ${message.senderId === currentChatUser.id ? "bg-primary text-white " : "bg-black/5 text-black/70"}`}
                    >
                      <div className="relative">
                        <img
                          src={`${message?.message}`}
                          className="rounded-lg"
                          alt="asset"
                          height={300}
                          width={300}
                        />
                        <div className="absolute bottom-1 right-1 flex items-end gap-1">
                          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                            {calculateTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                   
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
