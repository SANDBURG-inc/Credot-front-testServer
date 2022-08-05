import React, { Component, useState, useCallback, useEffect, useContext } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import InputWithLabel from './../components/InputWithLabel';
import AuthButton from './../components/auth/AuthButton';
import RightAlignedLink from './../components/RightAlignedLink';
import { useCombobox } from "downshift";
import { bankList } from "./../data/bankList";
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { isLogin } from "./../redux/store.js"

const Register = () => {

    const [flag, setFlag] = useState(0);
    const [bank, setBank] = useState("초기값");
    const [account, setAccount] = useState("초기값");
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phoneNum: "",
        password: "",
    })
    const [users, setUsers] = useState([])

    const handleOnChange = (e) => {
        console.log(e.target.name + ": " + e.target.value);
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        console.log("은행: " + bank);
    }, [bank])

    useEffect(() => {
        console.log("계좌번호: " + account);
    }, [account])

    useEffect(() => {
        console.log(inputs)
    }, [inputs])

    useEffect(() => {
        console.log(users)
    }, [users])

    const handleOnClick = () => {
        const { name, email, phoneNum, password } = inputs;
        
        // users 배열에 추가할 user 객체
        const user = { name, email, phoneNum, password };
        
        // spread 연산을 통해서 기존의 값을 복사하고, users State에 추가
        setUsers([
            ...users,
            user
        ])
        
        // 입력이 끝나고 inputs를 비워주는 역할
        // setInputs({
        //     name: "",
        //     email: "",
        //     phoneNum: "",
        //     password: "",
        //     bank: "",
        //     account: "",
        // })
    }

    return flag === 0
           ? 
            <AuthWrapper>
                <AuthContent title="회원가입">
                        <InputWithLabel label="이름" name="name" placeholder=" 이름" onChange={handleOnChange}/>
                        <InputWithLabel label="이메일" name="email" placeholder="  이메일" onChange={handleOnChange}/>
                        <InputWithLabel label="연락처" name="phoneNum" placeholder="  연락처" onChange={handleOnChange}/>
                        <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password" onChange={handleOnChange}/>
                        <InputWithLabel label="" name="passwordConfirm" placeholder="  비밀번호 확인" type="password" onChange={handleOnChange}/>
                        <AuthButton onClick={()=>{
                            handleOnClick();
                            setFlag();
                        }}>다음</AuthButton>
                        <RightAlignedLink to="/login">로그인</RightAlignedLink>
                </AuthContent>
            </AuthWrapper>
           : 
            <AuthWrapper>
                <AuthContent title="선정산 받으실 계좌를 입력해주세요">
                    <Combobox name="bank" setBank={setBank}/>
                    <input name="account" placeholder="  계좌번호" onChange={(e) => {setAccount(e.target.value)}}/>
                </AuthContent>
                <AuthButton onClick={()=>{
                            handleOnClick();
                            fetch('http://api.credot.kr/database/register?id=' + users[users.length-1].email
                                + '&name=' + users[users.length-1].name
                                + '&pw=' + users[users.length-1].password
                                + '&phoneNum=' + users[users.length-1].phoneNum
                                + '&bank=' + bank
                                + '&account=' + account
                            )
                            .then(response => {if(!response){console.log('fetch error')}})
                        }}>회원가입 완료</AuthButton>
            </AuthWrapper>

}

const Combobox = (props) => {
    const [items] = useState(bankList)
    const [selectedItem, setSelectedItem] = useState("");
  
    useEffect(() => {
      props.setBank(selectedItem)
    }, [selectedItem])
  
    const getFilter = (inputValue) => {
      return function Filter(bankList) {
        return (
          !inputValue ||
          bankList.toUpperCase().includes(inputValue)
        )
      }
    }
  
    const {
      isOpen,
      highlightedIndex,
      getComboboxProps,
      getInputProps,
      getToggleButtonProps,
      getMenuProps,
      getItemProps,
    } = useCombobox({
      onInputValueChange({inputValue}) {
        setSelectedItem(...bankList.filter(getFilter(inputValue)))
      },
      items,
    });
  
    return (
      <>
        <div {...getComboboxProps()}>
          <input readOnly name="bank" placeholder="  은행" {...getInputProps()}/>
          <button {...getToggleButtonProps()}>{isOpen ? <>&#8593;</> : <>&#8595;</>}</button>
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                {...getItemProps({ item, index })}
                key={item}
                style={{ background: index === highlightedIndex && "lightgray" }}
              >
                {item}
              </li>
            ))}
        </ul>
      </>
    );
}

export default Register;