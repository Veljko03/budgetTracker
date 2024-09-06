import axios from "axios";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const BASE_URL = "http://localhost:5000/api/v1/";

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpanses] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const getToken = (newToken) => {
    setToken(`Bearer ${newToken}`);
  };

  console.log("ovo je token ", token);

  //Incomes
  const addIncome = async (income) => {
    const config = {
      headers: { Authorization: token },
    };
    console.log("this is token ", token);
    console.log("this is config ", config);

    const response = await axios
      .post(`${BASE_URL}add-income`, income, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios
      .get(`${BASE_URL}get-incomes`, config) // Prosledi config kao drugi parametar
      .catch((err) => {
        setError(err.response.data.message);
      });
    if (response.data) {
      setIncomes(response.data);
    } else {
      setIncomes(0);
    }
  };

  const deleteIncome = async (id) => {
    const response = await axios
      .delete(`${BASE_URL}delete-income/${id}`)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const totalIncome = () => {
    let total = 0;
    incomes.forEach((income) => {
      total += income.amount;
    });
    return total;
  };

  //Expanse
  //
  const addExpanse = async (expanse) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios
      .post(`${BASE_URL}add-expense`, expanse, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpanse();
  };

  const getExpanse = async () => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios
      .get(`${BASE_URL}get-expense`, config) // Prosledi config kao drugi parametar
      .catch((err) => {
        setError(err.response.data.message);
      });
    if (response.data) {
      setExpanses(response.data);
    } else {
      setExpanses(0);
    }
  };

  const deleteExpanse = async (id) => {
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
    expenses.forEach((expanse) => {
      total += expanse.amount;
    });
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
        getToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
