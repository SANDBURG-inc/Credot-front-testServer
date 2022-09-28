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

  const selectBoxChange = (e) => {
    console.log(e.target.value);
    setBank(e.target.value);
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

  useEffect(() => {
    // 패스워드 인풋 눈 클릭시 비밀번호 보였다 안 보였다 스크립트
    let eyes = document.querySelectorAll(".r-eyes");

    for (let i = 0; i < eyes.length; i++) {
      eyes[i].addEventListener("click", function () {
        if (this.previousElementSibling.type === "text") {
          this.classList.remove("visible");
          this.previousElementSibling.type = "password";
        } else {
          this.classList.add("visible");
          this.previousElementSibling.type = "text";
        }
      });
    }
  }, []);

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
        <section className="section-wrap register-introduce-wrap">
          <div className="inner">
            <div className="register-i-head">
              <span className="register-head-title">회원가입</span>
            </div>
            <div className="register-i-body">
              <div className="register-form-wrap">
                <form action>
                  <div className="register-inner__sec">
                    <span className="register-sec__head">회원 정보</span>
                    <div className="register-input-wrap">
                      <input type="text" placeholder="이름을 입력해주세요" name="name" onChange={handleOnChange} />
                      <div className="register-email-input-wrap">
                        <input
                          className="register-input-email"
                          type="text"
                          placeholder="이메일을 입력해주세요"
                          name="email"
                          onChange={handleOnChange}
                        />
                        {/* check-btn 버튼에 active 클래스 추가시 중복확인 버튼 활성화 */}
                        <button
                          className="register-check-btn active"
                          type="button"
                          onClick={() => {
                            if (!inputs.email.includes("@")) {
                              alert("이메일 형식을 올바르게 입력해주세요!");
                            } else {
                              fetch(HOST + "/database/checkEmail?email=" + inputs.email)
                                .then((response) => response.json())
                                .then((response) => {
                                  console.log(response);
                                  if (response) {
                                    alert("중복되는 이메일이 있습니다.");
                                  } else {
                                    setCheckEmail(true);
                                    alert("사용가능한 이메일입니다.");
                                  }
                                });
                            }
                          }}
                        >
                          중복확인
                        </button>
                      </div>
                    </div>
                    <input className="register-input-sol" type="text" placeholder="연락처를 입력해주세요" name="phoneNum" onChange={handleOnChange} />
                    <div className="register-input-wrap">
                      <div className="register-password-wrap">
                        <input
                          type="password"
                          className="input-password"
                          placeholder="비밀번호를 입력해주세요"
                          name="password"
                          onChange={handleOnChange}
                        />
                        <div className="r-eyes"></div>
                      </div>
                      <div className="register-password-wrap password__check-input">
                        <input type="password" placeholder="비밀번호를 확인해주세요" name="password" onChange={handleOnChangeCheckPw} />
                      </div>
                    </div>
                  </div>
                  <div className="register-inner__sec ">
                    <span className="register-sec__head">사업자 정보</span>
                    <div className="register-input-wrap">
                      <input type="text" placeholder="법인명을 입력해주세요" name="corporateName" onChange={handleOnChange2} />
                      <input type="text" placeholder="대표명을 입력해주세요" name="ceo" onChange={handleOnChange2} />
                    </div>
                    <input
                      className="register-input-sol"
                      type="text"
                      placeholder="사업장 소재지를 입력해주세요."
                      name="businessLoc"
                      onChange={handleOnChange2}
                    />
                    <input
                      className="register-input-sol"
                      type="text"
                      placeholder="사업자 등록번호를 입력해주세요."
                      name="corporateNum"
                      onChange={handleOnChange2}
                    />
                  </div>
                  <div className="inner__sec last-sec">
                    <span className="sec__head">정산받을 계좌</span>
                    <select className="register-input-sol" name id required onChange={selectBoxChange}>
                      <option value disabled selected>
                        정산받을 계좌의 은행을 선택해주세요
                      </option>
                      <option value="기업은행">기업은행</option>
                      <option value="우리은행">우리은행</option>
                      <option value="신한은행">신한은행</option>
                      <option value="하나은행">하나은행</option>
                      <option value="대구은행">대구은행</option>
                      <option value="부산은행">부산은행</option>
                      <option value="경남은행">경남은행</option>
                      <option value="광주은행">광주은행</option>
                      <option value="전북은행">전북은행</option>
                      <option value="제주은행">제주은행</option>
                      <option value="국민은행">국민은행</option>
                      <option value="농협은행">농협은행</option>
                      <option value="산업은행">산업은행</option>
                      <option value="수협은행">수협은행</option>
                      <option value="한국씨티뱅크">한국씨티뱅크</option>
                      <option value="SC제일은행">SC제일은행</option>
                      <option value="HSBC">HSBC</option>
                      <option value="도이치뱅크">도이치뱅크</option>
                      <option value="BOA">BOA</option>
                      <option value="JP모간">JP모간</option>
                      <option value="중국공상">중국공상</option>
                      <option value="BNP파라바">BNP파라바</option>
                      <option value="우체국">우체국</option>
                      <option value="케이뱅크">케이뱅크</option>
                      <option value="카카오뱅크">카카오뱅크</option>
                      <option value="산림조합">산림조합</option>
                      <option value="신협은행">신협은행</option>
                      <option value="중국은행">중국은행</option>
                      <option value="중국건설은행">중국건설은행</option>
                      <option value="토스뱅크">토스뱅크</option>
                      <option value="SB저축은행">SB저축은행</option>
                    </select>
                    <input
                      className="register-input-sol"
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
