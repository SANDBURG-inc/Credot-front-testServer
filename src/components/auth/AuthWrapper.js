import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow } from "./../../lib/styleUtils";

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
  position: absolute;
  height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 너비, 설정
const ShadowedBox = styled.div`
  width: 500px;
  ${shadow(2)}
`;

// 로고
const LogoWrapper = styled.div`
  background: ${oc.orange[7]};
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  color: white;
  font-family: "Rajdhani";
  font-size: 2.4rem;
  letter-spacing: 5px;
  text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
  overflow: auto;
  background: white;
  padding: 2rem;
`;

const AuthWrapper = ({ children }) => (
  <Positioner>
    <ShadowedBox>
      <LogoWrapper>
        <Logo>credot</Logo>
      </LogoWrapper>
      <Contents>{children}</Contents>
    </ShadowedBox>
  </Positioner>
);

export default AuthWrapper;
