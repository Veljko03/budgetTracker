import axios from "axios";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const BASE_URL = "http://localhost:5000/api/v1/";

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpanses] = useState([]);
  const [error, setError] = useState(null);
  //Incomes
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

  //Expanse
  //
  const addExpanse = async (expanse) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, expanse)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpanse();
  };

  const getExpanse = async () => {
    const response = await axios.get(`${BASE_URL}get-expense`).catch((err) => {
      setError(err.response.data.message);
    });
    console.log(response.data);
    setExpanses(response.data);
  };

  const deleteExpanse = async (id) => {
    console.log("deleting item");
    const response = await axios
      .delete(`${BASE_URL}delete-expense/${id}`)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpanse();
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(BASE_URL, credentials);
      return response.data;
    } catch (err) {
      console.error("Login error", err);
      throw err;
    }
  };

  const totalExpanse = () => {
    let total = 0;
    console.log(incomes);
    expenses.forEach((expanse) => {
      total += expanse.amount;
    });
    console.log(total, "total");
    return total;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpanse();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history;
  };
  const register = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-user`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration error", error);
      throw error;
    }
  };

  console.log(totalIncome(), "total income is");
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpanse,
        getExpanse,
        deleteExpanse,
        totalExpanse,
        expenses,
        totalBalance,
        transactionHistory,
        login,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
