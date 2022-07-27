import React, { Component, useState } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import InputWithLabel from './../components/InputWithLabel';
import AuthButton from './../components/auth/AuthButton';
import Combobox from './../components/Combobox';
import RightAlignedLink from './../components/RightAlignedLink';
import { bankList } from "./../data/bankList";
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
                        <RightAlignedLink to="/login">로그인</RightAlignedLink>
                    </AuthContent>
                </AuthWrapper>
            );
        }
    }

    class BankInfo extends Component {
        render() {
            return (
                <AuthWrapper>
                    <AuthContent title="선정산 받으실 계좌를 입력해주세요">
                        <Combobox label="" placeholder="  은행" items={ bankList } />
                        <InputWithLabel label="" name="account" placeholder="  계좌번호"/>
                    </AuthContent>
                    <AuthButton>회원가입 완료</AuthButton>
                </AuthWrapper>
            );
        }
    }

    return flag === 0
           ? <CustomerInfo></CustomerInfo>
           : <BankInfo></BankInfo>
}

export default Register;