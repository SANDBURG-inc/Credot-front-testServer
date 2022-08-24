import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBarElement = () => {
  let a = useSelector((state) => state.login);

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
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });

  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="logo">
          <a href="/">
            <img src="../assets/images/logo/logo.png" alt="logo" />
          </a>
        </h1>
        <div className="header-menu-wrap">
          <a className="menu-service__use" href="/Service">
            서비스 이용
          </a>
          <a className="menu-service__intro" href="/About">
            서비스 소개
          </a>
          <a className="menu-notice" href="/Notice">
            공지사항
          </a>
          <a className="menu-customer" href="/Faq">
            고객센터
          </a>
        </div>
        <div className={a === false ? "header-account-wrap" : "header-account-wrap logined"}>
          <div>
            <a href="/Login"> 로그인 </a>
            <div className="devide-bar"></div>
            <a href="/Register"> 회원가입 </a>
          </div>
          <div>
            <NavDropdown title="My 크레닷" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Mypage">내 정보</NavDropdown.Item>
              <NavDropdown.Item href="/Finance">정산 현황</NavDropdown.Item>
            </NavDropdown>
            {/* <button>
              <img src="../assets/images/icon/account-default.svg" alt="" />
              <span className="account-name">별별 셀러님</span>
            </button> */}
          </div>
        </div>
      </div>
    </header>
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand href="/">
    //       <img src={require("../img/credot_logo.png")} height="40"></img>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="/Service">서비스 이용</Nav.Link>
    //         <NavDropdown title="서비스 소개" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="/About">서비스 소개</NavDropdown.Item>
    //           <NavDropdown.Item href="/Guide">서비스 가이드</NavDropdown.Item>
    //         </NavDropdown>
    //         <NavDropdown title="공지사항" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="/Notice">공지사항</NavDropdown.Item>
    //           <NavDropdown.Item href="/Media">언론 속 크레닷</NavDropdown.Item>
    //         </NavDropdown>
    //         <NavDropdown title="고객센터" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="/Faq">자주하는 질문</NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //       <Nav>
    //         {a === false ? (
    //           <Nav>
    //             <Nav.Link href="/Login">로그인</Nav.Link>
    //             <Nav.Link href="/Register">회원가입</Nav.Link>
    //           </Nav>
    //         ) : (
    //           <NavDropdown title="My 크레닷" id="basic-nav-dropdown">
    //             <NavDropdown.Item href="/Mypage">내 정보</NavDropdown.Item>
    //             <NavDropdown.Item href="/Finance">정산 현황</NavDropdown.Item>
    //           </NavDropdown>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default NavBarElement;
