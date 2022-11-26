import React, { useEffect, useState, useRef, forwardRef } from "react";
import { useSelector } from "react-redux";
import ContractModal from "../components/contractModal/ContractModal";
import { HOST } from "../redux/store";
import ProgressCircleDialog from "../components/ProgressCircleDialog";
import "../assets/css/index.css";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import AutoInputModal from "../components/AutoInputModal/AutoInputModal";

let currentPath = ""; // 현재 url 주소를 저장하기 위한 변수

const Service = () => {
  let isLogined = useSelector((state) => state.login);
  let userInfo = useSelector((state) => state.info);

  const token = useSelector((state) => state.jwt);
  const [modalOpen, setModalOpen] = useState(false);
  const [progressOpen, setprogressOpen] = useState(false);

  const [autoModalOpen, setAutoModalOpen] = useState(false);
  const [image, setImage] = useState("");

  const OpenAutoModal = async () => {
    setprogressOpen(true);
    const fetchData = async () => {
      let image = await fetch(HOST + "/commerce/wmp/crawl?option=getImage");
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

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [inputs, setInputs] = useState([
    {
      id0: "",
      pw0: "",
      id1: "",
      pw1: "",
      id2: "",
      pw2: "",
      id3: "",
      pw3: "",
      id4: "",
      pw4: "",
      id5: "",
      pw5: "",
      id6: "",
      pw6: "",
      id7: "",
      pw7: "",
    },
  ]);
  const { id0, id1, id2, id3, id4, id5, id6, id7 } = inputs;
  const { pw0, pw1, pw2, pw3, pw4, pw5, pw6, pw7 } = inputs;

  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState(0);

  const [isChecked, setIsChecked] = useState(false);

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
      case "105":
        alert("커머스의 비밀번호를 변경하고 다시 시도해주세요.");
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
    if (!id0 || !pw0) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    setprogressOpen(true);
    fetch(HOST + "/commerce/coupang/crawl?id=" + id0 + "&pw=" + pw0, {
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
          fetch(HOST + "/commerce/coupang/auth?code=" + inputString, {
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

  // 네브바 이동 컨트롤
  const location = useLocation(); // 현재 url을 받아서 저장

  useEffect(() => {
    if (currentPath === "/" && location.pathname === "/Service")
      // 홈 -> 서비스 : 서비스 창으로 스크롤
      window.scrollTo({
        top: document.querySelector(".calculate__check-wrap").offsetTop,
        behavior: "smooth",
      });
    else if (location.pathname === "/Service")
      // * -> 서비스 : 서비스 창으로 스크롤
      window.scrollTo({
        top: document.querySelector(".calculate__check-wrap").offsetTop,
        behavior: "smooth",
      });
    else if (currentPath === "/Service" && location.pathname === "/")
      // 서비스 -> 홈 : 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });

    currentPath = location.pathname; // currentPath 재설정
  }, [location]); // location이 바뀔 때마다 실행

  return (
    <main className="container">
      <Helmet>
        <title>CRE. - 초간편 선정산 서비스. 크레닷</title>
        <meta name="description" content="자금 고민의 마침표를 찍다, 크레닷(Cre.)" />
        <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
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
        <AutoInputModal
          open={autoModalOpen}
          close={closeAutoModal}
          header="자동입력방지문자 입력"
          image={image}
          setImage={setImage}
          id={id4 || ""}
          pw={pw4 || ""}
        ></AutoInputModal>

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
                    <input
                      name="id0"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id0 || ""}
                    />
                    <input
                      name="pw0"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw0 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[0]) {
                        console.log(id0, pw0);
                        lookUp();
                      }
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
                    <input
                      name="id1"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id1 || ""}
                    />
                    <input
                      name="pw1"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw1 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[1]) {
                        console.log(id1, pw1);
                      }
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo3.png" alt="" />
                  <form className="check-box-form" action="">
                    <input
                      name="id2"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id2 || ""}
                    />
                    <input
                      name="pw2"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw2 || ""}
                    />
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
                    <input
                      name="id3"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id3 || ""}
                    />
                    <input
                      name="pw3"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw3 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={async () => {
                      console.log(id3, pw3);
                      if (active[3]) {
                        setprogressOpen(true);
                        await fetch(HOST + "/commerce/tmon/crawl?id=" + id3 + "&pw=" + pw3, {
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
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo5.png" alt="" />
                  <form className="check-box-form" action="">
                    <input
                      name="id4"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id4 || ""}
                    />
                    <input
                      name="pw4"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw4 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={async () => {
                      // 위메프 조회하기

                      if (active[4]) {
                        setprogressOpen(true);
                        await fetch(HOST + "/commerce/wmp/crawl?option=isCaptcha", {
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          method: "POST",
                          body: JSON.stringify({ id: id4, pw: pw4 }),
                          credentials: "include",
                        }).then((response) => {
                          if (response.status == 200) {
                            setprogressOpen(false);
                            OpenAutoModal();
                          }
                        });
                      }
                    }}
                  >
                    조회하기
                  </button>

                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo6.png" alt="" />
                  <form className="check-box-form" action="">
                    <input
                      name="id5"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id5 || ""}
                    />
                    <input
                      name="pw5"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw5 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[5]) {
                        console.log(id5, pw5);
                      }
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo7.png" alt="" />
                  <form className="check-box-form" action="">
                    <input
                      name="id6"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id6 || ""}
                    />
                    <input
                      name="pw6"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw6 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[6]) {
                        console.log(id6, pw6);
                      }
                    }}
                  >
                    조회하기
                  </button>
                  <button className="check-box-btn check-box-btn2">선정산받기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo8.png" alt="" />
                  <form className="check-box-form" action="">
                    <input
                      name="id7"
                      className="check-box-input check-box-input-id"
                      type="text"
                      placeholder="ID"
                      onChange={onChange}
                      value={id7 || ""}
                    />
                    <input
                      name="pw7"
                      className="check-box-input check-box-input-pw main-password"
                      type="password"
                      placeholder="PW"
                      onChange={onChange}
                      value={pw7 || ""}
                    />
                    <div className="eyes"></div>
                  </form>
                  <button
                    className="check-box-btn check-box-btn1"
                    onClick={() => {
                      if (active[7]) {
                        console.log(id7, pw7);
                      }
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
