import SummaryCard from "./SummaryCard";

const SummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* 1. Total Points */}
      <SummaryCard
        title="Total Alliance Points"
        subTitle={summary?.total_points || 0}
      />

      {/* 2. Average Points */}
      <SummaryCard
        title="Average CP Output"
        subTitle={`${summary?.average_points ? Math.round(summary.average_points) : 0} pts`}
      />

      {/* 3. Top predator */}
      <SummaryCard
        title="Apex Predator (Top CP)"
        subTitle={summary?.top_cp || "N/A"}
      />
    </div>
  );
};

export default SummaryCards;
