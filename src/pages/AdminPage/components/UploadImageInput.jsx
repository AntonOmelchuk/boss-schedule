import useTranslation from "../../../hooks/useTranslation";

const UploadImageInput = ({ image, handleImageChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="file-upload"
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400
          text-xs font-semibold rounded-xl cursor-pointer transition flex items-center gap-2"
      >
        <span>📂</span>
        <span>{t.respawnAdmin.selectFileBtn}</span>
      </label>

      <span className="text-xs text-slate-400">
        {image ? t.respawnAdmin.fileSelected : t.respawnAdmin.fileNotSelected}
      </span>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default UploadImageInput;
