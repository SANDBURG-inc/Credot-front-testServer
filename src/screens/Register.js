import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HOST } from "../redux/store";
import "../assets/css/register.css";
import { Helmet } from "react-helmet";

const Register = () => {
  const [redirectionFlag, setRedirectionFlag] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    bank: "",
    account: "",
  });
  const [incData, setIncData] = useState({
    corporateName: "",
    ceo: "",
    businessLoc: "",
    corporateNum: "",
  });

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPw, setCheckPw] = useState("");
  const [pwEqual, setPwEqual] = useState(false);

  const optionValue = [
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "기업은행",
    "대구은행",
    "부산은행",
    "경남은행",
    "광주은행",
    "전북은행",
    "제주은행",
    "농협은행",
    "산업은행",
    "수협은행",
    "한국씨티",
    "SC제일은행",
    "HSBC",
    "도이치뱅크",
    "BOA",
    "JP모간",
    "중국공상",
    "BNP파리바",
    "우체국",
    "케이뱅크",
    "카카오뱅크",
    "산림조합",
    "신협",
    "중국",
    "중국건설",
    "토스뱅크",
  ];

  useEffect(() => {
    // 패스워드 인풋 눈 클릭시 비밀번호 보였다 안 보였다 스크립트
    let eyes = document.querySelectorAll(".r-eyes");

    for (let i = 0; i < eyes.length; i++) {
      eyes[i].addEventListener("click", function () {
        if (this.previousElementSibling.type === "text") {
          this.classList.remove("visible");
          this.previousElementSibling.type = "password";
        } else {
          this.classList.add("visible");
          this.previousElementSibling.type = "text";
        }
      });
    }
  }, []);

  useEffect(() => {
    if (userData.password === checkPw && checkPw !== "") {
      setPwEqual(true);
    } else {
      setPwEqual(false);
    }
  }, [checkPw, userData.password]);

  const handleOnChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChange2 = (e) => {
    setIncData({
      ...incData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeCheckPw = (e) => {
    setCheckPw(e.target.value);
  };

  const handleRegister = () => {
    if (!checkEmail) {
      alert("이메일 중복확인을 해주세요!");
      return;
    }

    if (userData.password === "" || checkPw === "") {
      alert("비밀번호를 확인해주세요!");
      return;
    } else if (userData.password === checkPw) {
      for (const value in userData) {
        if (userData[value] === "") {
          alert("빈 칸을 모두 입력해주세요");
          return;
        }
      }
      for (const value in incData) {
        if (incData[value] === "") {
          alert("빈 칸을 모두 입력해주세요");
          return;
        }
      }

      fetch(
        HOST +
          "/database/register?email=" +
          userData.email +
          "&name=" +
          userData.name +
          "&pw=" +
          userData.password +
          "&phoneNum=" +
          userData.phoneNum +
          "&bank=" +
          userData.bank +
          "&account=" +
          userData.account +
          "&corporateName=" +
          incData.corporateName +
          "&ceo=" +
          incData.ceo +
          "&businessLoc=" +
          incData.businessLoc +
          "&corporateNum=" +
          incData.corporateNum
      )
        .then((response) => response.text())
        .then((response) => {
          if (!response) {
            console.log("fetch error");
          } else if (response) {
            setRedirectionFlag(true);
            alert(userData.name + "님 환영합니다. \n 로그인 후 서비스를 이용해주세요.");
          }
        });
      // 입력이 끝나고 inputs를 비워주는 역할
      setUserData({
        name: "",
        email: "",
        phoneNum: "",
        password: "",
        bank: "",
        account: "",
      });
    } else {
      alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다!");
    }
  };

  if (redirectionFlag === true) {
    return <Navigate to="/" />;
  }
  return (
    <main className="container">
      <Helmet>
        <title>회원가입 - 크레닷</title>
      </Helmet>
      <div className="inner">
        <section className="section-wrap register-introduce-wrap">
          <div className="inner">
            <div className="register-i-head">
              <span className="register-head-title">회원가입</span>
            </div>
            <div className="register-i-body">
              <div className="register-form-wrap">
                <form>
                  <div className="register-inner__sec">
                    <span className="register-sec__head">회원 정보</span>
                    <div className="register-input-wrap">
                      <input className="register-input-email" type="text" placeholder="이름을 입력해주세요" name="name" onChange={handleOnChange} />
                      <div className="register-email-input-wrap">
                        <input
                          className="register-input-email"
                          type="text"
                          placeholder="이메일을 입력해주세요"
                          name="email"
                          onChange={handleOnChange}
                        />
                        {/* check-btn 버튼에 active 클래스 추가시 중복확인 버튼 활성화 */}
                        <button
                          className="register-check-btn active"
                          type="button"
                          onClick={() => {
                            if (!userData.email.includes("@")) {
                              alert("이메일 형식을 올바르게 입력해주세요!");
                            } else {
                              fetch(HOST + "/database/checkEmail?email=" + userData.email)
                                .then((response) => response.json())
                                .then((response) => {
                                  if (response) {
                                    alert("중복되는 이메일이 있습니다.");
                                  } else {
                                    setCheckEmail(true);
                                    alert("사용가능한 이메일입니다.");
                                  }
                                });
                            }
                          }}
                        >
                          중복확인
                        </button>
                      </div>
                    </div>
                    <input className="register-input-sol" type="text" placeholder="연락처를 입력해주세요" name="phoneNum" onChange={handleOnChange} />
                    <div className="register-input-wrap">
                      <div className="register-password-wrap">
                        <input
                          type="password"
                          className="input-password"
                          placeholder="비밀번호를 입력해주세요"
                          name="password"
                          onChange={handleOnChange}
                        />
                        <div className="r-eyes"></div>
                      </div>
                      <div className={pwEqual ? "register-password-wrap password__check-input" : "register-password-wrap"}>
                        <input type="password" placeholder="비밀번호를 확인해주세요" name="password" onChange={handleOnChangeCheckPw} />
                      </div>
                    </div>
                  </div>
                  <div className="register-inner__sec ">
                    <span className="register-sec__head">사업자 정보</span>
                    <div className="register-input-wrap">
                      <input
                        className="register-input"
                        type="text"
                        placeholder="법인명을 입력해주세요"
                        name="corporateName"
                        onChange={handleOnChange2}
                      />
                      <input className="register-input" type="text" placeholder="대표명을 입력해주세요" name="ceo" onChange={handleOnChange2} />
                    </div>
                    <input
                      className="register-input-sol"
                      type="text"
                      placeholder="사업장 소재지를 입력해주세요."
                      name="businessLoc"
                      onChange={handleOnChange2}
                    />
                    <input
                      className="register-input-sol"
                      type="text"
                      placeholder="사업자 등록번호를 입력해주세요."
                      name="corporateNum"
                      onChange={handleOnChange2}
                    />
                  </div>
                  <div className="inner__sec last-sec">
                    <span className="sec__head">정산받을 계좌</span>
                    <select className="register-input-sol" defaultValue="default" name="bank" onChange={handleOnChange}>
                      <option value="default" disabled>
                        정산받을 계좌의 은행을 선택해주세요
                      </option>
                      {(optionValue || []).map((options, idx) => (
                        <option key={idx} value={options}>
                          {options}
                        </option>
                      ))}
                    </select>
                    <input
                      className="register-input-sol"
                      type="text"
                      placeholder="정산받을 계좌번호를 입력해주세요."
                      name="account"
                      onChange={handleOnChange}
                    />
                  </div>
                  {/* login-btn 버튼에 active 클래스 추가시 로그인 버튼 활성화 */}
                  <button
                    className="login-btn"
                    type="button"
                    onClick={() => {
                      handleRegister();
                    }}
                  >
                    회원 가입하기
                  </button>
                </form>
              </div>
              <button className="register-back-btn">
                <Link to="/">메인화면으로 돌아가기</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
