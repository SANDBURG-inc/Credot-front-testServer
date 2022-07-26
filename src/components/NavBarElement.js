import React from "react";
import { Container, Nav, Navbar, NavDropdown, Col } from "react-bootstrap";

const NavBarElement = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={require("../img/credot_logo.png")} height="40"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Service">서비스 이용</Nav.Link>
            <NavDropdown title="서비스 소개" id="basic-nav-dropdown">
              <NavDropdown.Item href="/About">서비스 소개</NavDropdown.Item>
              <NavDropdown.Item href="/Guide">서비스 가이드</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="공지사항" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Notice">공지사항</NavDropdown.Item>
              <NavDropdown.Item href="/Media">언론 속 크레닷</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="고객센터" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Faq">자주하는 질문</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link href="/Login">로그인</Nav.Link>
          <Nav.Link href="/Register">회원가입</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarElement;
