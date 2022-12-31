import React, { useEffect, useState, useCallback } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ApexCharts from "apexcharts";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/my_page.css";
import "../assets/css/chart.css";
import { financeList } from "../data/financeList.js";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import {
  update,
  persistor,
  // updateJwt,
  updateUserAccount,
  updateUserBank,
  updateUserEmail,
  updateUserRealName,
  updateUserNickName,
  updateUserPhoneNum,
  updateCorporateName,
  updateCeo,
  updateBusinessLoc,
  updateCorporateNum,
} from "./../redux/store.js";

const Finance = () => {
  const userData = localStorage.getItem("user");

  const [totalPrice, setTotalPrice] = useState("0");
  const [boardFlag, setBoardFlag] = useState(true);

  const userNickName = useSelector((state) => state.info.nickName);
  const userEmail = useSelector((state) => state.info.email);

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JSON.parse(userData).token,
    },
  };

  // 토큰 만료 판별
  const jwtToken = JSON.parse(localStorage.getItem("user")).token; // "Bearer " 제거
  const isExpired = (jwtToken) => {
    try {
      const expiration = jwtDecode(jwtToken).exp;
      const now = new Date(Date.now() - 1000 * 60);
      return now > expiration * 1000;
    } catch {
      return true;
    }
  };

  const dispatch = useDispatch();
  const logout = useCallback(() => {
    // dispatch(updateJwt({}));
    dispatch(update());
    // userInfo
    dispatch(updateUserRealName(""));
    dispatch(updateUserNickName(""));
    dispatch(updateUserEmail(""));
    dispatch(updateUserPhoneNum(""));
    dispatch(updateUserBank(""));
    dispatch(updateUserAccount(""));
    // dispatch(updatePassword(res.data.user.password));

    //incInfo
    dispatch(updateCorporateName(""));
    dispatch(updateCeo(""));
    dispatch(updateBusinessLoc(""));
    dispatch(updateCorporateNum(""));
    localStorage.removeItem("user");
    localStorage.clear();
    persistor.purge();
  }, []);

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

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch("https://cms.credot.kr/api/contracts?filters[email][$eq]=" + userEmail, options)
      .then((res) => res.json())
      .catch((error) => {
        // Handle error.
        console.log(error.response);
      });
    console.log("현재 데이터: " + res.data);
    setData(res.data);
    // for (var i = 0; i < res.data.length; i++) {
    //   console.log(res.data[i].attributes);
    // }
    return;
  };

  // useEffect(() => {
  //   console.log("현재 데이터 출력합니다.");
  //   console.log(data);
  // }, [data]);

  const render = (data) => {
    var push = [];

    for (var i = 0; i < data.length; i++) {
      push.push(
        renderInfo(
          data[i].attributes.no,
          data[i].attributes.contractDate,
          data[i].attributes.deadline,
          data[i].attributes.ammount,
          data[i].attributes.commerce,
          data[i].attributes.status
        )
      );
    }
    return push;
  };

  useEffect(() => {
    getData();
  }, []);

  const AddComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  const chartOptions = {
    chart: {
      type: "bar",
      width: "100%",
    },
    series: [
      {
        name: "sales",
        data: financeList,
      },
    ],
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
        return val;
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },
    colors: [
      function ({ value, seriesIndex, w }) {
        if (value < 400) {
          return "#7E36AF";
        } else {
          return "#D9534F";
        }
      },
    ],
    xaxis: {
      categories: [7, 8, 9, 10, 11, 12],
    },
    yaxis: {
      title: {
        text: "₩ (만원)",
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

  chart.render();

  if (isExpired(jwtToken)) {
    alert("로그인 토큰이 만료되었습니다. 다시 로그인 해주세요.");
    logout();
    return <Navigate to="/Login" />;
  } else {
    return (
      <main className="container">
        <Helmet>
          <title>정산현황 - 크레닷</title>
          <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
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
                        <span className="m-head-name">{userNickName}</span>
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
                  <span className="m-stats-sub">매출 현황</span>
                  <div id="chart"></div>
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
                        <TableBody>{render(data)}</TableBody>
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
  }
};

export default Finance;
