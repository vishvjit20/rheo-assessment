import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import CenterContent from "../../components/CenterContent/CenterContent";
import { useHistory } from "react-router-dom";
import store from "../../store";
import "./rows.css";
import { getAllMovies, getMovie } from "../../redux/action/movieAction";
import { convertNumberToExcelText } from "../../components/utils/excelTextFormula";
import BookingSummary from "../BookingSummary/BookingSummary";

const Rows = (props) => {
  const [rowsColsHash, setRowsColsHash] = useState({});
  const [blocked, setBlocked] = useState({});
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { id } = props.match.params;

  const { movie, movies } = useSelector((state) => state.movies);
  const { blocked: blockedSeats, rows, cols } = movie ?? {};

  useEffect(() => {
    setBlocked({ ...movie.blockedTicket });
  }, [movie]);

  const otherMovies = useMemo(
    () => movies.filter((movie) => movie.id !== +id),
    [id, movies]
  );

  const noOfBookings = Object.keys(rowsColsHash)?.reduce(
    (prev, curr) => (rowsColsHash?.[curr] === 1 ? prev + 1 : prev),
    0
  );
  console.log("BKS ", noOfBookings);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSaveData = () => {
    const blockedTicket = {};
    Object.keys(rowsColsHash).forEach((key) => {
      if (rowsColsHash[key] && rowsColsHash[key] === 1)
        blockedTicket[key] = rowsColsHash[key];
    });
    setBlocked({ ...blocked, ...blockedTicket });
    const currentMovie = {
      ...movie,
      blockedTicket: { ...blocked, ...blockedTicket },
    };
    dispatch(getMovie(currentMovie));
    dispatch(getAllMovies([currentMovie, ...otherMovies]));
    localStorage.setItem("ticket-booking", JSON.stringify(store.getState()));
    history.push("/");
    setRowsColsHash({});
  };

  return (
    <>
      {!open ? (
        <div>
          <CenterContent className="row-heading">
            Select Seats to be <span> Blocked</span>
          </CenterContent>

          {new Array(rows).fill(0).map((_, i) => (
            <div
              className={`rows ${+cols > 20 ? "rows-start" : "rows-center"}`}
              key={i}
            >
              <div className="row-start">
                {convertNumberToExcelText(Number(i + 1))}
              </div>
              {new Array(cols).fill(0).map((_, j) => (
                <div
                  className={`rows-col ${
                    rowsColsHash[i + "#" + j]
                      ? "rows-col-active"
                      : blocked[i + "#" + j]
                      ? "rows-col-blocked"
                      : blockedSeats?.[i + "#" + j]
                      ? "rows-col-to-be-removed"
                      : ""
                  }`}
                  key={i + "#" + j}
                  onClick={() => {
                    let key = i + "#" + j;
                    if (!blockedSeats?.[key] && !blocked?.[key]) {
                      if (rowsColsHash[key]) {
                        setRowsColsHash({ ...rowsColsHash, [key]: 0 });
                      } else {
                        setRowsColsHash({ ...rowsColsHash, [key]: 1 });
                      }
                    }
                  }}
                >
                  {!blockedSeats?.[i + "#" + j] && j + 1}
                </div>
              ))}
            </div>
          ))}
          {Object.keys(rowsColsHash)?.length > 0 && (
            <CenterContent>
              <Button
                text={`Book Ticket ${movie.price * noOfBookings}`}
                handleClick={handleOpen}
              />
            </CenterContent>
          )}
        </div>
      ) : (
        <BookingSummary
          price={movie.price}
          rowsColsHash={rowsColsHash}
          handleSaveData={handleSaveData}
        />
      )}
    </>
  );
};

export default Rows;
