import { createContext, useState } from "react";

type Product = {
  id: number;
  name: string;
  color: string;
  price: number;
  date: string;
  thumb: string
}

type MainContextData = {
  data: Array<Product>
  setData: any;
  byPrice: Array<Product>;
  setByPrice: any;
  byLatest: Array<Product>;
  setByLatest: any;
  removeFilters: Array<Product>;
  setRemoveFilters: any;
  byName: Array<Product>;
  setByName: any;
  byValue: Array<Product>;
  setByValue: any;
  byDate: Array<Product>;
  setByDate: any;
  cartQuantity: number;
  setCartQuantity: any;
  newCartItems: Array<Product>;
  setCartItems: any;
};

type MainContextProvider2 = {
  children: React.ReactNode;
};



export const MainContext = createContext({} as MainContextData);

export const MainContextProvider = ({ children }: MainContextProvider2) => {
  const [data, setData] = useState([]);
  const [byPrice, setByPrice] = useState([])
  const [byLatest, setByLatest] = useState([])
  const [removeFilters, setRemoveFilters] = useState([])
  const [byName, setByName] = useState([])
  const [byValue, setByValue] = useState([])
  const [byDate, setByDate] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0)
  const [newCartItems, setCartItems] = useState([]);

  const contextValue = {
    data,
    setData,
    byPrice,
    setByPrice,
    byLatest,
    setByLatest,
    removeFilters,
    setRemoveFilters,
    byName,
    setByName,
    byValue,
    setByValue,
    byDate,
    setByDate,
    cartQuantity,
    setCartQuantity,
    newCartItems,
    setCartItems,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {" "}
      {children}{" "}
    </MainContext.Provider>
  );
};
