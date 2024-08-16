import styled from "styled-components";
import { calendar, comment, dollar, trash } from "../../utils/icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";

var colorPoint = "blue";

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
  color,
}) => {
  let colorPoint = color === "red" ? "red" : "green";
  console.log("vlolor point", type);
  return (
    <IncomeItemStyled>
      <div
        style={{
          borderRadius: "20px",
          alignItems: "center",
          background: colorPoint,
          width: "20px",
          height: "20px",
          display: "flex",
          justifyContent: "center",
          border: "2px solid #ffffff",
        }}
      ></div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calendar} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"gray"}
              color={"black"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
};

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 20px;
    height: 20px;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
