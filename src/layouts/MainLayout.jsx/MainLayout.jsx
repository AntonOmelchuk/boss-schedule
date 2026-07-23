import bgImg from "../../assets/bg3.png";
import Header from "../Header/Header";

const MainLayout = ({ children, activeNav, setActiveNav }) => {
  return (
    <div
      className="min-h-screen text-slate-200 font-sans px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
        paddingTop: "32px",
      }}
    >
      {/* Stick Header */}
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Page content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
