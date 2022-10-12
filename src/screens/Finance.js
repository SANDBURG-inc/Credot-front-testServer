import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { HOST } from "./../redux/store.js";
import { useSelector } from "react-redux";
import "../assets/css/my_page.css";
import { Helmet } from "react-helmet";

const Finance = () => {
  var tmpFinanceList = [];
  const [length, setLength] = useState(0);
  const [financeList, setFinanceList] = useState([[], []]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [boardFlag, setBoardFlag] = useState(true);

  const userName = useSelector((state) => state.info.name);
  const userEmail = useSelector((state) => state.info.email);
  const render = (length, financeList) => {
    var push = [];

    for (var i = 0; i < length; i++) {
      push.push(renderInfo(i, financeList[i][1], financeList[i][2], financeList[i][3], financeList[i][4], financeList[i][5]));
    }
    return push;
  };
  const renderInfo = (idx, contractDate, deadline, ammount, commerce, status) => {
    return (
      <TableRow key={idx}>
        <TableCell>{idx}</TableCell>
        <TableCell>{contractDate}</TableCell>
        <TableCell>{deadline}</TableCell>
        <TableCell>{ammount}</TableCell>
        <TableCell>{commerce}</TableCell>
        <TableCell>{status}</TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetch(HOST + "/database/extractContract?email=" + userEmail, {})
      .then((response) => {
        if (!response.ok) {
          console.log("fetch error");
        }
        return response.json();
      })
      .then((userFin) => {
        setLength(userFin.length);
        var price = 0;
        for (let i = 0; i < userFin.length; i++) {
          tmpFinanceList.push([i + 1, userFin[i].contractDate, userFin[i].deadline, userFin[i].ammount, userFin[i].commerce, userFin[i].status]);
          price += Number(userFin[i].ammount);
        }
        setTotalPrice(price);
        setFinanceList([...tmpFinanceList]);
      });
  }, []);

  const AddComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  return (
    <main className="container">
      <Helmet>
        <title>정산현황 - 크레닷</title>
      </Helmet>
      <div className="inner">
        <section className="section-wrap my_page-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">정산현황</span>
            </div>
            <div className="i-body">
              <div className="m-head">
                <div className="m-head-box">
                  <div className="m-head-profile">
                    <img className="m-head-profile-img" src="../assets/images/subpage-my_page/profile-img.svg" alt="" />
                    <div className="m-head-profile-div">
                      <span className="m-head-name">{userName}</span>
                      <span className="m-head-email font-eng">{userEmail}</span>
                    </div>
                  </div>
                  <div className="value-wrap">
                    <span className="value-wrap-span1">즉시 정산된 총 금액</span>
                    <div className="value">
                      <strong className="strong font-eng">{AddComma(totalPrice)}</strong>
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
                      <TableBody>{render(length, financeList)}</TableBody>
                    </Table>
                  </Paper>
                </div>
              </div>
              <div className="m-board">
                <span className="m-board-sub">문의 게시판</span>
                <div className="m-board-category">
                  <button
                    className={"m-board-category-btn " + (boardFlag ? "active" : "")}
                    onClick={() => {
                      setBoardFlag(true);
                    }}
                  >
                    답변완료
                  </button>
                  <button
                    className={"m-board-category-btn " + (boardFlag ? "" : "active")}
                    onClick={() => {
                      setBoardFlag(false);
                    }}
                  >
                    미답변
                  </button>
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
