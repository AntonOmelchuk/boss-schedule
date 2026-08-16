const TimeInput = ({ label, value, onChange, required = true }) => {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-300">
        {label}
      </label>
      <input
        type="time"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100
          focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
      />
    </div>
  );
};

export default TimeInput;
