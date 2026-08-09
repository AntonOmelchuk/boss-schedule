const ClanCrest = ({ allyCrest, crest }) => {
  return (
    <div
      className="flex items-center shrink-0 border border-slate-700/80 rounded
      bg-slate-950 p-0.5 pr-2 shadow-sm"
    >
      {allyCrest && (
        <img
          src={allyCrest}
          alt="Alliance Crest"
          className="w-4 h-4 pl-2 object-contain image-rendering-pixelated"
        />
      )}
      {crest && (
        <img
          src={crest}
          alt="Clan Crest"
          className="w-4 h-4 object-contain image-rendering-pixelated"
        />
      )}
    </div>
  );
};

export default ClanCrest;
