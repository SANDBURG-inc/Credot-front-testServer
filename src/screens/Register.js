import React, { useState, useEffect } from "react";
// import { useCombobox } from "downshift";
import { Navigate } from "react-router-dom";
// import { bankList } from "./../data/bankList";
import { HOST } from "../redux/store";
import "../assets/css/register.css";

const Register = () => {
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
    corporateNum: "",
  });

  const [checkEmail, setCheckEmail] = useState(false);
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
      // setInputs({
      //   name: "",
      //   email: "",
      //   phoneNum: "",
      //   password: "",
      //   bank: "",
      //   account: "",
      // });
    } else {
      alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다!");
    }
  };

  return (
    <main className="container">
      <div className="inner">
        <section className="section-wrap introduce-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title">회원가입</span>
            </div>
            <div className="i-body">
              <div className="form-wrap">
                <form action>
                  <div className="inner__sec">
                    <span className="sec__head">회원 정보</span>
                    <div className="input-wrap">
                      <input type="text" placeholder="이름을 입력해주세요" name="name" onChange={handleOnChange} />
                      <div className="email-input-wrap">
                        <input className="input-email" type="text" placeholder="이메일을 입력해주세요" name="email" onChange={handleOnChange} />
                        {/* check-btn 버튼에 active 클래스 추가시 중복확인 버튼 활성화 */}
                        <button className="check-btn " type="button">
                          중복확인
                        </button>
                      </div>
                    </div>
                    <input className="input-sol" type="text" placeholder="연락처를 입력해주세요" name="phoneNum" onChange={handleOnChange} />
                    <div className="input-wrap">
                      <div className="password-wrap">
                        <input
                          type="password"
                          className="password-input"
                          placeholder="비밀번호를 입력해주세요"
                          name="password"
                          onChange={handleOnChange}
                        />
                        <div className="register-eyes" />
                      </div>
                      <div className="password-wrap password__check-input">
                        <input type="password" placeholder="비밀번호를 확인해주세요" name="password" onChange={handleOnChangeCheckPw} />
                      </div>
                    </div>
                  </div>
                  <div className="inner__sec ">
                    <span className="sec__head">사업자 정보</span>
                    <div className="input-wrap">
                      <input type="text" placeholder="법인명을 입력해주세요" name="corporateName" onChange={handleOnChange2} />
                      <input type="text" placeholder="대표명을 입력해주세요" name="ceo" onChange={handleOnChange2} />
                    </div>
                    <input
                      className="input-sol"
                      type="text"
                      placeholder="사업장 소재지를 입력해주세요."
                      name="businessLoc"
                      onChange={handleOnChange2}
                    />
                    <input
                      className="input-sol"
                      type="text"
                      placeholder="사업자 등록번호를 입력해주세요."
                      name="corporateNum"
                      onChange={handleOnChange2}
                    />
                  </div>
                  <div className="inner__sec last-sec">
                    <span className="sec__head">정산받을 계좌</span>
                    <select className="input-sol" name id required>
                      <option value disabled selected>
                        정산받을 계좌의 은행을 선택해주세요
                      </option>
                      <option value="기업은행">기업은행</option>
                      <option value>우리은행</option>
                      <option value>국민은행</option>
                      <option value>농협</option>
                    </select>
                    <input
                      className="input-sol"
                      type="text"
                      placeholder="정산받을 계좌번호를 입력해주세요."
                      name="account"
                      onChange={(e) => {
                        setAccount(e.target.value);
                      }}
                    />
                  </div>
                  {/* login-btn 버튼에 active 클래스 추가시 로그인 버튼 활성화 */}
                  <button
                    className="login-btn"
                    type="button"
                    onClick={() => {
                      handleOnClick();
                      fetch(
                        HOST +
                          "/database/register?email=" +
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
                          account +
                          "&corporateName=" +
                          incInputs.corporateName +
                          "&ceo=" +
                          incInputs.ceo +
                          "&businessLoc=" +
                          incInputs.businessLoc +
                          "&corporateNum=" +
                          incInputs.corporateNum
                      )
                        .then((response) => response.text())
                        .then((response) => {
                          console.log(response);
                          if (!response) {
                            console.log("fetch error");
                          } else if (response) {
                            setR(true);
                            console.log(r);
                            alert(users[users.length - 1].name + "님 환영합니다.");
                          }
                        });
                      // 입력이 끝나고 inputs를 비워주는 역할
                      setInputs({
                        name: "",
                        email: "",
                        phoneNum: "",
                        password: "",
                        bank: "",
                        account: "",
                      });
                    }}
                  >
                    회원 가입하기
                  </button>
                </form>
              </div>
              <button className="back-btn">메인화면으로 돌아가기</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// const Combobox = (props) => {
//   const [items] = useState(bankList);
//   const [selectedItem, setSelectedItem] = useState("");

//   useEffect(() => {
//     props.setBank(selectedItem);
//   }, [props, selectedItem]);

//   const getFilter = (inputValue) => {
//     return function Filter(bankList) {
//       return !inputValue || bankList.toUpperCase().includes(inputValue);
//     };
//   };

//   const { isOpen, highlightedIndex, getComboboxProps, getInputProps, getToggleButtonProps, getMenuProps, getItemProps } = useCombobox({
//     onInputValueChange({ inputValue }) {
//       setSelectedItem(...bankList.filter(getFilter(inputValue)));
//     },
//     items,
//   });

//   return (
//     <>
//       <div {...getComboboxProps()}>
//         <BankInput readOnly name="bank" placeholder="은행" {...getInputProps()} />
//         <Btn {...getToggleButtonProps()}>{isOpen ? <>&#8593;</> : <>&#8595;</>}</Btn>
//       </div>
//       <ul {...getMenuProps()}>
//         {isOpen &&
//           items.map((item, index) => (
//             <li {...getItemProps({ item, index })} key={item} style={{ background: index === highlightedIndex && "lightgray" }}>
//               {item}
//             </li>
//           ))}
//       </ul>
//     </>
//   );
// };

export default Register;
