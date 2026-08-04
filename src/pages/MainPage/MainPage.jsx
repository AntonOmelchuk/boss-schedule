import AllEvents from "./components/AllEvents/AllEvents";
import MainBlock from "./components/MainBlock/MainBlock";

const MainPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <MainBlock />
      <AllEvents />
    </div>
  );
};

export default MainPage;
