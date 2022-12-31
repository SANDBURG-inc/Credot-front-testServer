import ProgressCircleDialog from "../ProgressCircleDialog";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { HOST } from "../../redux/store";

const Tmon = () => {
  const [inputs, setInputs] = useState([{ id: "", pw: "" }]);
  const [active, setActive] = useState(false);
  const [progressOpen, setprogressOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id, pw } = inputs;
  let isLogined = useSelector((state) => state.login);
  let userInfo = useSelector((state) => state.info);
  const checkBtn = useRef();

  useEffect(() => {
    checkBtn.current.addEventListener("click", () => {
      if (checkBtn.current.parentNode.classList.contains("active")) {
        setActive(true);
      }
      checkBtn.current.parentNode.classList.add("active");
    });
  }, []);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const finishLookUp = (result) => {
    setPrice(JSON.parse(result).price);
    setDeadline(JSON.parse(result).deadline);
    setIsChecked(true);
    alert(result);
  };

  return (
    <div className="check-box">
      <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo4.png" alt="" />
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
      <ProgressCircleDialog open={progressOpen}></ProgressCircleDialog>
      <button
        className="check-box-btn check-box-btn1"
        onClick={async () => {
          console.log(active);
          if (active) {
            setprogressOpen(true);
            await fetch(HOST + "/commerce/tmon/crawl?id=" + id + "&pw=" + pw, {
              method: "post",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({
                uid: userInfo.email,
              }),
              credentials: "include",
            })
              .then((response) => {
                if (!response.ok) {
                  setprogressOpen(false);
                  alert("오류");
                }
                return response.text();
              })
              .then((response) => {
                setprogressOpen(false);
                finishLookUp(response);
              });
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

export default Tmon;
