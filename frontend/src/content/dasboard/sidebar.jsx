import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { calculateTime } from "@/lib/CalculateTime";
import { useState } from "react";
import { Link } from "react-router-dom";
function filterAndSortChats(users, chatStatus) {
  return users
      .map(user => {
          const filteredChats = user.chats.filter(chat => chat.messageStatus === chatStatus);
          filteredChats.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
          });

          return {
              ...user,
              chats: filteredChats
          };
      });
}

const SideBar = ({userDetails,setUserDetails,setChatUser}) => {
  const [tab,setTab] = useState("All")
  return (
    <Command className="!h-full w-full">
      <Card className="pt-3 pb-1 space-y-2 rounded-none w-full">
        <CommandInput placeholder="Search"/>
        <Separator/>
        <div className="flex py-2 space-x-2 mx-4">
        <Badge 
          variant={tab === "All" ? "default" :"outlined"} 
          onClick={() => {
              let arr =  filterAndSortChats(userDetails,"All")
              setUserDetails(arr);
              setTab('All')
          }}
          className={"cursor-pointer"}
          >All</Badge>
          <Badge 
          variant={tab === "Read" ? "default" :"outlined"} 
          onClick={() => {
              let arr =  filterAndSortChats(userDetails,"Read")
              console.log("arr",arr)
              setUserDetails(arr);
              setTab('Read')
          }}
          className={"cursor-pointer"}
          >Read</Badge>
          <Badge 
          variant={tab === "Unread" ? "default" :"outlined"} 
          onClick={() => {
              let arr =  filterAndSortChats(userDetails,"Unread")
              setUserDetails(arr);
              setTab('Unread')
          }}
          className={"cursor-pointer"}
          >Unread</Badge>
          <Badge variant={"outlined"}>Archived</Badge>
          <Badge variant={"outlined"}>Blocked</Badge>
        </div>
      </Card>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {userDetails && userDetails?.length > 0 &&
          userDetails.map((item) => (
            <Link to={`/dashboard/${item.userId}`} key={item.userId}onClick={() => setChatUser(item)}>
            <CommandItem key={item.id} className="p-0 hover:border-l-4 border-primary rounded-none cursor-pointer" >
              <Card className="flex w-full rounded-none !border-b border-0 items-start pt-3 pl-3 pr-2.5 space-x-3 hover:bg-black/5">
                <Avatar>
                  <AvatarImage
                    src={item.profilePicture && item?.profilePicture}
                    alt="profile pic"
                  />
                  <AvatarFallback>{item?.name && item?.name?.slice(0,2)}</AvatarFallback>
                </Avatar>
                <CardContent className="flex flex-col">
                  <CardTitle className="text-sm">
                    {item.name}{" "}
                    <span className="text-black/30 text-xm">{item && item.chats && item.chats[0] && calculateTime(item.chats[0]?.createdAt)}</span>
                  </CardTitle>
                  <CardDescription className="text-[15px]">
                    <span className="text-muted-foreground">{item.name}</span>:
                    <span className="font-medium text-black/80">
                      {item && item.chats && item.chats[0] && item.chats[0].message}
                    </span>
                  </CardDescription>
                </CardContent>
              </Card>
            </CommandItem>
            </Link>
          ))
          }
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SideBar;
