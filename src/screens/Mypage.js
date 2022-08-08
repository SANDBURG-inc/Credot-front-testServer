import React, { Component, useState, useCallback, useEffect } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthButton from './../components/auth/AuthButton';

const Mypage = () => {
    const [flag, setFlag] = useState(0);

    return flag === 0
    ? 
      <AuthWrapper>
          <Form.Group>
              <Form.Label>성함</Form.Label>
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder="권민성" disabled />
              <Form.Label>이메일</Form.Label>
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder="test@gmail.com" disabled />
              <Form.Label>연락처</Form.Label>
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder="010-1234-5678" disabled />
              <Form.Label style={{margin: "10px 0px 10px 0px"}}>계좌정보</Form.Label>
              <Form.Control style={{margin: "10px 0px 10px 0px"}} placeholder="신한은행" disabled />
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder="3432491823099" disabled />
              <Form.Label>비밀번호</Form.Label>
              <Form.Control style={{margin: "10px 0px 25px 0px"}} placeholder="현재 비밀번호" />
              <Form.Control style={{margin: "10px 0px 10px 0px"}} placeholder="새 비밀번호" />
              <Form.Control style={{margin: "10px 0px 10px 0px"}} placeholder="새 비밀번호 확인" />
              <AuthButton onClick={()=>{}}>비밀번호 수정</AuthButton>
          </Form.Group>
      </AuthWrapper>
    : 
        <div></div>
}

export default Mypage;