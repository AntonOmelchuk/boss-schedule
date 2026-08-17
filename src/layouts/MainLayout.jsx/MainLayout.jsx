import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import bgImg from "../../assets/bg3.png";
import { BREAKPOINTS } from "../../constants/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MobileTabs from "../MobileTabs/MobileTabs";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

  // List of routes where mobile tabs SHOULD be visible
  const showMobileTabsOnRoutes = [
    "/",
    "/statistics",
    "/media",
    "/alliance/proof",
  ];
  const shouldShowTabs = showMobileTabsOnRoutes.includes(pathname);

  return (
    <div
      className="min-h-screen flex flex-col text-slate-200 font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        width: "100%",
      }}
    >
      {/* 1. Header inside min-h-screen container */}
      <Header />

      {/* 2. Main content takes all available free space */}
      <Toaster />
      <main className="flex-1 w-full mx-auto p-2.5 md:p-8">{children}</main>

      {/* 3. Footer automatically snaps to the bottom if space allows */}
      {isDesktop ? <Footer /> : shouldShowTabs && <MobileTabs />}
    </div>
  );
};

export default MainLayout;
