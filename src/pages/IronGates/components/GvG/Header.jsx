import toast from "react-hot-toast";

import Button from "../../../../components/UI/Button";
import GlowLine from "../../../../components/UI/GlowLine";
import useTranslation from "../../../../hooks/useTranslation";
import useGvGStore from "../../../../store/useGvGStore";

const Header = () => {
  const { t } = useTranslation();
  const { gvgPage } = t;

  const { addEnemyTarget, resetPlanner } = useGvGStore();

  const handleReset = () => {
    resetPlanner();
    toast.error("Planner reset to default!");
  };

  return (
    <>
      <header className="h-16 bg-slate-950/80 px-6 flex items-center justify-between z-10">
        <div>
          <h1 className="text-lg font-bold text-amber-400 tracking-wider uppercase">
            {gvgPage.title}
          </h1>
          <p className="text-xs text-slate-400">{gvgPage.subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleReset}
            className="bg-slate-800/60 hover:bg-slate-700/80 border-slate-700 text-slate-300"
          >
            Reset
          </Button>
          <Button
            onClick={addEnemyTarget}
            className="bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-red-300"
          >
            {gvgPage.addEnemy}
          </Button>

          <Button
            onClick={() => toast.success("Saved!")}
            className="bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300"
          >
            {gvgPage.saveButton}
          </Button>
        </div>
      </header>
      <div className="relative w-full mt-8">
        <GlowLine orientation="horizontal" position="0%" color="fire" />
      </div>
    </>
  );
};

export default Header;
