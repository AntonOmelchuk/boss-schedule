import useTranslation from "../../hooks/useTranslation";
import SelectCP from "./SelectCP";
import SelectNickname from "./SelectNickname";

/**
 * Common Identity Form containing CP and Character Name selection steps.
 */
const UserIdentityForm = ({
  cpList,
  selectedCp,
  handleCpChange,
  loadingCps,
  playerList,
  selectedChar,
  setSelectedChar,
  isLoadingPlayers,
  isDisabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Step 1: Select CP */}
      <SelectCP
        cpList={cpList}
        selectedCp={selectedCp}
        loadingCps={loadingCps || isDisabled}
        handleCpChange={handleCpChange}
      />

      {/* Step 2: Select/Enter Character Name */}
      {selectedCp && (
        <div className="animate-fadeIn">
          {isLoadingPlayers ? (
            <div
              className="flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800
              rounded-xl text-xs text-amber-400 font-medium animate-pulse"
            >
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span>{t.onboarding?.loadingPlayers}</span>
            </div>
          ) : (
            <SelectNickname
              playerList={playerList}
              selectedChar={selectedChar}
              setSelectedChar={setSelectedChar}
              isDisabled={isDisabled}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserIdentityForm;
