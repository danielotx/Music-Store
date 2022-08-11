import { useContext, useEffect } from "react";
import { MainContext } from "../context/Provider";
import SideBar from "../components/sidebar";
import Header from "../components/header";
import Cards from "../components/cards";
import { API } from "../utils/index";

function Main() {
  const {
    data,
    setData,
    byPrice,
    byLatest,
    removeFilters,
    byName,
    byValue,
    byDate,
  } = useContext(MainContext);

  useEffect(() => {
    if (!data.length) {
      return setData(API());
    }
    if (byPrice.length) {
      setData(byPrice);
    } else {
      setData(API());
    }
    if (byLatest.length) {
      setData(byLatest);
    }
    if (removeFilters.length) {
      setData(removeFilters);
    }
    if (byName.length) {
      setData(byName);
    } else {
      setData(API());
    }
    if (byValue.length) {
      setData(byValue);
    }
    if (byDate.length) {
      setData(byDate)
    }
  }, [data, setData, byPrice, byLatest, removeFilters, byName, byValue, byDate]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="lg:flex lg:-mx-2">
          <SideBar />
          <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
            <Header />
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
