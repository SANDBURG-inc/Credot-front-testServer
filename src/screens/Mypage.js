import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  update,
  persistor,
  // updateJwt,
  updateUserAccount,
  updateUserBank,
  updateUserEmail,
  updateUserName,
  updateUserPhoneNum,
  updateCorporateName,
  updateCeo,
  updateBusinessLoc,
  updateCorporateNum,
} from "./../redux/store.js";
import "../assets/css/my_page.css";
import { Helmet } from "react-helmet";
import axios from "axios";

const Mypage = () => {
  const a = useSelector((state) => state.login);
  // const token = useSelector((state) => state.jwt);
  const userData = localStorage.getItem("user");
  const tmpName = useSelector((state) => state.info.name);
  const tmpEmail = useSelector((state) => state.info.email);
  const tmpPhoneNum = useSelector((state) => state.info.phoneNum);
  const tmpBank = useSelector((state) => state.info.bank);
  const tmpAccount = useSelector((state) => state.info.account);
  const dispatch = useDispatch();

  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [subNewPassword, setSubNewPassword] = useState("");

  const handleOnChange1 = (e) => {
    setCurPassword(e.target.value);
  };
  const handleOnChange2 = (e) => {
    setNewPassword(e.target.value);
  };

  const handleOnChange3 = (e) => {
    setSubNewPassword(e.target.value);
  };

  // console.log("현재 토큰: " + token.jwt);

  const logout = useCallback(() => {
    // dispatch(updateJwt({}));
    dispatch(update());
    // userInfo
    dispatch(updateUserName(""));
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

  // useEffect(() => {
  //   // Request API.
  //   axios
  //     .get("https://cms.credot.kr/posts", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       // Handle success.
  //       console.log("Data: ", res.data);
  //     })
  //     .catch((err) => {
  //       // Handle error.
  //       console.log("An error occurred:", err.response);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

  if (a === false) {
    return <Navigate to="/" />;
  }
  // console.log("토큰 만료시간 출력" + token.jwt.exp);
  return (
    <main className="container">
      <Helmet>
        <title>My Page - 크레닷</title>
        <meta name="description" content="셀러들의 초간편 선정산 서비스, 크레닷(Cre.) - 마이페이지" />
        <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
      </Helmet>
      <div className="inner">
        <section className="section-wrap my_page-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">MY PAGE</span>
            </div>
            <div className="i-body">
              <div className="m-head myinfo-head">
                <div className="m-head-box">
                  <div className="m-head-profile">
                    <img className="m-head-profile-img" src="../assets/images/subpage-my_page/profile-img.svg" alt="" />
                    <div className="m-head-profile-div">
                      <span className="m-head-name">{tmpName}님</span>
                      <span className="m-head-email font-eng">{tmpEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-info">
                <form action="">
                  <div className="m-info-box-wrap">
                    <div className="m-info-info">
                      <span className="info-ct">이메일</span>
                      <span className="info-if font-eng">{tmpEmail}</span>
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">연락처</span>
                      <span className="info-if font-eng">{tmpPhoneNum}</span>
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">계좌정보</span>
                      <span className="info-if font-eng">
                        {tmpBank} {tmpAccount}
                      </span>
                    </div>
                  </div>

                  <div className="m-info-box-wrap">
                    <div className="m-info-info">
                      <span className="info-ct">현재 비밀번호</span>
                      <input type="password" placeholder="현재 비밀번호를 입력해주세요" onChange={handleOnChange1} value={curPassword} />
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">새 비밀번호</span>
                      <input type="password" placeholder="새 비밀번호를 입력해주세요" onChange={handleOnChange2} value={newPassword} />
                    </div>
                    <div className="m-info-info">
                      <span className="info-ct">새 비밀번호 확인</span>
                      <input type="password" placeholder="새 비밀번호를 입력해주세요" onChange={handleOnChange3} value={subNewPassword} />
                    </div>
                  </div>
                </form>
                <div className="btn-wrap">
                  <button
                    className="logout-btn"
                    onClick={async () => {
                      logout();
                      alert("로그아웃 되었습니다");
                    }}
                  >
                    로그아웃
                  </button>
                  <button
                    className="change-btn"
                    onClick={() => {
                      if (curPassword === "" || newPassword === "" || subNewPassword === "") {
                        alert("빈 칸을 입력해주세요");
                        return;
                      }
                      if (newPassword !== subNewPassword) {
                        alert("새 비밀번호가 일치하지 않습니다.");
                        return;
                      }
                      // Request API.
                      axios
                        .post(
                          "https://cms.credot.kr/api/auth/change-password",
                          {
                            currentPassword: curPassword,
                            password: newPassword,
                            passwordConfirmation: newPassword,
                          },
                          {
                            headers: {
                              Authorization: "Bearer " + userData.token,
                            },
                          }
                        )
                        .then(function (res) {
                          alert("비밀번호가 변경되었습니다");
                        })
                        .catch((error) => {
                          // Handle error.
                          console.log("An error occurred:", error.response);
                          alert("비밀번호를 확인해주세요");
                        });
                      setCurPassword("");
                      setNewPassword("");
                      setSubNewPassword("");
                    }}
                  >
                    개인정보 수정 <img src="../assets/images/icon/btn-arrow.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Mypage;
