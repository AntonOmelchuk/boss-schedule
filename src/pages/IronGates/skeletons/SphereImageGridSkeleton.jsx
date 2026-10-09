/* eslint-disable max-len */
const SphereImageGridSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center p-4 animate-pulse">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)] rounded-full blur-xl" />

      <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center relative">
        <div className="absolute w-20 h-20 rounded-full bg-slate-900 border border-slate-800 top-6 left-1/2 -translate-x-1/2" />
        <div className="absolute w-20 h-20 rounded-full bg-slate-900 border border-slate-800 bottom-6 left-1/2 -translate-x-1/2" />
        <div className="absolute w-20 h-20 rounded-full bg-slate-900 border border-slate-800 left-6 top-1/2 -translate-y-1/2" />
        <div className="absolute w-20 h-20 rounded-full bg-slate-900 border border-slate-800 right-6 top-1/2 -translate-y-1/2" />
        <div className="w-32 h-32 rounded-full bg-slate-900/80 border border-slate-800" />
      </div>
    </div>
  );
};

export default SphereImageGridSkeleton;
