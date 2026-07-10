import AllEvents from "../../components/AllEvents/AllEvents";
import Header from "../../components/Header/Header";
import MainBlock from "../../components/MainBlock/MainBlock";

const MainPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Header />
      <MainBlock />
      <AllEvents />
    </div>
  );
};

export default MainPage;
