import React, { Component } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import InputWithLabel from './../components/InputWithLabel';
import AuthButton from './../components/auth/AuthButton';

class Login extends Component {
    render() {
        return (
            <AuthWrapper>
                <AuthContent title="Credot에 로그인">
                    <InputWithLabel label="이메일" name="email" placeholder="  이메일"/>
                    <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password"/>
                </AuthContent>
                <AuthButton>로그인</AuthButton>
            </AuthWrapper>
            
        );
    }
}

export default Login;