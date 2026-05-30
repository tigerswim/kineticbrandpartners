"use client";

import { useRef, useState } from "react";

type Props = {
  src: string; poster: string; label: string; ratio?: string; className?: string;
};

export default function VideoFrame({ src, poster, label, ratio = "16/9", className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setStarted(true);
  };

  return (
    <div className={["media-item", className].filter(Boolean).join(" ")}>
      <div className="cap">{label}</div>
      <div className="vframe" style={{ aspectRatio: ratio }}>
        <video
          ref={videoRef}
          controls
          preload="none"
          poster={poster}
          playsInline
          onPlay={() => setStarted(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!started && (
          <button
            type="button"
            className="vplay"
            aria-label={`Play video: ${label}`}
            onClick={play}
          />
        )}
      </div>
    </div>
  );
}
