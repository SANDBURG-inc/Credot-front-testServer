import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { HOST, updateFinanceHistory } from "./../redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/my_page.css";

const Finance = () => {
  const dispatch = useDispatch();
  const tmpEmail = useSelector((state) => state.info.email);
  fetch(HOST + "/database/extractContract?email=" + tmpEmail, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    credentials: "include",
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        console.log("fetch error");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      dispatch(updateFinanceHistory(response));
    });

  const financeHistory = useSelector((state) => state.financeHistory);
  var historyLength = financeHistory.length;

  const HistoryTable = () => {
    for (let i = 0; i < historyLength; i++) {
      <TableRow>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{financeHistory[i].contractDate}</TableCell>
        <TableCell>{financeHistory[i].deadline}</TableCell>
        <TableCell>{financeHistory[i].ammount}</TableCell>
        <TableCell>{financeHistory[i].commerce}</TableCell>
        <TableCell>{financeHistory[i].status}</TableCell>
      </TableRow>;
    }
  };

  return (
    <main className="container">
      <div className="inner">
        <section className="section-wrap my_page-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">MY PAGE</span>
            </div>
            <div className="i-body">
              <div className="m-head">
                <div className="m-head-box">
                  <div className="m-head-profile">
                    <img className="m-head-profile-img" src="../assets/images/subpage-my_page/profile-img.svg" alt="" />
                    <div className="m-head-profile-div">
                      <span className="m-head-name">별별 셀러님</span>
                      <span className="m-head-email font-eng">credot123@test.com</span>
                    </div>
                  </div>
                  <div className="value-wrap">
                    <span className="value-wrap-span1">즉시 정산된 총 금액</span>
                    <div className="value">
                      <strong className="strong font-eng">10,000,000</strong>
                      <mark className="mark">원</mark>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-stats">
                <span className="m-stats-sub">정산금 통계</span>
                <div className="m-stats-stat">
                  <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>번호</TableCell>
                          <TableCell>계약일</TableCell>
                          <TableCell>납부마감일</TableCell>
                          <TableCell>금액</TableCell>
                          <TableCell>커머스</TableCell>
                          <TableCell>납부여부</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <HistoryTable />
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </div>
              <div className="m-board">
                <span className="m-board-sub">문의 게시판</span>
                <div className="m-board-category">
                  <button className="m-board-category-btn active">답변완료</button>
                  <button className="m-board-category-btn">미답변</button>
                </div>
                <div className="m-board-table-wrap">
                  <table className="m-board-table-wrap-table">
                    <thead className="m-board-table-wrap-table-thead">
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td" style={{ width: "6%" }}>
                          순번
                        </td>
                        <td className="m-board-table-wrap-table-td" style={{ width: "79%" }}>
                          목록
                        </td>
                        <td className="m-board-table-wrap-table-td" style={{ width: "15" }}>
                          거래시각(날짜)
                        </td>
                      </tr>
                    </thead>
                    <tbody className="m-board-table-wrap-table-tbody">
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td font-eng">1</td>
                        <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
                        <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
                      </tr>
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td font-eng">2</td>
                        <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
                        <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
                      </tr>
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td font-eng">3</td>
                        <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
                        <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
                      </tr>
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td font-eng">4</td>
                        <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
                        <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
                      </tr>
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td font-eng">5</td>
                        <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
                        <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
                      </tr>
                      <tr className="m-board-table-wrap-table-tr">
                        <td className="m-board-table-wrap-table-td font-eng">6</td>
                        <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
                        <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="pagination-wrap">
                    <div className="pagination">
                      <button className="pagination-btn pagination-btn-l">
                        <img className="pagination-btn-arrow" src="../assets/images/subpage-my_page/pagination-l.svg" alt="" />
                      </button>
                      <button className="pagination-btn font-eng active">1</button>
                      <button className="pagination-btn font-eng">2</button>
                      <button className="pagination-btn font-eng">3</button>
                      <button className="pagination-btn font-eng">4</button>
                      <button className="pagination-btn font-eng">5</button>
                      <button className="pagination-btn font-eng">6</button>
                      <button className="pagination-btn pagination-btn-r">
                        <img className="pagination-btn-arrow" src="../assets/images/subpage-my_page/pagination-r.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Finance;
