import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";


let currentPath = ""; // 현재 경로 저장 변수

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

  // 마이페이지 드롭메뉴 세부설정 - 바깥 누르거나 내부 요소 누르면 드롭메뉴 없애기 (~46line)
  const dropMenuRef = useRef();
  const [dropMenuOpen, setDropMenuOpen] = useState(false);  // 드롭메뉴의 state

  const handleToggleOption = () => setDropMenuOpen((prev) => !prev);  // 드롭메뉴 state 변경 함수

  const handleClickOutSide = (e) => {   // 드롭메뉴 이외 영역을 누르면 드롭메뉴 state 바꿔줌
    if (dropMenuOpen && !dropMenuRef.current.contains(e.target)){
      setDropMenuOpen((prev) => !prev);
    }
  };

  const DropMenu = () => {
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutSide)    // 드롭메뉴가 켜지면 handleClickOutside함수에 이벤트 전달
      return () => {
        document.removeEventListener('mousedown', handleClickOutSide) // 메모리 제거
      }
    }, []);
    return (  // 드롭메뉴 div 리턴
    <>
      <div className="profile-dropmenu" onClick={handleToggleOption}>
        <Link to="/Mypage"> 내 정보 </Link>
        <Link to="/Finance">정산현황</Link>
      </div>
    </>)
  }
  
  useEffect(() => {
    // 모바일 버거메뉴 클릭이벤트
    document.querySelector(".burger-menu").addEventListener('click', function () {
      document.querySelector(".mo-menu-wrap").classList.add("mo-open");
    });

    document.querySelector(".mo-close").addEventListener('click', function () {
      document.querySelector(".mo-menu-wrap").classList.remove("mo-open");
    });

    document.querySelector(".mo-blank").addEventListener('click', function () {
      document.querySelector(".mo-menu-wrap").classList.remove("mo-open");
    });

    document.querySelector(".mo-menu-wrap .header-menu-wrap").addEventListener('click', function () {
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

  // 네브바 dom 사이 이동시 세부 컨트롤
  const location = useLocation(); // 현재 url을 받아서 저장

  useEffect(() => {
    if (currentPath === location.pathname){ // 같은 경로 -> 같은 경로 : 최상단으로 스크롤
        window.scrollTo({top : 0, behavior : "smooth"});
    }
    else{
      if (currentPath === '/Service' && location.pathname === '/')  // 서비스 -> 홈 : 최상단으로 스크롤
        window.scrollTo({top : 0, behavior : "smooth"});
      else if (location.pathname !== '/Service')  // 목적지가 서비스가 아니면 최상단으로 이동, 목적지가 서비스이면 Service.js에서 컨트롤
        window.scrollTo(0, 0);
    } 
    
    currentPath = location.pathname;  // currentPath 재설정
  }, [location]); // location이 바뀔 때마다 실행


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
            <div className="account-login" ref={dropMenuRef}>
              <button className="profile-btn" onClick={handleToggleOption}>
                <img className="profile-btn-img" src="../assets/images/icon/account-default.svg" alt="" />
                <span className="account-name">{tmpName}님</span>
              </button>
              {dropMenuOpen ? <DropMenu/> : null}
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
