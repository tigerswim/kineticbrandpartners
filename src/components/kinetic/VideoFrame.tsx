type Props = {
  src: string; poster: string; label: string; ratio?: string; className?: string;
};

export default function VideoFrame({ src, poster, label, ratio = "16/9", className }: Props) {
  return (
    <div className={["media-item", className].filter(Boolean).join(" ")}>
      <div className="cap">{label}</div>
      <div className="vframe" style={{ aspectRatio: ratio }}>
        <video controls preload="none" poster={poster} playsInline>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="vplay" aria-hidden="true" />
      </div>
    </div>
  );
}
