import { useEffect, useContext } from "react";
import { MainContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()

  const { newCartItems, setCartItems } = useContext(MainContext);

  const SumItems = () => {
    let result = 0;
    newCartItems.forEach(({ price }) => (result += price));
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(result);
  };
  SumItems();

  const RemoveItem = (element: any) => {
    newCartItems.splice(element, 1);
    setCartItems([])
    return localStorage.setItem("user", JSON.stringify(newCartItems));
  };

  const HomeButton = () => {
    navigate('/')
  }

  const CheckoutButton = () => {
    navigate('/redirect')
  }

  useEffect(() => {
    
    if (!newCartItems.length) {
      const cartItems = JSON.parse(localStorage.getItem("user") || "{}");
      setCartItems(cartItems);
    }
  }, [setCartItems, newCartItems]);

  return (
    <>
      <div>
        <div>
          <div className="flex md:flex-row flex-col justify-end" id="cart">
            <div
              className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
              id="scroll"
            >
              <div
                className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <p 
                  onClick={() => HomeButton()}
                  className="text-sm pl-2 leading-none"
                >
                  Back
                </p>
              </div>
              <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                Cart
              </p>
              {newCartItems.map((e: any, index: number) => (
                <div className="md:flex items-center mt-14 py-8 border-t border-gray-200" key={ index }>
                  <div className="w-1/4">
                    <img
                      key={e.thumb}
                      src={e.thumb}
                      alt={e.thumb}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="w-1/4" key={ index }></div>
                  <div className="md:pl-3 md:w-3/4">
                    <div className="flex items-center justify-between w-full pt-1">
                      <p
                        className="text-base font-black leading-none text-gray-800"
                        key={e.name}
                      >
                        {e.name}
                      </p>
                    </div>
                    <p
                      className="text-xs leading-3 text-gray-600 py-4"
                      key={e.color}
                    >
                      {e.color}
                    </p>
                    <p
                      className="w-96 text-xs leading-3 text-gray-600"
                      key={e.date}
                    >
                      {e.date}
                    </p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                      <div className="flex itemms-center">
                        <p
                          key={index}
                          className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                          onClick={(index) => RemoveItem(index)}
                        >
                          Remove
                        </p>
                      </div>
                      <p
                        className="text-base font-black leading-none text-gray-800"
                        key={e.price}
                      >
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(e.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
            <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
              <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">
                    Summary
                  </p>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      {SumItems()}
                    </p>
                  </div>
                  <button
                    onClick={() => CheckoutButton()}
                    className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default Cart;
