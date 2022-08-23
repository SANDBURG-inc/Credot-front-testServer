import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/auth/AuthWrapper";
import Form from "react-bootstrap/Form";
import AuthButton from "./../components/auth/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { update, HOST } from "./../redux/store.js";

const Mypage = () => {
  const a = useSelector((state) => state.login);

  const tmpName = useSelector((state) => state.info.name);
  const tmpEmail = useSelector((state) => state.info.email);
  const tmpPhoneNum = useSelector((state) => state.info.phoneNum);
  const tmpBank = useSelector((state) => state.info.bank);
  const tmpAccount = useSelector((state) => state.info.account);
  const dispatch = useDispatch();

  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleOnChange1 = (e) => {
    setCurPassword(e.target.value);
  };
  const handleOnChange2 = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    console.log("현재 비밀번호: " + curPassword);
  }, [curPassword]);

  useEffect(() => {
    console.log("새 비밀번호: " + newPassword);
  }, [newPassword]);

  if (a === false) {
    console.log("로그인 안됌");
    return <Navigate to="/" />;
  }
  return (
    <AuthWrapper>
      <Form.Group>
        <Form.Label>성함</Form.Label>
        <Form.Control style={{ margin: "10px 0px 50px 0px" }} placeholder={tmpName} disabled />
        <Form.Label>이메일</Form.Label>
        <Form.Control style={{ margin: "10px 0px 50px 0px" }} placeholder={tmpEmail} disabled />
        <Form.Label>연락처</Form.Label>
        <Form.Control style={{ margin: "10px 0px 50px 0px" }} placeholder={tmpPhoneNum} disabled />
        <Form.Label style={{ margin: "10px 0px 10px 0px" }}>계좌정보</Form.Label>
        <Form.Control style={{ margin: "10px 0px 10px 0px" }} placeholder={tmpBank} disabled />
        <Form.Control style={{ margin: "10px 0px 50px 0px" }} placeholder={tmpAccount} disabled />
        <Form.Label>비밀번호</Form.Label>
        <Form.Control style={{ margin: "10px 0px 25px 0px" }} placeholder="현재 비밀번호" onChange={handleOnChange1} />
        <Form.Control style={{ margin: "10px 0px 10px 0px" }} placeholder="새 비밀번호" onChange={handleOnChange2} />
        <Form.Control style={{ margin: "10px 0px 10px 0px" }} placeholder="새 비밀번호 확인" />
        <AuthButton
          onClick={() => {
            console.log(tmpEmail);
            console.log(curPassword);
            console.log(newPassword);
            fetch(HOST + `/database/changepw?currentid=${tmpEmail}&currentpw=${curPassword}&futurepw=${newPassword}`)
              .then((response) => response.text())
              .then((response) => {
                alert(response);
              });
          }}
        >
          비밀번호 수정
        </AuthButton>
        <AuthButton
          onClick={async () => {
            await fetch(HOST + "/logout");
            dispatch(update());
            localStorage.clear();
            alert("로그아웃 되었습니다");
          }}
        >
          로그아웃
        </AuthButton>
      </Form.Group>
    </AuthWrapper>
  );
};

export default Mypage;
