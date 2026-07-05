import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import bgImg from "./assets/bg3.png";
import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFound/NotFound";
import ScheduleBuilder from "./pages/ScheduleBuilder/ScheduleBuilder";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen text-slate-200 font-sans"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/schedule" element={<ScheduleBuilder />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
