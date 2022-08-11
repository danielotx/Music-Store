import { useContext, useEffect } from 'react';
import { MainContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";

function Header() {
  const { data, setByPrice, setByLatest, setRemoveFilters, cartQuantity, setCartQuantity } = useContext(MainContext);
  const navigate = useNavigate()

  const removeFilters: any = (element: any) => {
    const result = element.sort(({ id: a }: any, { id: b }: any) => a - b);
    setByLatest([]);
    setByPrice([]);
    setRemoveFilters(result);
  };

  const FilterByPrice: any = (element: any) => {
    const result = element.sort(
      ({ price: a }: any, { price: b }: any) => a - b
    );
    setByLatest([]);
    setByPrice(result);
    setRemoveFilters([]);
  };

  const FilterByLatest: any = (element: any) => {
    const result = element.sort(function (a: any, b: any): any {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });

    setByLatest(result);
    setByPrice([]);
    setRemoveFilters([]);
  };


  const HandleValue: any = (e: any) => {
    switch (e) {
      case "blank":
        removeFilters(data);
        break;
      case "latest":
        FilterByLatest(data);
        break;
      case "price":
        FilterByPrice(data);
        break;
    }
  };

  const CartButton = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("user") || "{}");
    if (cartItems.length) setCartQuantity(cartItems.length)
  })

  return (
    <div
      className="flex items-center 
                justify-between text-sm 
                tracking-widest uppercase "
    >
      <p className="text-gray-500 dark:text-gray-300">
        {`${data.length} items`}
      </p>
      <div className="flex items-center">
        <p className="text-gray-500 dark:text-gray-300">Sort</p>
        <select
          id="orderBy"
          name="orderBy"
          className="font-medium 
                    text-gray-700 bg-transparent 
                    dark:text-gray-500 focus:outline-none"
          onChange={(e) => HandleValue(e.target.value)}
        >
          <option value="blank"></option>
          <option value="latest">Latest</option>
          <option value="price">Price</option>
        </select>
        <button
          onClick={() => CartButton()}
          type="button"
          className="inline-flex relative ml-8 items-center p-3 text-sm font-medium text-center  
          text-black hover:text-gray-700
          focus:ring-4 focus:outline-none"
        >
          <svg className="flex-1 w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 
              17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 
              5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 
              16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 
              0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
          </svg>
          <div 
            className="inline-flex absolute -top-2 -right-2 
            justify-center items-center w-6 h-6 
            text-xs text-white bg-red-500 rounded-full border-2 
            border-white dark:border-gray-900">
            { cartQuantity }
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
