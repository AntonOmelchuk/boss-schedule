import { useEffect, useState } from "react";

import Error from "../../../components/Error/Error";
import useWindowSize from "../../../hooks/useWindowSize";
import useIGMembers from "../../../store/useIGMembers";
import MemberCard from "../components/Members/MemberCard";
import SphereImageGrid from "../components/SphereImageGrid";
import MemberCardSkeleton from "../skeletons/MemberCardSkeleton";
import SphereImageGridSkeleton from "../skeletons/SphereImageGridSkeleton";

const MemberModule = () => {
  const { loading, error, members, fetchMembers } = useIGMembers();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const [selectedName, setSelectedName] = useState("toBe");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [, height] = useWindowSize();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-slate-950">
        <Error onClickHandler={fetchMembers} />
      </div>
    );
  }

  const member =
    members?.find(
      (m) => m.name?.toLowerCase() === selectedName.toLowerCase(),
    ) || members?.[0];

  const {
    img,
    name,
    main_class,
    play_class,
    role,
    sub_classes,
    epic,
    pvp,
    in_clan,
    balance,
    all_points,
  } = member || {};

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[calc(100vh-135px)] w-full flex flex-col lg:flex-row items-center justify-center
        p-8 lg:p-12 gap-10 overflow-hidden relative bg-slate-950 select-none"
    >
      <div className="relative z-20 flex-1 w-full flex items-center justify-center">
        <div className="h-full flex items-center justify-center p-4">
          {loading || !members?.length ? (
            <SphereImageGridSkeleton />
          ) : (
            <SphereImageGrid
              images={members.map((m) => ({
                ...m,
                title: m.name,
                description: m.main_class,
              }))}
              containerSize={height / 2.2}
              sphereRadius={height / 3.6}
              baseImageScale={0.21}
              onImageClick={(item) => setSelectedName(item.name)}
            />
          )}
        </div>
      </div>

      {loading || !members?.length ? (
        <MemberCardSkeleton />
      ) : (
        <MemberCard
          x={mousePos.x}
          y={mousePos.y}
          image={img}
          name={name}
          role={role}
          mainClass={main_class}
          playClass={play_class}
          subClasses={sub_classes}
          epic={epic}
          pvp={pvp}
          balance={balance}
          allPoints={all_points}
          inClan={in_clan}
        />
      )}
    </div>
  );
};

export default MemberModule;
