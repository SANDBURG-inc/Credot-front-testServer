import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBarElement = () => {
  let a = useSelector((state) => state.login);
  const tmpName = useSelector((state) => state.info.name);

  const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
    if (ScrollY > 0) {
      document.querySelector(".header__inner").classList.add("blur");
    } else {
      document.querySelector(".header__inner").classList.remove("blur");
    }
  };

  useEffect(() => {
    //프로필 버튼 클릭스 마이페이지 드랍메뉴
    document.querySelector(".profile-btn").addEventListener("click", function () {
      this.parentNode.classList.toggle("active");
    });
    // 모바일 버거메뉴 클릭이벤트
    document.querySelector(".burger-menu").addEventListener("click", function () {
      document.querySelector(".mo-menu-wrap").classList.add("mo-open");
    });

    document.querySelector(".mo-close").addEventListener("click", function () {
      document.querySelector(".mo-menu-wrap").classList.remove("mo-open");
    });

    document.querySelector(".mo-blank").addEventListener("click", function () {
      document.querySelector(".mo-menu-wrap").classList.remove("mo-open");
    });
  }, []);

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <h1 className="logo">
            <Link to="/">
              <img src="../assets/images/logo/logo.png" alt="logo" />
            </Link>
          </h1>
          <div className="header-menu-wrap">
            <Link className="header-menu-menu menu-service__use" to="/Service">
              서비스 이용
            </Link>
            <Link className="header-menu-menu menu-service__intro" to="/About">
              서비스 소개
            </Link>
            <Link className="header-menu-menu menu-notice" to="/Notice">
              공지사항
            </Link>
            <Link className="header-menu-menu menu-customer" to="/Faq">
              고객센터
            </Link>
          </div>
          {/* <!-- header-account-wrap 클래스에 logined 추가시 로그인 상태 --> */}
          <div className={a === false ? "header-account-wrap" : "header-account-wrap logined"}>
            {/* <!-- 비로그인 상태 --> */}
            <div className="account-not_login">
              <Link className="header-account-wrap-a" to="/Login">
                {" "}
                로그인{" "}
              </Link>
              <div className="devide-bar"></div>
              <Link className="header-account-wrap-a" to="/Register">
                {" "}
                회원가입{" "}
              </Link>
            </div>

            {/* <!-- 로그인 상태 --> */}
            <div className="account-login">
              <button className="profile-btn">
                <img className="profile-btn-img" src="../assets/images/icon/account-default.svg" alt="" />
                <span className="account-name">{tmpName}님</span>
              </button>
              <div className="profile-dropmenu">
                <Link to="/Mypage"> 내 정보 </Link>
                <Link to="/Finance">정산현황</Link>
              </div>
            </div>
            <div className="burger-menu">
              <img src="../assets/images/icon/mo-burger.svg" alt="" />
            </div>
          </div>
        </div>
      </header>
      {/*  <!-- 모바일메뉴 --> */}
      <div className="mo-menu-wrap">
        <div className="mo-blank"></div>
        <div className="mo-menu">
          <button className="mo-close">
            <img src="../assets/images/icon/mo-close.svg" alt="" />
          </button>
          <span className="mo-menu-span font-eng">MENU</span>
          <div className="header-menu-wrap">
            <Link className="mo-menu-menu menu-service__use" to="/Service">
              서비스 이용
            </Link>
            <Link className="mo-menu-menu menu-service__intro" to="/About">
              서비스 소개
            </Link>
            <Link className="mo-menu-menu menu-notice" to="/Notice">
              공지사항
            </Link>
            <Link className="mo-menu-menu menu-customer" to="/Faq">
              고객센터
            </Link>
          </div>
          {/* <!-- header-account-wrap 클래스에 logined 추가시 로그인 상태 --> */}
          <div className={a === false ? "header-account-wrap" : "header-account-wrap logined"}>
            {/* <!-- 비로그인 상태 --> */}
            <div className="account-not_login">
              <Link to="/Login"> 로그인 </Link>
              <div className="devide-bar"></div>
              <Link to="/Register"> 회원가입 </Link>
            </div>

            {/* <!-- 로그인 상태 --> */}
            <div className="account-login">
              <Link className="header-account-wrap-a" to="/Mypage">
                {" "}
                내 정보{" "}
              </Link>
              <div className="devide-bar"></div>
              <Link className="header-account-wrap-a" to="/Finance">
                {" "}
                정산 현황{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarElement;
