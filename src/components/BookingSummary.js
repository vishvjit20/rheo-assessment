import React from "react";
import "./bookingSummary.css";
import Button from "./Button";
import Card from "./Card";
import CenterContent from "./CenterContent";
import NavigationBar from "./NavigationBar";

const BookingSummary = () => {
  return (
    <div>
      <NavigationBar />
      <CenterContent>
        <Card>
          <CenterContent className="booking-summary-header">
            Booking Summary
          </CenterContent>

          <CenterContent>
            <Button text="Confirm booking"></Button>
          </CenterContent>
        </Card>
      </CenterContent>
    </div>
  );
};

export default BookingSummary;
