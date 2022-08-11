import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/auth/AuthWrapper";
import AuthContent from "../components/auth/AuthContent";
import InputWithLabel from "./../components/InputWithLabel";
import AuthButton from "./../components/auth/AuthButton";
import RightAlignedLink from "./../components/RightAlignedLink";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update, updateUserAccount, updateUserBank, updateUserEmail, updateUserName, updateUserPhoneNum } from "./../redux/store.js";

const Login = () => {
  let a = useSelector((state) => state.login);
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

    // 입력이 끝나고 inputs를 비워주는 역할
    // setInputs({
    //     email: "",
    //     password: "",
    // })
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (a === true) {
    return <Navigate to="/" />;
  }

  return (
    <AuthWrapper>
      <AuthContent title="Credot에 로그인">
        <InputWithLabel label="이메일" name="email" placeholder="  이메일" onChange={handleOnChange} />
        <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password" onChange={handleOnChange} />
      </AuthContent>
      {/* <AuthButton onClick={()=>{
                            handleOnClick();
                            console.log('http://api.credot.kr/login?id=' + inputs.email
                            + '&pw=' + inputs.password
                            )
                            fetch('http://api.credot.kr/login?id=' + inputs.email
                            + '&pw=' + inputs.password
                            )
                            .then(response => {
                                if(!response){
                                    console.log('fetch error')
                                } else {
                                    dispatch(update())
                                }
                                    return response.text();
                                }
                            )
                            .then(response =>{alert(response)});
                            }}>로그인</AuthButton> */}
      <AuthButton
        onClick={async () => {
          handleOnClick();
          fetch("http://localhost:9000/login?id=" + inputs.email + "&pw=" + inputs.password, {
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
              console.log(response.pw);
              if (typeof response.name === "string") {
                dispatch(updateUserName(response.name));
                dispatch(updateUserEmail(response.id));
                dispatch(updateUserPhoneNum(response.phoneNum));
                dispatch(updateUserBank(response.bank));
                dispatch(updateUserAccount(response.account));
                // dispatch(updatePassword(response.pw))
                dispatch(update());
              }
            });
        }}
      >
        로그인
      </AuthButton>
      <RightAlignedLink to="/register">회원가입</RightAlignedLink>
    </AuthWrapper>
  );
};

export default Login;
