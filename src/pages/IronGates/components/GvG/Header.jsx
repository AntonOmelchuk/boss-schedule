import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../../components/UI/Button";
import GlowLine from "../../../../components/UI/GlowLine";
import Input from "../../../../components/UI/Input";
import { ROLES } from "../../../../constants/roles";
import useTranslation from "../../../../hooks/useTranslation";
import useAuthStore from "../../../../store/useAuthStore";
import useGvGStore from "../../../../store/useGvGStore";

const Header = () => {
  const { user } = useAuthStore();

  const { t } = useTranslation();
  const { gvgPage } = t;

  const {
    resetPlanner,
    savePlanner,
    createNewSetup,
    loadSetup,
    savedSetups,
    currentSetupName,
  } = useGvGStore();

  const [newSetupName, setNewSetupName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    if (!newSetupName.trim()) {
      toast.error("Please enter a setup name!");
      return;
    }
    createNewSetup(newSetupName);
    setNewSetupName("");
    setIsCreating(false);
    toast.success(`Created new setup: ${newSetupName}`);
  };

  const handleReset = () => {
    resetPlanner();
    toast.error("Setup reset to default roster and links cleared!");
  };

  const handleSave = async () => {
    try {
      await savePlanner();
      toast.success(`Setup "${currentSetupName}" saved successfully!`);
    } catch {
      toast.error("Failed to save GvG setup.");
    }
  };

  const isAllowedToEdit =
    user?.role === ROLES.ADMIN || user?.role === ROLES.CO_ADMIN;

  return (
    <>
      <header className="h-16 mt-16 bg-slate-950/80 px-6 flex items-center justify-end z-10 gap-4">
        <div className="mr-auto">
          <h1 className="text-lg font-bold text-amber-400 tracking-wider uppercase">
            {gvgPage.title} -{" "}
            <span className="text-white underline">{currentSetupName}</span>
          </h1>
          <p className="text-xs text-slate-400">{gvgPage.subtitle}</p>
        </div>

        {/* Setups Dropdown */}
        <div className="flex gap-2">
          <select
            value={currentSetupName}
            onChange={(e) => {
              loadSetup(e.target.value);
              toast.success(`Loaded setup: ${e.target.value}`);
            }}
            className="bg-black/60 border border-slate-700 rounded-lg px-3 py-1.5 text-xl text-amber-300 font-semibold
              focus:outline-none cursor-pointer"
          >
            {Object.keys(savedSetups).length === 0 ? (
              <option value={currentSetupName}>{currentSetupName}</option>
            ) : (
              Object.values(savedSetups).map((setup) => (
                <option key={setup.name} value={setup.name}>
                  {setup.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Create a new setup */}
        {isAllowedToEdit && (
          <>
            <div className="flex items-center gap-2">
              {isCreating ? (
                <div className="flex items-center gap-1">
                  <Input
                    value={newSetupName}
                    onChange={(e) => setNewSetupName(e.target.value)}
                    placeholder={gvgPage.setupNamePlaceholder}
                  />
                  <Button
                    onClick={handleCreateNew}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2 py-1"
                  >
                    OK
                  </Button>
                  <Button
                    onClick={() => setIsCreating(false)}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-2 py-1"
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-500/40 text-indigo-300 text-xs"
                >
                  + {gvgPage.newButton}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleReset}
                className="bg-slate-800/60 hover:bg-slate-700/80 border-slate-700 text-slate-300 text-xs"
              >
                {gvgPage.resetButton}
              </Button>

              <Button
                onClick={handleSave}
                className="bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300 text-xs"
              >
                {gvgPage.saveButton}
              </Button>
            </div>
          </>
        )}
      </header>
      <div className="relative w-full mt-8">
        <GlowLine orientation="horizontal" position="0%" color="fire" />
      </div>
    </>
  );
};

export default Header;
