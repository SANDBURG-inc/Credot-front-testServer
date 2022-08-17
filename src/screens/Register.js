import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/auth/AuthWrapper";
import AuthContent from "../components/auth/AuthContent";
import InputWithLabel from "./../components/InputWithLabel";
import AuthButton from "./../components/auth/AuthButton";
import RightAlignedLink from "./../components/RightAlignedLink";
import { Button, Form } from 'react-bootstrap';
import { useCombobox } from "downshift";
import { Navigate } from "react-router-dom";
import { bankList } from "./../data/bankList";
import { useSelector } from "react-redux";


const Register = () => {
  const HOST = useSelector((state) => state.HOST);
  const [flag, setFlag] = useState(0);
  const [r, setR] = useState(false);
  const [bank, setBank] = useState("초기값");
  const [account, setAccount] = useState("초기값");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phoneNum: "",
    password: "",
  });
  const [incInputs, setIncInputs] = useState({
    corporateName: "",
    ceo: "",
    businessLoc: "",
    registerNum: "",
  });

  const [checkPw, setCheckPw] = useState("");
  const [users, setUsers] = useState([]);

  const handleOnChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChange2 = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    setIncInputs({
      ...incInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeCheckPw = (e) => {
    setCheckPw(e.target.value);
  };

  useEffect(() => {
    console.log("은행: " + bank);
  }, [bank]);

  useEffect(() => {
    console.log("계좌번호: " + account);
  }, [account]);

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  useEffect(() => {
    console.log(incInputs);
  }, [incInputs]);

  useEffect(() => {
    console.log("비밀번호 확인 값: " + checkPw);
  }, [checkPw]);

  

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (r === true) {
    return <Navigate to="/" />;
  }

  const handleOnClick = () => {
    if (inputs.password === "" || checkPw === "") {
      alert("비밀번호를 확인해주세요!");
    } else if (inputs.password === checkPw) {
      const { name, email, phoneNum, password } = inputs;

      // users 배열에 추가할 user 객체
      const user = { name, email, phoneNum, password };

      // spread 연산을 통해서 기존의 값을 복사하고, users State에 추가
      setUsers([...users, user]);

      // 입력이 끝나고 inputs를 비워주는 역할
      setInputs({
          name: "",
          email: "",
          phoneNum: "",
          password: "",
          bank: "",
          account: "",
      })
      setFlag();
    } 
    else {
      alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다!");
    }
  };

  return flag === 0 ? (
    <AuthWrapper>
      <AuthContent title="회원가입">
        <InputWithLabel label="이름" name="name" placeholder=" 이름" onChange={handleOnChange} />
        <InputWithLabel label="이메일" name="email" placeholder="  이메일" onChange={handleOnChange} />
        <Button className='button' style={{ margin: "20px 0px 65px 0px" }} variant='light' onClick={() => {
          if (!inputs.email.includes('@')) {
            alert('이메일 형식을 올바르게 입력해주세요!');
          } else {
            fetch(HOST+'/database/checkEmail?id=' + inputs.email)
            .then((response) => response.text())
            .then((response) => alert(response))
          }
        }}>이메일 중복확인</Button>
        <InputWithLabel label="연락처" name="phoneNum" placeholder="  연락처" onChange={handleOnChange} />
        <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password" onChange={handleOnChange} />
        <InputWithLabel label="" name="passwordConfirm" placeholder="  비밀번호 확인" type="password" onChange={handleOnChangeCheckPw} />
        <AuthButton
          onClick={() => {
            handleOnClick();
          }}
          // onChange={handleOnChange}
        >
          다음
        </AuthButton>
        <RightAlignedLink to="/login">로그인</RightAlignedLink>
      </AuthContent>
    </AuthWrapper>
  ) : (
    <AuthWrapper>
      <AuthContent title="사업자 정보를 알려주세요">
        <Form.Control style={{ margin: "10px 0px 25px 0px" }} name="corporateName" placeholder="법인명" onChange={handleOnChange2} />
        <Form.Control style={{ margin: "10px 0px 25px 0px" }} name="ceo" placeholder="대표명" onChange={handleOnChange2} />
        <Form.Control style={{ margin: "10px 0px 25px 0px" }} name="businessLoc" placeholder="사업장 소재지" onChange={handleOnChange2} />
        <Form.Control style={{ margin: "10px 0px 70px 0px" }} name="registerNum" placeholder="사업자 등록번호" onChange={handleOnChange2} />
      </AuthContent>
      <AuthContent title="선정산 받으실 계좌를 알려주세요">
        <Combobox name="bank" setBank={setBank} />
        <Form.Control style={{ margin: "10px 0px 50px 0px" }} name="account" placeholder="  계좌번호"
          onChange={(e) => {
            setAccount(e.target.value);
          }} />
      </AuthContent>
      <AuthButton
        onClick={() => {
          handleOnClick();
          fetch(
            HOST+"/database/register?id=" +
              users[users.length - 1].email +
              "&name=" +
              users[users.length - 1].name +
              "&pw=" +
              users[users.length - 1].password +
              "&phoneNum=" +
              users[users.length - 1].phoneNum +
              "&bank=" +
              bank +
              "&account=" +
              account
          ).then((response)=>response.text())
          .then((response) => {
            console.log(response)
            if (!response) {
              console.log("fetch error");
            }
            else if (response) {
              setR(true);
              console.log(r);
              alert(users[users.length - 1].name + "님 환영합니다.");
            }
            else {
              alert("제대로 입력해라 마");
            }
          });
        }}
      >
        회원가입 완료
      </AuthButton>
    </AuthWrapper>
  );
};

const Combobox = (props) => {
  const [items] = useState(bankList);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    props.setBank(selectedItem);
  }, [props, selectedItem]);

  const getFilter = (inputValue) => {
    return function Filter(bankList) {
      return !inputValue || bankList.toUpperCase().includes(inputValue);
    };
  };

  const { isOpen, highlightedIndex, getComboboxProps, getInputProps, getToggleButtonProps, getMenuProps, getItemProps } = useCombobox({
    onInputValueChange({ inputValue }) {
      setSelectedItem(...bankList.filter(getFilter(inputValue)));
    },
    items,
  });

  return (
    <>
      <div {...getComboboxProps()}>
        <input readOnly name="bank" placeholder="  은행" {...getInputProps()} />
        <button {...getToggleButtonProps()}>{isOpen ? <>&#8593;</> : <>&#8595;</>}</button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li {...getItemProps({ item, index })} key={item} style={{ background: index === highlightedIndex && "lightgray" }}>
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Register;
