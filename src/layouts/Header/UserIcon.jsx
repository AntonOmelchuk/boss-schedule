const UserIcon = ({ setIsSettingsOpen, user }) => {
  return (
    <button
      onClick={setIsSettingsOpen}
      className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800
        px-3 py-1.5 rounded-xl transition cursor-pointer"
    >
      <img
        src={
          user?.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png"
        }
        alt="Avatar"
        className="w-6 h-6 rounded-full border border-amber-500/40"
      />
      <div className="flex flex-col text-left leading-none">
        <span className="text-sm font-bold text-white">
          {user?.char_name || user?.username}
        </span>
      </div>
    </button>
  );
};

export default UserIcon;
