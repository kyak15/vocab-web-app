import BookStorage from "../../molecules/BookStorage";

export default async function HomeOrganism() {
  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-[#394549]">
      <div className="bg-gray-800 flex-1 border-2 border-black rounded-lg m-6 py-4">
        <BookStorage />
      </div>

      <div className="bg-gray-800 flex-1 border-2 border-black rounded-lg m-6 py-4">
        hi
      </div>
    </div>
  );
}

// nice shade of dark blue 104152
