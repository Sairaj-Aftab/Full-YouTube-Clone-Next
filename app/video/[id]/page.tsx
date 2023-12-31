import RightSide from "@/app/components/Watching/RightSide";
import LeftSide from "@/app/components/Watching/LeftSide";

type Props = {};

function Video({}: Props) {
  return (
    <div className="mt-16 pb-20">
      <div className="md:flex gap-5">
        <div className="md:w-2/3 flex flex-col gap-3">
          <LeftSide />
        </div>
        {/* Suggested Section like Left Side */}
        <div className="px-2 sm:px-0 md:w-1/3">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default Video;
