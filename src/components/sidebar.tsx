import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/Provider";
import { API } from "../utils/index";

function SideBar() {
  const today = new Date().toLocaleDateString().split('/').reverse().join('-')
  const { data, setByName, setByValue, setByDate } = useContext(MainContext);
  const [filterName, setFilterName] = useState("");
  const [fromState, setFrom] = useState('1990-01-01');
  const [toState, setTo] = useState(today);

  const handleName: any = (element: any) => {
    setFilterName(element);
    const result = data.filter(({ name }: any) => name.includes(filterName));
    if (result.length) {
      setByName(result);
    }
  };

  const HandleValue: any = (e: any) => {
    const switchValues = () => {
      const response = API();
      const result = response.filter(
        ({ price }: any) => price <= e || e >= 4000
      );
      if (setByValue.length) {
        setByValue(result);
        console.log(result);
      } else {
        setByValue([]);
      }
    };
    switch (e) {
      case "blank":
        setByValue([]);
        break;
      case "2000":
        switchValues();
        break;
      case "3000":
        switchValues();
        break;
      case "4000":
        switchValues();
        break;
    }
  };

  const HandleByDate = (element: any) => {
    console.log(element.name)
    if (element.name === "from") {
      setFrom(element.value)
      return FilterByDate()
      
    } 
    if (element.name === "to") {
      setTo(element.value)
      return FilterByDate()
    }
  }

  const FilterByDate = () => {
      const from = fromState
      const to = toState
      const response = API()
      const result = response.filter(({date}) => (
        new Date(date).getTime() >= new Date(from).getTime() &&
        new Date(date).getTime() <= new Date(to).getTime()
      ))
      setByDate(result)
  
  }


  useEffect(() => {
    if (filterName === "") {
      setByName([]);
    }
  }, [setByName, filterName]);

  return (
    <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
      <div className="relative">
        <div className="absolute flex items-center ml-2 h-full">
          <svg
            className="w-4 h-4 fill-current text-primary-gray-dark"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 
              10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 
              12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 
              10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 
              11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 
              15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 
              11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 
              11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"
            />
          </svg>
        </div>
        <input
          value={filterName}
          onChange={({ target }) => handleName(target.value)}
          type="text"
          placeholder="Search by name"
          className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        />
      </div>
      <div className="relative content-center">
          <label htmlFor="from" className="text-xs italic text-gray-400">
            From
          </label>
          <input
            onChange={({ target }) => HandleByDate(target)}
            type="date"
            name="from"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 w-full
      focus:border-blue-500 block  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
          <label htmlFor="to" className="text-xs italic text-gray-400">
            To
          </label>
          <input
             onChange={({ target }) => HandleByDate(target)}
            type="date"
            name="to"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 w-full
      focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="Select date"
          />
        </div>
      <select
        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        onChange={(e) => HandleValue(e.target.value)}
      >
        <option value="blank">Any Price</option>
        <option value="2000">until 2000</option>
        <option value="3000">until 3000</option>
        <option value="4000">4000 +</option>
      </select>
    </div>
  );
}

export default SideBar;
