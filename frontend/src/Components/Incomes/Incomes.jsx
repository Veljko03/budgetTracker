import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/GlobalContext";
import Form from "../Form/Form";
import { useEffect } from "react";

const Incomes = () => {
  const { addIncome, incomes, getIncomes } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const [_id, title, amaunt, date, category, description] = income;
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};

const IncomesStyled = styled.div``;

export default Incomes;
