import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HOST,
  update,
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

const Login = () => {
  const a = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const handleOnChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
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

  const login = () => {
    if (!inputs.email.includes("@")) {
      alert("이메일 형식을 올바르게 입력해주세요!");
    } else if (inputs.password === "") {
      alert("비밀번호를 입력해주세요!");
    } else {
      handleOnClick();
      fetch(HOST + "/login?email=" + inputs.email + "&pw=" + inputs.password, {
        method: "post",
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
          if (!response) {
            console.log(response);
            alert("계정이 존재하지 않거나 패스워드가 올바르지 않습니다!");
          } else {
            //userInfo
            dispatch(updateUserName(response.name));
            dispatch(updateUserEmail(response.email));
            dispatch(updateUserPhoneNum(response.phoneNum));
            dispatch(updateUserBank(response.bank));
            dispatch(updateUserAccount(response.account));
            // dispatch(updatePassword(response.pw))

            //incInfo
            dispatch(updateCorporateName(response.corporateName));
            dispatch(updateCeo(response.ceo));
            dispatch(updateBusinessLoc(response.businessLoc));
            dispatch(updateCorporateNum(response.corporateNum));

            dispatch(update());
          }
        });
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  useEffect(() => {
    console.log(users);
  }, [users]);

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
              <span className="head-title font-eng">LOGIN</span>
            </div>
            <div className="i-body">
              <div className="form-wrap">
                <div className="form">
                  <div className="inner__sec">
                    <span className="sec__head font-eng">Credot에 로그인</span>
                    <div className="input-wrap">
                      <div className="input-input input-id">
                        <span className="font-eng">EMAIL</span>
                        <input name="email" type="text" placeholder="이메일을 입력해주세요" onChange={handleOnChange} />
                      </div>
                      <div className="input-input input-pw">
                        <span className="font-eng">PW</span>
                        <div className="password-wrap">
                          <input
                            name="password"
                            className="input-password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={handleOnChange}
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
