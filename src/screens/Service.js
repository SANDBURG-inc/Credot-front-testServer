import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContractModal from "../components/contractModal/ContractModal";
import { HOST } from "../redux/store";
import ProgressCircleDialog from "../components/ProgressCircleDialog";
import "../assets/css/index.css";

//버젼1
// let Text = styled.p`
//   color: #ec5f2c;
//   padding: 10px;
//   font-weight: bold;
// `;

// let OrangeContainer = styled.div`
//   background-color: #ec5f2c;
//   padding: 10px;
//   border: solid black;
//   border-width: 1px 0px 1px 0px;
//   margin-bottom: 40px;
// `;

// let OrangeRoundContainer = styled.div`
//   background-color: rgba(236, 95, 44, 0.14);
//   padding: 40px;
//   border-radius: 1em;
//   margin: 30px;
// `;

// let LookupCard = styled.div`
//   padding: 20px;
//   border-radius: 1rem;
//   background: #ffffff;
// `;

const Service = () => {
  let isLogined = useSelector((state) => state.login);

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

  useEffect(() => {
    // 메인 첫 섹션 스크롤 이동
    document.querySelector(".visual-scroll-down").addEventListener("click", function () {
      window.scrollTo({
        top: document.querySelector(".calculate__check-wrap").offsetTop,
        behavior: "smooth",
      });
    });
    // 패스워드 인풋 눈 클릭시 비밀번호 보였다 안 보였다 스크립트
    let eyes = document.querySelectorAll(".eyes");

    for (let i = 0; i < eyes.length; i++) {
      eyes[i].addEventListener("click", function () {
        if (eyes[i].previousElementSibling.type === "text") {
          this.classList.remove("visible");
          this.previousElementSibling.type = "password";
        } else {
          this.classList.add("visible");
          this.previousElementSibling.type = "text";
        }
      });
    }
    return () => {};
  });

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
          fetch(HOST + "/coupang/auth?code=" + inputString)
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
        console.log(err);
        alert("조회 실패... 아이디와 비번을 확인해주세요");
      });
  };

  return (
    //버젼1-----------------------------------
    // <Container>
    //   <ProgressCircleDialog open={progressOpen}></ProgressCircleDialog>
    //   <Row>
    //     <Col style={{ padding: "100px" }}>
    //       <h4>크레닷으로 쉽고 빠른 판매대금 정산!</h4>
    //       <Text>
    //         지금 바로 이용중인 커머스 <br />
    //         판매자 정보를 입력하고
    //         <br />
    //         즉시 정산 가능한 금액을 조회해보세요!
    //       </Text>
    //     </Col>
    //     <Col
    //       style={{
    //         alignItems: "center",
    //         justifyContent: "center",
    //         display: "flex",
    //       }}
    //     >
    //       <div>
    //         <h3>hook test2</h3>

    //         <h3>hook test2</h3>

    //         <h3>hook test2</h3>
    //       </div>
    //     </Col>
    //   </Row>
    //   <OrangeContainer>
    //     <h3
    //       style={{
    //         color: "white",
    //       }}
    //     >
    //       지금 즉시 정산 가능한 금액을 조회해보세요!
    //     </h3>
    //     <p
    //       style={{
    //         color: "white",
    //       }}
    //     >
    //       {"즉시 정산 가능 금액 " + price + " 원"}
    //     </p>
    //     <button onClick={signing} style={{ padding: "4px" }}>
    //       선정산 받기
    //     </button>
    //   </OrangeContainer>
    //   <ContractModal open={modalOpen} close={closeModal} header="계약서 작성" amount={price} deadline={deadline}></ContractModal> {/* 수정필요 */}
    //   <OrangeRoundContainer>
    //     <Row>
    //       <Col>
    //         <LookupCard>
    //           <img src={require("../img/coupang_wing.png")} height="20"></img>
    //           <div style={{ padding: "20px 0px" }}>
    //             <input name="id" placeholder="ID" onChange={onChange} value={id} />
    //             <input name="pw" placeholder="PW" onChange={onChange} value={pw} />
    //           </div>
    //           <button onClick={lookUp}>조회</button>
    //         </LookupCard>
    //       </Col>
    //       <Col>
    //         <LookupCard>
    //           <img src={require("../img/coupang_wing.png")} height="20"></img>
    //           <div style={{ padding: "20px 0px" }}>
    //             <input placeholder="ID" />
    //             <input placeholder="PW" />
    //           </div>
    //           <button onClick={lookUp}>조회</button>
    //         </LookupCard>
    //       </Col>
    //       <Col>
    //         <LookupCard>
    //           <img src={require("../img/coupang_wing.png")} height="20"></img>
    //           <div style={{ padding: "20px 0px" }}>
    //             <input placeholder="ID" />
    //             <input placeholder="PW" />
    //           </div>
    //           <button onClick={lookUp}>조회</button>
    //         </LookupCard>
    //       </Col>
    //       <Col>
    //         <LookupCard>
    //           <img src={require("../img/coupang_wing.png")} height="20"></img>
    //           <div style={{ padding: "20px 0px" }}>
    //             <input placeholder="ID" />
    //             <input placeholder="PW" />
    //           </div>
    //           <button onClick={lookUp}>조회</button>
    //         </LookupCard>
    //       </Col>
    //     </Row>
    //   </OrangeRoundContainer>
    // </Container>

    //버젼2-----------------------------------
    // <main className="container">
    //   <div className="inner">
    //     <section className="visual-wrap">
    //       <div className="inner">
    //         <div className="visual-main">
    //           <div className="visual-main-lead">
    //             <span>
    //               크레닷으로 쉽고 빠른
    //               <br />
    //               <strong>판매대금 정산!</strong>
    //             </span>
    //             <span>
    //               지금 바로 이용중인 커머스 판매자 정보를 입력하고
    //               <br />
    //               즉시 정산 가능한 금액을 조회해보세요!
    //             </span>
    //           </div>
    //           <img className="visual-main-img" src="../assets/images/main/m-visual.png" alt="" />
    //         </div>
    //         <div className="visual-marquee">
    //           <div className="marquee">
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
    //               </span>
    //             </div>
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>사용이 편리</strong>해서 초보들도 간편하게 사용할수 있어요~ 넘 좋네요
    //               </span>
    //             </div>
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
    //               </span>
    //             </div>
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>빠른정산</strong>으로 사업이 더 빨리 성장 할수 있었어요!! 최고 입니다~
    //               </span>
    //             </div>
    //           </div>
    //           <div className="marquee marquee2">
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
    //               </span>
    //             </div>
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>사용이 편리</strong>해서 초보들도 간편하게 사용할수 있어요~ 넘 좋네요
    //               </span>
    //             </div>
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>사업 확대</strong>에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^
    //               </span>
    //             </div>
    //             <div className="marquee-balloon">
    //               <span>쿠팡 셀러 김**님의 후기</span>
    //               <span>
    //                 <strong>빠른정산</strong>으로 사업이 더 빨리 성장 할수 있었어요!! 최고 입니다~
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         <button className="visual-scroll-down">
    //           <img src="../assets/images/main/m-arrow-down.svg" alt="" />
    //         </button>
    //       </div>
    //     </section>
    //     <ProgressCircleDialog open={progressOpen}></ProgressCircleDialog>
    //     <ContractModal open={modalOpen} close={closeModal} header="계약서 작성" amount={price} deadline={deadline}></ContractModal>
    //     <section className="calculate__check-wrap">
    //       <div className="inner">
    //         <div className="c-head">
    //           <div className="c-head-box">
    //             <span>
    //               지금 즉시
    //               <strong>정산 가능한 금액</strong>을<br />
    //               조회 해보세요!
    //             </span>
    //             <span>
    //               즉시 정산 가능 금액
    //               <strong className="font-eng">{price}</strong>
    //               <mark>원</mark>
    //             </span>
    //           </div>
    //         </div>
    //         <div className="c-body">
    //           <div className="c-body-box">
    //             {/* <!-- 조회하기 버튼에 active 클래스 추가시 색상변경 --> */}
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo1.png" alt="" />
    //               <form action="">
    //                 <input name="id" type="text" placeholder="ID" onChange={onChange} value={id} />
    //                 <input name="pw" type="password" className="main-password" placeholder="PW" onChange={onChange} value={pw} />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button onClick={lookUp}>조회하기</button>
    //               <button onClick={signing}>선정산받기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo2.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo3.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo4.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo5.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo6.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo7.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //             <div className="check-box">
    //               <img src="../assets/images/main/c-check-logo/c-check-logo8.png" alt="" />
    //               <form action="">
    //                 <input type="text" placeholder="ID" />
    //                 <input type="password" className="main-password" placeholder="PW" />
    //                 <div className="eyes"></div>
    //               </form>
    //               <button>조회하기</button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </main>
    <main className="container">
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
                    <strong className="strong">{price}</strong>
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
                    <input name="pw" className="check-box-input check-box-input-pw" type="password" placeholder="PW" onChange={onChange} value={pw} />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn" onClick={lookUp}>
                    조회하기
                  </button>
                  <button className="check-box-btn" onClick={signing}>
                    선정산받기
                  </button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo2.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo3.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo4.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo5.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo6.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo7.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
                <div className="check-box">
                  <img className="check-box-img" src="../assets/images/main/c-check-logo/c-check-logo8.png" alt="" />
                  <form className="check-box-form" action="">
                    <input className="check-box-input check-box-input-id" type="text" placeholder="ID" />
                    <input className="check-box-input check-box-input-pw" type="password" placeholder="PW" />
                    <div className="eyes"></div>
                  </form>
                  <button className="check-box-btn">조회하기</button>
                </div>
              </div>
            </div>
            <button className="c-button">
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
