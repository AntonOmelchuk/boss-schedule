import bgImg from "../../assets/bg3.png";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen text-slate-200 font-sans px-1 md:px-4"
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
      <Header />
      <main className="flex-1 w-full mx-auto p-1 md:p-6">{children}</main>
    </div>
  );
};

export default MainLayout;
