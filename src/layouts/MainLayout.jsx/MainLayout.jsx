import { useLocation } from "react-router-dom";

import bgImg from "../../assets/bg3.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import { BREAKPOINTS } from "../../utils/constants";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MobileTabs from "../MobileTabs/MobileTabs";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

  // List of routes where mobile tabs SHOULD be visible
  const showMobileTabsOnRoutes = ["/", "/statistics", "/media"];
  const shouldShowTabs = showMobileTabsOnRoutes.includes(pathname);

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex flex-col text-slate-200 font-sans px-1 md:px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          width: "100%",
        }}
      >
        <main className="flex-1 w-full mx-auto p-1 md:p-6">{children}</main>
      </div>

      {/* Render Footer on Desktop, or MobileTabs ONLY on allowed routes for mobile */}
      {isDesktop ? <Footer /> : shouldShowTabs && <MobileTabs />}
    </>
  );
};

export default MainLayout;
