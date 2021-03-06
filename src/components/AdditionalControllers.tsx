import {
  MdMicExternalOn,
  MdQueueMusic,
  MdVolumeUp,
} from "../icons"

export default function AdditionalControllers() {
  return (
    <div className="flex items-center col-span-2 gap-3">
      {/* Icons */}
      <span className="text-lg text-gray">
        <MdMicExternalOn />
      </span>
      <span className="text-lg text-gray">
        <MdQueueMusic />
      </span>
      <span className="text-lg text-gray">
        <MdVolumeUp />
      </span>

      {/* Volume bar */}
      <div className="w-20 mt-3">
        <div className="relative w-full pt-1 ">
          <div className="flex h-1 mb-4  overflow-hidden text-xs bg-[#535353] rounded">
            <div className="flex flex-col justify-center w-1/3 text-center text-white shadow-none bg-gray whitespace-nowrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
