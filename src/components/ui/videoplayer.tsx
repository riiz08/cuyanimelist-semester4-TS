"use client";

import { useState } from "react";
import Youtube from "react-youtube";
import { Button } from "./button";
import { useToast } from "./use-toast";

type YoutubeId = {
  youtubeId: string;
};

const VideoPlayer = ({ youtubeId }: YoutubeId) => {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const option = {
    width: "300",
    height: "250",
  };

  const Player = () => {
    return (
      <div className="fixed bottom-2 right-2 z-50">
        <Button
          onClick={handleVideoPlayer}
          className="float-right mb-1"
          variant={"outline"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Youtube
          videoId={youtubeId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
          onError={() =>
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
          }
        />
      </div>
    );
  };

  const ButtonOpenPlayer = () => {
    return (
      <Button
        onClick={handleVideoPlayer}
        variant={"default"}
        className="fixed bottom-5 right-5"
      >
        Tonton Trailer
      </Button>
    );
  };

  return isOpen ? <Player /> : <ButtonOpenPlayer />;
};

export default VideoPlayer;
