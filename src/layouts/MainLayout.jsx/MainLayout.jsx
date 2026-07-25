import bgImg from "../../assets/bg3.png";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
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
      <Header />
      <main className="flex-1 w-full mx-auto p-1 md:p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
