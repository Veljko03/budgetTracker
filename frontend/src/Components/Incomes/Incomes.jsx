import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/GlobalContext";
import Form from "../Form/Form";
import { useEffect } from "react";
import IncomeItem from "../IncomeItem/IncomeItem";

const Incomes = () => {
  const { addIncome, incomes, getIncomes } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomesStyled>
      <InnerLayout className="a">
        <h1>Incomes</h1>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              console.log(income, "this is income");
              const { _id, title, amaunt, date, category, description } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amaunt}
                  date={date}
                  description={description}
                  category={category}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .a {
    flex: 1;
  }
  .income-content {
    display: flex;
    flex-growth: 1;
    gap: 2rem;
    .incomes {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
`;

export default Incomes;
