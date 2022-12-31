import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContractModal from "../components/contractModal/ContractModal";
import "../assets/css/index.css";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import MarqueeAnimation from "./../components/Marquee/Marquee";
import CoupangLookUpBox from "../components/Commerce/Coupang";
import CoupangZLookUpBox from "../components/Commerce/CoupangZ";
import CoupangRocketLookUpBox from "../components/Commerce/CoupangRocket";
import TmonLookUpBox from "../components/Commerce/Tmon";
import WeMakePriceLookUpBox from "../components/Commerce/Wemakeprice";
import Location11LookUpBox from "../components/Commerce/Street11";
import GmarketLookUpBox from "../components/Commerce/Gmarket";
import AuctionLookUpBox from "../components/Commerce/Auction";

let currentPath = ""; // 현재 url 주소를 저장하기 위한 변수.

const Service = () => {
  let isLogined = useSelector((state) => state.login);
  let userInfo = useSelector((state) => state.info);

  const token = useSelector((state) => state.jwt);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState(0);

  const [isChecked, setIsChecked] = useState(false);

  // const [active, setActive] = useState([false, false, false, false, false, false, false, false]);

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
            <MarqueeAnimation />
            <button className="visual-scroll-down">
              <img src="../assets/images/main/m-arrow-down.svg" alt="" />
            </button>
          </div>
        </section>
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
                <CoupangLookUpBox />
                <CoupangRocketLookUpBox />
                <CoupangZLookUpBox />
                <TmonLookUpBox />
                <WeMakePriceLookUpBox />
                <Location11LookUpBox />
                <GmarketLookUpBox />
                <AuctionLookUpBox />
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
