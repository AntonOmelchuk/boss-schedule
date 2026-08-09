const TierItem = ({ tier, text, className }) => {
  return (
    <li>
      <strong className={className}>{tier}-TIER:</strong> {text}
    </li>
  );
};

export default TierItem;
