import VideoCard from "@/components/video_card";
import React from "react";

const dummy = [
  {
    title:"AMV",
    url:"https://youtu.be/M53gBWkk2WM?si=3X1wizw0WuOh6L02"
  },
  {
    title:"AMV",
    url:"https://youtu.be/BgARtcQvLPc?si=Oop4t1W0TbdzbFCY"
  }
]

export default function Middle() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-5 bg-black h-full">
        {
          dummy.map((item,index) => (
            <VideoCard key={index} url={item.url} title={item.title} />
          ))
        }
    </div>
  );
}
