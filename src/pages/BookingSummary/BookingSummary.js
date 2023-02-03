import React, { useEffect, useState } from "react";
import "./bookingSummary.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import CenterContent from "../../components/CenterContent/CenterContent";
import { convertNumberToExcelText } from "../../components/utils/excelTextFormula";

const BookingSummary = ({ rowsColsHash, price, handleSaveData }) => {
  const [positions, setPositions] = useState([]);
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [counter]);

  useEffect(() => {
    let positionPts = [];
    Object.keys(rowsColsHash)?.forEach((key) => {
      if (rowsColsHash?.[key]) {
        const [row, col] = key?.split("#");
        const loc = convertNumberToExcelText(+row + 1) + (+col + 1);
        positionPts.push(loc);
      }
      positions.sort((a, b) => a - b);
      setPositions(positionPts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsColsHash]);

  return (
    <CenterContent>
      <Card>
        <CenterContent className="booking-summary-header">
          Booking Summary
        </CenterContent>
        <div className="booking-content">
          <div className="booking-space-top">
            {positions?.map((position) => (
              <div className="booking-space">{position},</div>
            ))}
          </div>
          <div>Rs.{positions.length * +price}</div>
        </div>
        <CenterContent>
          <Button
            className={`${counter === 0 ? "booking-blocked" : ""}`}
            text={`Confirm booking (${counter})`}
            handleClick={handleSaveData}
            disabled={counter === 0}
          />
        </CenterContent>
      </Card>
    </CenterContent>
  );
};

export default BookingSummary;
