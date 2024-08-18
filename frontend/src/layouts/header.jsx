import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";

const Header = ({ isOnline, isTyping,user }) => {
  return (
    <div className="w-full h-[68px] border-b bg-black/5 fixed top-0">
      <div className="w-full h-full flex justify-center items-center px-4">
        <div className="w-full h-full flex justify-between items-center">
          <div className="flex space-x-2">
            <Avatar>
              <AvatarImage 
              src={user?.profilePicture && user?.profilePicture}
              alt="@shadcn" />
              <AvatarFallback>{user && user?.name && user?.name.slice(0,2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center text-center">
              <h5 className="font-medium flex items-center">
                {user?.name}{" "}
                <span>
                  <Dot
                    color={isOnline ? "#17F156" : "gray"}
                    strokeWidth={5.75}
                  />
                </span>
              </h5>
              <p
                className={`text-black/30 text-sm font-medium ${isTyping ? "flex" : "hidden"}`}
              >
                Typing....
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
