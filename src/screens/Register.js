import React, { Component } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import InputWithLabel from './../components/InputWithLabel';
import AuthButton from './../components/auth/AuthButton';


class Register extends Component {
    render() {
        return (
            <AuthWrapper>
                <AuthContent title="회원가입">
                    <InputWithLabel label="이름" name="name" placeholder="  이름"/>
                    <InputWithLabel label="이메일" name="email" placeholder="  이메일"/>
                    <InputWithLabel label="연락처" name="phoneNum" placeholder="  연락처"/>
                    <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password"/>
                    <InputWithLabel label="" name="passwordConfirm" placeholder="  비밀번호 확인" type="password"/>
                    <AuthButton>회원가입</AuthButton>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default Register;