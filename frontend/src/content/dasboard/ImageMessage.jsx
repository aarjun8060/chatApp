// import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/lib/CalculateTime";

function ImageMessage({ message ,currentChatUser}) {
  return (
    <div
      className={`p-1 rounded-lg  ${message.senderId === currentChatUser.id ? "bg-primary text-white " : "bg-black/5 text-black/70"}`}
    >
      <div className="relative">
        <img
          src={`${message?.message}`}
          className="rounded-lg z-1"
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
  );
}

export default ImageMessage;
