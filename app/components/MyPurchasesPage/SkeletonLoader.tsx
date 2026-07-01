export const SkeletonLoader = () => (
  <div className="max-w-2xl mx-auto w-full animate-pulse">
    <div className="h-14 w-64 bg-white/5 rounded-2xl mb-12"></div>
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between"
        >
          <div className="flex flex-col gap-2">
            <div className="h-6 w-48 bg-white/10 rounded-md"></div>
            <div className="h-4 w-32 bg-white/5 rounded-md"></div>
          </div>
          <div className="h-10 w-28 bg-white/10 rounded-xl"></div>
        </div>
      ))}
    </div>
  </div>
);
