// import React, { useRef, useEffect, useState } from "react";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableBody from "@material-ui/core/TableBody";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import { HOST } from "./../redux/store.js";
// import { useDispatch, useSelector } from "react-redux";
// import "../assets/css/my_page.css";

// const arrList = ({ userFin }) => {
//   return (
//     <div>
//       {userFin.map((item) => {
//         <TableCell>{item}</TableCell>;
//       })}
//     </div>
//   );
// };

// const Finance = () => {
//   const [financeList, setFinanceList] = useState([{}, {}, {}, {}]);
//   const [length, setLength] = useState(0);
//   // const [data, setData] = useState([]);
//   // const [userContractDate, setUserContractDate] = useState("init");
//   // const [userDeadline, setUserDeadline] = useState("init");
//   // const [userAmmount, setUserAmmount] = useState("init");
//   // const [userCommerce, setUserCommerce] = useState("init");
//   // const [userStatus, setUserStatus] = useState("init");

//   const tmpEmail = useSelector((state) => state.info.email);
//   // const response = await fetch(HOST + "/database/extractContract?email=" + tmpEmail);
//   // const result = await response.json();
//   // console.log(result);

//   const renderInfo = (idx, contractDate, deadline, ammount, commerce, status) => {
//     return (
//       <TableRow>
//         <TableCell>{contractDate}</TableCell>
//         <TableCell>{deadline}</TableCell>
//         <TableCell>{ammount}</TableCell>
//         <TableCell>{commerce}</TableCell>
//         <TableCell>{status}</TableCell>
//       </TableRow>
//     );
//   };
//   // function fetchData() {
//   //   fetch(HOST + "/database/extractContract?email=" + tmpEmail, {})
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         console.log("fetch error");
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((userFin) => {
//   //       console.log("--------------------------------------");
//   //       console.log("유저 정산현황 객체 길이: " + userFin.length);
//   //       setLength(userFin.length);
//   //       // var copy = [...userFin];
//   //       setFinanceList("userFin[0]");
//   //       // console.log(userFin);
//   //       // console.log(userFin);
//   //       // console.log(typeof userFin);
//   //       // console.log(userFin);
//   //       // console.log(userFin[0]);
//   //       // console.log(userFin[1]);
//   //       // for (let i = 0; i < userFin.length; i++) {
//   //       //   // financeList.push(userFin[i]);
//   //       //   // setFinanceList(userFin[i]);
//   //       //   console.log("정산리스트: ");
//   //       //   console.log(userFin[i]);
//   //       //   setFinanceList(userFin);
//   //       //   console.log("최종2");
//   //       //   console.log(financeList);
//   //       // }
//   //       // console.log("최종");
//   //       // console.log(financeList);
//   //     });
//   // }

//   useEffect(() => {
//     async function fetchData() {
//       await fetch(HOST + "/database/extractContract?email=" + tmpEmail, {})
//         .then((response) => {
//           if (!response.ok) {
//             console.log("fetch error");
//           }
//           return response.json();
//         })
//         .then((userFin) => {
//           console.log("--------------------------------------");
//           console.log("유저 정산현황 객체 길이: " + userFin.length);
//           setLength(userFin.length);
//           console.log(userFin);
//           console.log(typeof userFin);
//           setFinanceList([...userFin]);
//           console.log(financeList);
//           // console.log(userFin);
//           // console.log(userFin[0]);
//           // console.log(userFin[1]);
//           // for (let i = 0; i < userFin.length; i++) {
//           //   // financeList.push(userFin[i]);
//           //   // setFinanceList(userFin[i]);
//           //   console.log("정산리스트: ");
//           //   console.log(userFin[i]);
//           //   setFinanceList(userFin);
//           //   console.log("최종2");
//           //   console.log(financeList);
//           // }
//           // console.log("최종");
//           // console.log(financeList);
//         });
//     }
//     fetchData();
//   }, [tmpEmail]);
//   // useEffect(() => {
//   //   console.log("계약일: " + userContractDate);
//   // }, [userContractDate]);
//   // useEffect(() => {
//   //   console.log("납부마감일: " + userDeadline);
//   // }, [userDeadline]);
//   // useEffect(() => {
//   //   console.log("금액: " + userAmmount);
//   // }, [userAmmount]);
//   // useEffect(() => {
//   //   console.log("커머스: " + userCommerce);
//   // }, [userCommerce]);
//   // useEffect(() => {
//   //   console.log("납부여부: " + userStatus);
//   // }, [userStatus]);
//   // fetchData();
//   console.log("asdfasdf");
//   // setFinanceList(fetchData());
//   // console.log(financeList);
//   // console.log(userFin);
//   //       console.log(typeof userFin);
//   // console.log(financeList);
//   // financeList = fetchData();
//   // console.log(financeList);

//   return (
//     <main className="container">
//       <div className="inner">
//         <section className="section-wrap my_page-wrap">
//           <div className="inner">
//             <div className="i-head">
//               <span className="head-title font-eng">정산현황</span>
//             </div>
//             <div className="i-body">
//               <div className="m-head">
//                 <div className="m-head-box">
//                   <div className="m-head-profile">
//                     <img className="m-head-profile-img" src="../assets/images/subpage-my_page/profile-img.svg" alt="" />
//                     <div className="m-head-profile-div">
//                       <span className="m-head-name">별별 셀러님</span>
//                       <span className="m-head-email font-eng">credot123@test.com</span>
//                     </div>
//                   </div>
//                   <div className="value-wrap">
//                     <span className="value-wrap-span1">즉시 정산된 총 금액</span>
//                     <div className="value">
//                       <strong className="strong font-eng">10,000,000</strong>
//                       <mark className="mark">원</mark>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="m-stats">
//                 <span className="m-stats-sub">정산금 통계</span>
//                 <div className="m-stats-stat">
//                   <Paper>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>계약일</TableCell>
//                           <TableCell>납부마감일</TableCell>
//                           <TableCell>금액</TableCell>
//                           <TableCell>커머스</TableCell>
//                           <TableCell>납부여부</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>{}</TableBody>
//                       {/* {financeList.map((week, index) => (
//                         <span key={index}>
//                           {week}
//                           {" / "}
//                         </span>
//                       ))} */}
//                       {financeList[0].ammount}
//                       {financeList[1].ammount}
//                       {financeList[2].ammount}
//                       {financeList[3].ammount}
//                     </Table>
//                   </Paper>
//                 </div>
//               </div>
//               <div className="m-board">
//                 <span className="m-board-sub">문의 게시판</span>
//                 <div className="m-board-category">
//                   <button className="m-board-category-btn active">답변완료</button>
//                   <button className="m-board-category-btn">미답변</button>
//                 </div>
//                 <div className="m-board-table-wrap">
//                   <table className="m-board-table-wrap-table">
//                     <thead className="m-board-table-wrap-table-thead">
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td" style={{ width: "6%" }}>
//                           순번
//                         </td>
//                         <td className="m-board-table-wrap-table-td" style={{ width: "79%" }}>
//                           목록
//                         </td>
//                         <td className="m-board-table-wrap-table-td" style={{ width: "15" }}>
//                           거래시각(날짜)
//                         </td>
//                       </tr>
//                     </thead>
//                     <tbody className="m-board-table-wrap-table-tbody">
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td font-eng">1</td>
//                         <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
//                         <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
//                       </tr>
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td font-eng">2</td>
//                         <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
//                         <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
//                       </tr>
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td font-eng">3</td>
//                         <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
//                         <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
//                       </tr>
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td font-eng">4</td>
//                         <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
//                         <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
//                       </tr>
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td font-eng">5</td>
//                         <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
//                         <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
//                       </tr>
//                       <tr className="m-board-table-wrap-table-tr">
//                         <td className="m-board-table-wrap-table-td font-eng">6</td>
//                         <td className="m-board-table-wrap-table-td">정산금이 지급이 완료되었다고 하는데 아직 입금이 되지 않았습니다.</td>
//                         <td className="m-board-table-wrap-table-td font-eng">2021.10.10 15:00</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <div className="pagination-wrap">
//                     <div className="pagination">
//                       <button className="pagination-btn pagination-btn-l">
//                         <img className="pagination-btn-arrow" src="../assets/images/subpage-my_page/pagination-l.svg" alt="" />
//                       </button>
//                       <button className="pagination-btn font-eng active">1</button>
//                       <button className="pagination-btn font-eng">2</button>
//                       <button className="pagination-btn font-eng">3</button>
//                       <button className="pagination-btn font-eng">4</button>
//                       <button className="pagination-btn font-eng">5</button>
//                       <button className="pagination-btn font-eng">6</button>
//                       <button className="pagination-btn pagination-btn-r">
//                         <img className="pagination-btn-arrow" src="../assets/images/subpage-my_page/pagination-r.svg" alt="" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Finance;

import React, { useRef, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { HOST } from "./../redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/my_page.css";

const Finance = () => {
  var tmpFinanceList = [];
  const [length, setLength] = useState(0);
  const [financeList, setFinanceList] = useState([[], []]);
  // const [data, setData] = useState([]);
  const [userContractDate, setUserContractDate] = useState("init");
  const [userDeadline, setUserDeadline] = useState("init");
  const [userAmmount, setUserAmmount] = useState("init");
  const [userCommerce, setUserCommerce] = useState("init");
  const [userStatus, setUserStatus] = useState("init");

  const tmpEmail = useSelector((state) => state.info.email);
  // const response = await fetch(HOST + "/database/extractContract?email=" + tmpEmail);
  // const result = await response.json();
  // console.log(result);

  const render = (length, financeList) => {
    var push = [];

    for (var i = 0; i < length; i++) {
      push.push(renderInfo(i, financeList[i][1], financeList[i][2], financeList[i][3], financeList[i][4], financeList[i][5]));
    }
    return push;
  };
  const renderInfo = (idx, contractDate, deadline, ammount, commerce, status) => {
    return (
      <TableRow>
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
    fetch(HOST + "/database/extractContract?email=" + tmpEmail, {})
      .then((response) => {
        if (!response.ok) {
          console.log("fetch error");
        }
        return response.json();
      })
      .then((userFin) => {
        console.log("--------------------------------------");
        console.log("유저 정산현황 객체 길이: " + userFin.length);
        setLength(userFin.length);
        console.log(length);
        for (let i = 0; i < userFin.length; i++) {
          // setUserContractDate(userFin[i].contractDate);
          // setUserDeadline(userFin[i].deadline);
          // setUserAmmount(userFin[i].ammount);
          // setUserCommerce(userFin[i].commerce);
          // setUserStatus(userFin[i].status);
          tmpFinanceList.push([i + 1, userFin[i].contractDate, userFin[i].deadline, userFin[i].ammount, userFin[i].commerce, userFin[i].status]);
          console.log(financeList);
          console.log(financeList[0]);
        }
        setFinanceList([...tmpFinanceList]);

        // setUserContractDate(userFin[userFin.length - 1].contractDate);
        // setUserDeadline(userFin[userFin.length - 1].deadline);
        // setUserAmmount(userFin[userFin.length - 1].ammount);
        // setUserCommerce(userFin[userFin.length - 1].commerce);
        // setUserStatus(userFin[userFin.length - 1].status);
      });
  }, []);
  useEffect(() => {
    console.log("계약일: " + userContractDate);
  }, [userContractDate]);
  useEffect(() => {
    console.log("납부마감일: " + userDeadline);
  }, [userDeadline]);
  useEffect(() => {
    console.log("금액: " + userAmmount);
  }, [userAmmount]);
  useEffect(() => {
    console.log("커머스: " + userCommerce);
  }, [userCommerce]);
  useEffect(() => {
    console.log("납부여부: " + userStatus);
  }, [userStatus]);

  return (
    <main className="container">
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
                        {/* <TableCell>1</TableCell>
                        <TableCell>{userContractDate}</TableCell>
                        <TableCell>{userDeadline}</TableCell>
                        <TableCell>{userAmmount}</TableCell>
                        <TableCell>{userCommerce}</TableCell>
                        <TableCell>{userStatus}</TableCell> */}
                        {/* {renderInfo(financeList[0][0], financeList[0][1], financeList[0][2], financeList[0][3], financeList[0][4], financeList[0][5])} */}
                        {render(length, financeList)}
                        {/* {renderInfo(length, userContractDate, userDeadline, userAmmount, userCommerce, userStatus)} */}
                        {/* {renderInfo(length - 1, userContractDate, userDeadline, userAmmount, userCommerce, userStatus)}
                        {renderInfo(length - 2, userContractDate, userDeadline, userAmmount, userCommerce, userStatus)}
                        {renderInfo(length - 3, userContractDate, userDeadline, userAmmount, userCommerce, userStatus)} */}
                        {/* {renderList()} */}
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
