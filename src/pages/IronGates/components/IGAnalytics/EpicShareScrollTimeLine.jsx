import { ScrollTimeline } from "../../../../components/lightswind/scroll-timeline";
import useTranslation from "../../../../hooks/useTranslation";

const EpicShareScrollTimeLine = ({ events }) => {
  const { t } = useTranslation();

  return (
    <ScrollTimeline
      perspective
      smoothScroll
      events={events}
      title={t.epicShare}
      progressIndicator={true}
      subtitle={t.epicShareSubtitle}
      revealAnimation="slideScale"
    />
  );
};

export default EpicShareScrollTimeLine;
