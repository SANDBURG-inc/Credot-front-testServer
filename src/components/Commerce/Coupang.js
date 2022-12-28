import ProgressCircleDialog from "../ProgressCircleDialog";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { HOST } from "../../redux/store";
import "./Commerce.css";

const Coupang = () => {
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

  const signing = () => {
    //로그인이 안된 경우
    if (!isLogined) {
      alert("로그인 후 선정산 받기가 가능합니다.");
      return;
    }

    //조회를 하지 않았을 경우
    if (!isChecked) {
      alert("선정산 가능 금액을 조회해주세요.");
      return;
    }

    //선정산 가능 금액이 0원일 경우
    if (price === 0) {
      alert("선정산 가능한 금액이 없습니다.");
      return;
    }
    openModal();
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const finishLookUp = (result) => {
    setPrice(JSON.parse(result).price); //계약서 - 받아온 가격 설정
    setDeadline(JSON.parse(result).deadline); //계약서 - 계약 종료기간 설정
    setIsChecked(true); //계약서 - 계약여부 체크
    alert(result);
  };

  const checkError = (errorCode) => {
    //credot서버에서 주는 응답코드들을 스위치 문으로 처리하는 코드입니다(NOTION참고)
    switch (errorCode) {
      case "101":
        alert("아이디 또는 비밀번호가 다릅니다. 확인 후 다시 입력해주세요");
        return false;
      case "102":
      case "103":
        alert("정산 현황이 존재하지 않습니다.");
        return false;
      case "104":
        alert("인증번호가 틀렸습니다.");
        return false;
      case "105":
        alert("커머스의 비밀번호를 변경하고 다시 시도해주세요.");
        return false;
      default:
        return true;
    }
  };

  const lookUp = () => {
    // 조회 함수입니다.
    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    setprogressOpen(true); //progressCircle을 띄웁니다.
    fetch(HOST + "/commerce/coupang/crawl?id=" + id + "&pw=" + pw, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        //유저 이메일을 통해 서버에서 getContract(유저의 이전 계약정보를 가져오는 함수)를 실행하기 때문에 전송해줍니다.
        uid: userInfo.email,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          setprogressOpen(false);
          throw new Error("400 or 500 Error");
        }
        return response.text();
      })
      .then((response) => {
        if (!checkError(response)) {
          setprogressOpen(false);
          return;
        }

        if (response === "200") {
          //정상적인 응답이 온다면 인증번호 prompt를 띄워줍니다.
          const inputString = prompt("인증번호를 입력해주세요", "인증번호");
          fetch(HOST + "/commerce/coupang/auth?code=" + inputString, {
            //prompt를 띄움과 동시에 서버의 쿠팡인증번호 api로 요청을 보냅니다.
            method: "get",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            credentials: "include",
          })
            .then((response) => {
              if (!response.ok) {
                setprogressOpen(false);
                throw new Error("400아니면 500에러남");
              }
              return response.text();
            })
            .then((response) => {
              if (!checkError(response)) {
                setprogressOpen(false);
                return;
              }
              finishLookUp(response); //응답이 처리되었다면 계약서에 들어갈 정보들을 업데이트합니다.
            });
          setprogressOpen(false);
          return;
        } else {
          finishLookUp(response);
          setprogressOpen(false);
          return;
        }
      })
      .catch((err) => {
        alert("조회 실패... 아이디와 비번을 확인해주세요");
      });
  };

  return (
    <div className="check-box">
      <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo1.png" alt="" />
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
        onClick={() => {
          console.log(active);
          if (active) {
            console.log(id, pw);
            lookUp();
          }
        }}
        ref={checkBtn}
      >
        조회하기
      </button>
      <button className="check-box-btn check-box-btn2" onClick={signing}>
        선정산받기
      </button>
    </div>
  );
};

export default Coupang;
