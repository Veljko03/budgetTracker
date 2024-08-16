import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import ChartShow from "../Chart/Chart";
import { useGlobalContext } from "../../context/GlobalContext";
import { dollar } from "../../utils/icons";
import { useEffect } from "react";
import History from "../History/History";

const Dashboard = () => {
  const { getIncomes, getExpanse, totalExpanse, totalIncome, totalBalance } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpanse();
  }, []);
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <ChartShow />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpanse()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
            <div className="history-con">
              <History />
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div``;

export default Dashboard;
