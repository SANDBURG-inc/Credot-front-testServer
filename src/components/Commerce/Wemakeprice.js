import ProgressCircleDialog from "../ProgressCircleDialog";
import React, { useState, useEffect, useRef } from "react";
import { HOST } from "../../redux/store";
import AutoInputModal from "../AutoInputModal/AutoInputModal";

const WeMakePrice = () => {
  const [inputs, setInputs] = useState([{ id: "", pw: "" }]);
  const [active, setActive] = useState(false);
  const [progressOpen, setprogressOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id, pw } = inputs;
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

  const [autoModalOpen, setAutoModalOpen] = useState(false); //자동입력방지문자 모달을 위한 state
  const [image, setImage] = useState(""); //이미지 state
  const OpenAutoModal = async () => {
    setprogressOpen(true);
    const fetchData = async () => {
      let image = await fetch(HOST + "/commerce/wmp/crawl?option=getImage"); //서버로 부터 자동입력방지문자를 요청 후 받아와서 setImage로 렌더링
      image = await image.blob();
      setImage(image);
    };
    await fetchData().then(() => {
      setprogressOpen(false);
      setAutoModalOpen(true);
    });
  };
  const closeAutoModal = () => {
    setAutoModalOpen(false);
  };

  return (
    <div className="check-box">
      <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo5.png" alt="" />
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
      <AutoInputModal
        open={autoModalOpen}
        close={closeAutoModal}
        header="자동입력방지문자 입력"
        image={image}
        setImage={setImage}
        id={id || ""}
        pw={pw || ""}
      ></AutoInputModal>
      <button
        className="check-box-btn check-box-btn1"
        onClick={async () => {
          // 위메프 조회하기

          if (active) {
            setprogressOpen(true);
            await fetch(HOST + "/commerce/wmp/crawl?option=isCaptcha", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ id: id, pw: pw }),
              credentials: "include",
            }).then((response) => {
              if (response.status == 200) {
                setprogressOpen(false);
                OpenAutoModal();
              }
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

export default WeMakePrice;
