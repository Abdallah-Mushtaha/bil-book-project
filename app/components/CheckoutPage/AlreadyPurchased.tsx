export const AlreadyPurchased = ({
  onNavigate,
}: {
  onNavigate: () => void;
}) => (
  <div className="p-8 border border-red-900/30 bg-red-900/5 rounded-3xl text-center backdrop-blur-sm">
    <p className="text-white text-xl font-bold mb-2">
      You already own this book!
    </p>
    <p className="text-gray-400 mb-6">
      It is already available in your personal library.
    </p>
    <button
      onClick={onNavigate}
      className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all"
    >
      Go to My Library
    </button>
  </div>
);
