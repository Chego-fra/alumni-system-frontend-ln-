import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Image 
        src="/giphy.webp" 
        alt="Loading..." 
        width={80} 
        height={80} 
        className="mb-4" 
      />
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
 