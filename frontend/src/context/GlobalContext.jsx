import axios from "axios";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const BASE_URL = "http://localhost:5000/api/v1/";

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expances, setExpances] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`).catch((err) => {
      setError(err.response.data.message);
    });
    console.log(response.data);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    console.log("deleting item");
    const response = await axios
      .delete(`${BASE_URL}delete-income/${id}`)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const totalIncome = () => {
    let total = 0;
    console.log(incomes);
    incomes.forEach((income) => {
      total += income.amount;
    });
    console.log(total, "total");
    return total;
  };

  console.log(totalIncome(), "total income is");
  return (
    <GlobalContext.Provider
      value={{ addIncome, getIncomes, incomes, deleteIncome, totalIncome }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
