type PartOfSpeechPillProps = {
  pos: string;
};

export default function PartOfSpeechPill({ pos }: PartOfSpeechPillProps) {
  let pillColor;

  switch (pos) {
    case "noun":
      pillColor = "bg-[#0C3D37]";
      break;
    case "verb":
      pillColor = "bg-[#485140]";
      break;
    case "adjective":
      pillColor = "bg-[#5A3024]";
      break;
    case "adverb":
      pillColor = "bg-[#C27A5A]";
      break;
    default:
      pillColor = "bg-[#6B7280]";
  }
  return (
    <div
      className={`rounded-lg px-3 py-1 text-white text-center my-2 ${pillColor}`}
    >
      {pos}
    </div>
  );
}
