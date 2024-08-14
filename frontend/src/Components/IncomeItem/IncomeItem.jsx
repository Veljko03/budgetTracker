import styled from "styled-components";

const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) => {
  return (
    <IncomeItemStyled>
      <div className="icon"></div>
      <div className="content">
        <h5>{title}</h5>
      </div>
    </IncomeItemStyled>
  );
};

const IncomeItemStyled = styled.div``;

export default IncomeItem;
