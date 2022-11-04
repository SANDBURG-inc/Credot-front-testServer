import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  update,
  updateJwt,
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
import "../assets/css/login.css";
import { Helmet } from "react-helmet";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const a = useSelector((state) => state.login);
  const token = useSelector((state) => state.jwt);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnClick = () => {
    const { email, password } = inputs;

    // users 배열에 추가할 user 객체
    const user = { email, password };

    // spread 연산을 통해서 기존의 값을 복사하고, users State에 추가
    setUsers([...users, user]);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const login = () => {
    if (!inputs.email.includes("@")) {
      alert("이메일 형식을 올바르게 입력해주세요!");
    } else if (inputs.password === "") {
      alert("비밀번호를 입력해주세요!");
    } else {
      handleOnClick();
      axios
        .post("https://cms.credot.kr/api/auth/local", {
          identifier: inputs.email,
          password: inputs.password,
        })
        .then((res) => {
          // Handle success.
          console.log("Well done!");
          console.log(res);
          console.log("================================================");
          console.log(res.data);
          console.log("User profile", res.data.user);
          console.log("User token", res.data.jwt);

          window.localStorage.setItem("jwt", res.data.jwt);
          window.localStorage.setItem("userData", JSON.stringify(res.data.user));
          dispatch(updateJwt(res.data.jwt));
          console.log("토큰값 변경 확인: " + token);

          // userInfo
          dispatch(updateUserName(res.data.user.username));
          dispatch(updateUserEmail(res.data.user.email));
          dispatch(updateUserPhoneNum(res.data.user.phoneNum));
          dispatch(updateUserBank(res.data.user.bank));
          dispatch(updateUserAccount(res.data.user.account));
          // dispatch(updatePassword(res.data.user.password));

          //incInfo
          dispatch(updateCorporateName(res.data.user.corporateName));
          dispatch(updateCeo(res.data.user.ceo));
          dispatch(updateBusinessLoc(res.data.user.businessLoc));
          dispatch(updateCorporateNum(res.data.user.corporateNum));

          alert("환영합니다!");
          dispatch(update());
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
          alert("계정이 존재하지 않거나 패스워드가 올바르지 않습니다!");
        });
    }
  };

  useEffect(() => {
    console.log("토큰값 변경됨 " + token);
  }, [token]);

  useEffect(() => {
    // 패스워드 인풋 눈 클릭시 비밀번호 보였다 안 보였다 스크립트
    let eyes = document.querySelectorAll(".eye");

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

  if (a === true) {
    return <Navigate to="/" />;
  }

  return (
    <main className="container">
      <Helmet>
        <title>로그인 - 크레닷</title>
      </Helmet>
      <div className="inner">
        <section className="section-wrap introduce-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">로그인</span>
            </div>
            <div className="i-body">
              <div className="form-wrap">
                <div className="form">
                  <div className="inner__sec">
                    <span className="sec__head font-eng">Credot에 로그인</span>
                    <div className="input-wrap">
                      <div className="input-input input-id">
                        <span className="font-eng">
                          <img src={require("../assets/images/logo/email_logo.png")} />
                        </span>
                        <input className="input-email" name="email" type="text" placeholder="이메일을 입력해주세요" onChange={handleOnChange} />
                      </div>
                      <div className="input-input input-pw">
                        <span className="font-eng">
                          <img src={require("../assets/images/logo/pw_logo.png")} />
                        </span>
                        <div className="password-wrap">
                          <input
                            name="password"
                            className="input-password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={handleOnChange}
                            onKeyPress={onKeyPress}
                          />
                          <div className="eye"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- login-btn 버튼에 active 클래스 추가시 로그인 버튼 활성화 --> */}
                  <button
                    className="login-btn"
                    type="button"
                    onClick={async () => {
                      login();
                    }}
                  >
                    로그인
                  </button>
                  <Link to="/register">
                    <button className="join-btn" type="button">
                      회원가입
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
