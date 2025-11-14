type WordHeaderProps = {
  word: string;
  audioUrl?: string;
  isLearned?: boolean;
};

export default function WordHeader({
  word,
  audioUrl,
  isLearned,
}: WordHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center pb-3 pt-3">
      <h2
        className={`text-xl lg:text-3xl ${isLearned ? "text-green-600" : "text-black"}`}
      >
        {word}
      </h2>

      {audioUrl && (
        <audio controls className="h-6 w-1/2">
          <source src={audioUrl} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
