type WordHeaderProps = {
  word: string;
  audioUrl?: string;
};

export default function WordHeader({ word, audioUrl }: WordHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center px-2 pb-3 pt-3">
      <h2 className="text-xl lg:text-3xl">{word}</h2>

      {audioUrl && (
        <audio controls className="h-6 w-1/2">
          <source src={audioUrl} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
