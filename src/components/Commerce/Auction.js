import ProgressCircleDialog from "../ProgressCircleDialog";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { HOST } from "../../redux/store";

const Auction = () => {
  const [inputs, setInputs] = useState([{ id: "", pw: "" }]);
  const [active, setActive] = useState(false);
  const checkBtn = useRef();
  const { id, pw } = inputs;
  useEffect(() => {
    checkBtn.current.addEventListener("click", () => {
      if (checkBtn.current.parentNode.classList.contains("active")) {
        setActive(true);
      }
      checkBtn.current.parentNode.classList.add("active");
    });
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  return (
    <div className="check-box">
      <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo8.png" alt="" />
      <form className="check-box-form" action="">
        <input name="id" className="check-box-input check-box-input-id" type="text" placeholder="ID" onChange={onChange} value={id || ""} />
        <input
          name="pw"
          className="check-box-input check-box-input-pw main-password"
          type="password"
          placeholder="PW"
          onChange={onChange}
          value={pw || ""}
        />
        <div className="eyes"></div>
      </form>
      <button
        className="check-box-btn check-box-btn1"
        onClick={() => {
          if (active) {
            console.log(id, pw);
          }
        }}
        ref={checkBtn}
      >
        조회하기
      </button>
      <button className="check-box-btn check-box-btn2">선정산받기</button>
    </div>
  );
};

export default Auction;
