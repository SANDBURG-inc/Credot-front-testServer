import React, { Component, useState } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import InputWithLabel from './../components/InputWithLabel';
import AuthButton from './../components/auth/AuthButton';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { useCombobox } from "downshift";

function Register() {
    let [flag, setFlag] = useState(0);
    class CustomerInfo extends Component {
        render() {
            return (
                <AuthWrapper>
                    <AuthContent title="회원가입">
                        <InputWithLabel label="이름" name="name" placeholder="  이름"/>
                        <InputWithLabel label="이메일" name="email" placeholder="  이메일"/>
                        <InputWithLabel label="연락처" name="phoneNum" placeholder="  연락처"/>
                        <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password"/>
                        <InputWithLabel label="" name="passwordConfirm" placeholder="  비밀번호 확인" type="password"/>
                        <AuthButton onClick={setFlag}>다음</AuthButton>
                    </AuthContent>
                </AuthWrapper>
            );
        }
    }

    return flag === 0
           ? <CustomerInfo></CustomerInfo>
           : <div></div>
}

export default Register;