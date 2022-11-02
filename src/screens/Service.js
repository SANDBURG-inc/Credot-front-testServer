import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContractModal from "../components/contractModal/ContractModal";
import { HOST } from "../redux/store";
import ProgressCircleDialog from "../components/ProgressCircleDialog";
import "../assets/css/index.css";
import { Helmet } from "react-helmet";

const Service = () => {
  let isLogined = useSelector((state) => state.login);

  const token = useSelector((state) => state.jwt);
  const [modalOpen, setModalOpen] = useState(false);
  const [progressOpen, setprogressOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState(0);

  const [isChecked, setIsChecked] = useState(false);

  const { id, pw } = inputs;

  const [active, setActive] = useState([false, false, false, false, false, false, false, false]);

  useEffect(() => {
    console.log("토큰값 변경됨 " + token);
  }, [token]);

  useEffect(() => {
    // 메인 첫 섹션 스크롤 이동
    document.querySelector(".visual-scroll-down").addEventListener("click", function () {
      window.scrollTo({
        top: document.querySelector(".calculate__check-wrap").offsetTop,
        behavior: "smooth",
      });
    });

    // 조회하기 클릭시 입력폼 나타남
    let checkBtn = document.querySelectorAll(".check-box-btn1");

    for (let i = 0; i < checkBtn.length; i++) {
      checkBtn[i].addEventListener("click", function () {
        if (this.parentNode.classList.contains("active")) {
          let copy = [...active];
          copy[i] = true;
          setActive(copy);
        }
        this.parentNode.classList.add("active");
      });
    }

    // 패스워드 인풋 눈 클릭시 비밀번호 보였다 안 보였다 스크립트
    let eyes = document.querySelectorAll(".eyes");

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
    document.querySelector(".header").classList.remove("this-page-s__i");
    document.querySelector(".header").classList.remove("this-page-c");
    document.querySelector(".header").classList.remove("this-page-n");
    return () => {};
  }, []);

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

  const checkError = (errorCode) => {
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
      default:
        return true;
    }
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

  const lookUp = () => {
    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    setprogressOpen(true);
    fetch(HOST + "/commerce/coupang/crawl?id=" + id + "&pw=" + pw, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
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
          const inputString = prompt("인증번호를 입력해주세요", "인증번호");
          fetch(HOST + "/coupang/auth?code=" + inputString, { credentials: "include" })
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
              finishLookUp(response);
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
    <main className="container">
      <Helmet>
        <title>CRE. - 초간편 선정산 서비스. 크레닷</title>
      </Helmet>
      <div className="inner">
        <section className="section-wrap visual-wrap">
          <div className="inner">
            <div className="visual-main">
              <div className="visual-main-lead">
                <span className="visual-main-lead-span1">
                  크레닷으로 쉽고 빠른
                  <br />
                  <strong className="strong">판매대금 정산!</strong>
                </span>
                <span className="visual-main-lead-span2">
                  지금 바로 이용중인 커머스 판매자 정보를 입력하고
                  <br />
                  즉시 정산 가능한 금액을 조회해보세요!
                </span>
              </div>
              <img className="visual-main-img" src="../assets/images/main/m-visual.png" alt="" />
            </div>
            <div className="visual-marquee">
              <div className="marquee">
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
                  </span>
                </div>
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">사용이 편리</strong>해서 초보들도 간편하게 사용할수 있어요~ 넘 좋네요
                  </span>
                </div>
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
                  </span>
                </div>
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">빠른정산</strong>으로 사업이 더 빨리 성장 할수 있었어요!! 최고 입니다~
                  </span>
                </div>
              </div>
              <div className="marquee marquee2">
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
                  </span>
                </div>
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">사용이 편리</strong>해서 초보들도 간편하게 사용할수 있어요~ 넘 좋네요
                  </span>
                </div>
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
                  </span>
                </div>
                <div className="marquee-balloon">
                  <span className="marquee-balloon-span1">쿠팡 셀러 김**님의 후기</span>
                  <span className="marquee-balloon-span2">
                    <strong className="strong">빠른정산</strong>으로 사업이 더 빨리 성장 할수 있었어요!! 최고 입니다~
                  </span>
                </div>
              </div>
            </div>
            <button className="visual-scroll-down">
              <img src="../assets/images/main/m-arrow-down.svg" alt="" />
            </button>
          </div>
        </section>

        <ProgressCircleDialog open={progressOpen}></ProgressCircleDialog>
        <ContractModal open={modalOpen} close={closeModal} header="계약서 작성" amount={price} deadline={deadline}></ContractModal>

        <section className="calculate__check-wrap">
          <div className="inner">
            <div className="c-head">
              <div className="c-head-box">
                <span className="c-head-box-span1">
                  지금 즉시 <strong className="strong">정산 가능한 금액</strong>
                  을<br />
                  조회 해보세요!
                </span>
                <div className="value-wrap">
                  <span className="value-wrap-span">즉시 정산 가능 금액</span>
                  <div className="value">
                    <strong className="strong font-eng">{price}</strong>
                    <mark className="mark">원</mark>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-body">
              <div className="c-body-box">
                {/* <!-- 조회하기 버튼에 active 클래스 추가시 색상변경 --> */}
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo1.png" alt="" />
                  <form className="check-box-form" action="">
                    <input name="id" className="check-box-input check-box-input-id" type="text" placeholder="ID" onChange={onChange} value={id} />
                    <input
                      name="pw"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[0]) lookUp();
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2" onClick={signing}>
                    선정산받기
                  </button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo2.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      // if (active[1]) alert("서비스 준비중입니다.");
                      fetch(HOST + "/passport", { credentials: "include" })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("400아니면 500에러남");
                          }
                          return response.text();
                        })
                        .then((response) => {
                          return alert(response);
                        });
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo3.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[2]) alert("서비스 준비중입니다.");
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo4.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[3]) alert("서비스 준비중입니다.");
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo5.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[4]) alert("서비스 준비중입니다.");
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo6.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[5]) alert("서비스 준비중입니다.");
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo7.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[6]) alert("서비스 준비중입니다.");
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo8.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw main-password" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[7]) alert("서비스 준비중입니다.");
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
              </div>
            </div>
            <button
              className="c-button"
              onClick={() => {
                alert("더 많은 정산 서비스가 준비중입니다.");
              }}
            >
              더 많은 정산 서비스 확인하러 가기
              <img className="btn-img" src="../assets/images/main/m-button-arrow-r.svg" alt="" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Service;
