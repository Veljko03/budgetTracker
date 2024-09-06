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
    <DashboardStyled totalBalance={totalBalance()}>
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

const DashboardStyled = styled.div`
  .stats-con {
    display: flex; /* Prikazujemo sadržaj u jednom redu */
    gap: 2rem; /* Razmak između kolona */
    justify-content: space-between; /* Razmak između elemenata */
    align-items: center; /* Poravnavanje elemenata po vertikali */
  }

  .chart-con {
    flex: 2; /* Fleksibilni deo za grafikon */
    display: flex;
    flex-direction: column; /* Kolonski prikaz */
    gap: 1.5rem;
  }

  .amount-con {
    display: flex; /* Prikazujemo sadržaj u jednom redu */
    gap: 2rem; /* Razmak između kolona */
    justify-content: space-around; /* Razmak između elemenata */
    align-items: center; /* Poravnavanje elemenata po vertikali */
  }

  .income,
  .expense,
  .balance {
    text-align: center;
    flex: 1; /* Svaka kolona zauzima jednaku širinu */
    padding: 1rem;
    border-radius: 8px;
    background-color: #f7f7f7; /* Svetla pozadina */
  }

  .income p {
    color: green; /* Income je zelene boje */
    font-weight: bold;
  }

  .expense p {
    color: red; /* Expense je crvene boje */
    font-weight: bold;
  }

  .balance p {
    font-weight: bold;
    color: ${({ theme, totalBalance }) =>
      totalBalance >= 0
        ? "green"
        : "red"}; /* Zelena ako je pozitivan balans, crvena ako je negativan */
  }

  .history-con {
    margin-top: 2rem;
  }
`;

export default Dashboard;
