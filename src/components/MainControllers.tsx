import { useEffect, useState } from "react";
import { fmtMSS } from "../utils/formatDuration";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdPause,
  MdPlayArrow,
  MdRepeat,
} from "../icons"

interface IProps {
  previewUrl: string;
}

export default function MainControllers({ previewUrl }: IProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    let audio: HTMLAudioElement;
    if (!audio) {
      audio = new Audio(previewUrl);
    }

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = audio.currentTime;
      setCurrentTime(currTime);
      setSlider(
        currTime ? parseInt(((currTime * 100) / audio.duration).toFixed(1)) : 0
      );
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    setAudio(audio);

    return () => {
      audio.pause();
      setAudio(null);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useEffect(() => {
    if (audio) {
      play();
    }
  }, [audio]);

  const play = () => {
    setIsPlaying(true);
    audio.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audio?.pause();
  };

  useEffect(() => {
    if (audio) {
      audio.currentTime = Math.round((drag * audio.duration) / 100);
    }
  }, [drag]);

  useEffect(() => {
    if (audio !== null) {
      audio.src = previewUrl;
      play();
    }
  }, [previewUrl, audio]);

  return (
    <div className="flex flex-col items-center justify-center col-span-7 gap-3">
      <div className="flex items-center gap-5">
        <span className="text-lg text-gray">
          <MdShuffle />
        </span>
        <span className="text-lg text-gray">
          <MdSkipPrevious />
        </span>
        <button
          className="flex items-center justify-center focus:outline-none"
          onClick={togglePlay}
        >
          <span className="flex items-center justify-center w-8 h-8 text-lg text-black bg-white rounded-full">
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </span>
        </button>
        <span className="text-lg text-gray">
          <MdSkipNext />
        </span>
        <span className="text-lg text-gray ">
          <MdRepeat />
        </span>
      </div>

      <div className="flex items-center justify-center w-full gap-5">
        <span className="text-xs text-gray">
          {!currentTime ? "0:00" : fmtMSS(currentTime)}
        </span>
        <input
          type="range"
          className="w-1/3"
          value={slider}
          onChange={(e) => {
            setSlider(parseInt(e.target.value));
            setDrag(parseInt(e.target.value));
          }}
        />
        <span className="text-xs text-gray">
          {!duration ? "0:00" : fmtMSS(duration)}
        </span>
      </div>
    </div>
  );
}
