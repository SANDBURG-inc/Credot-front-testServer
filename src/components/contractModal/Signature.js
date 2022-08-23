import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";
import { HOST } from "../../redux/store";

const Container = styled.div`
  width: 330px;
  display: inline-block; // flex
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignatureContainer = styled.div`
  width: 330px;
  height: 165px;
  color: rgb(129, 130, 130);
  //border: 2px dashed rgb(223, 222, 221);

  background: rgb(240, 240, 240);
  border: 1px solid rgb(201, 200, 199);
  box-sizing: border-box;
  border-radius: 5px;
`;

const CanvasPlaceholder = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: gray;
`;

const P = styled.p`
  margin: 5px;
  font-family: "Pretendard Regular";
  font-size: 14px;
  letter-spacing: -0.5px;
  color: rgb(112, 212, 115);
`;

const ClearButton = styled.button`
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
  padding: 4px 14px;
  background: rgb(251, 250, 248);
  border-radius: 20px;
`;

// const P = styled.p`
//   position: absolute;
//   top: 15%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: rgb(129, 130, 130);
//   font-size: 14px;
//   display: block;
// `;

const Signature = (props) => {
  const { open, amount, deadline } = props;
  let userInfo = useSelector((state) => state.info);

  const canvasRef = useRef(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [contractData, setContractData] = useState({
    email: "",
    sign: "",
    date: "",
    deadline: "",
    ammount: "",
    commerce: "coupang",
    status: "false",
  });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();

    let copy = { ...contractData };
    copy.email = userInfo.email;
    copy.date = year + ". " + todayMonth + ". " + todayDate + ".";
    copy.deadline = deadline;
    copy.ammount = amount;
    setContractData(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clear = () => {
    canvasRef.current.clear();
  };

  const save = () => {
    const image = canvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    console.log(image.split(",")[1]); //base 64 코드

    let copy = { ...contractData };
    copy.sign = image.split(",")[1];
    setContractData(copy);

    fetch(
      HOST +
        "/database/contract?email=" +
        contractData.email +
        "&sign=" +
        copy.sign +
        "&date=" +
        contractData.date +
        "&deadline=" +
        contractData.deadline +
        "&ammount=" +
        contractData.ammount +
        "&commerce=" +
        contractData.commerce +
        "&status=" +
        contractData.status
    );
    // const link = document.createElement("a");
    // link.href = image;
    // link.download = "sign_image.png";
    // link.click(); // img 다운로드
  };

  return (
    <Container>
      <SignatureContainer>
        {!isSigned && <CanvasPlaceholder>여기에 서명을 해주세요.</CanvasPlaceholder>}
        <SignatureCanvas
          ref={canvasRef}
          canvasProps={{
            className: "signature-canvas",
            width: 330,
            height: 165,
          }}
          onBegin={() => {
            setIsSigned(true);
          }}
          clearOnResize={false}
        />
      </SignatureContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEntered ? <P>서명이 완료되었습니다.</P> : <div></div>}
        <div>
          <ClearButton
            style={{ border: "1px solid rgb(223, 222, 221)" }}
            onClick={() => {
              clear();
              setIsSigned(false);
              setIsEntered(false);
            }}
          >
            clear
          </ClearButton>
          <ClearButton
            style={{
              backgroundColor: "rgb(250, 198, 45)",
              border: "1px solid rgb(250, 198, 45)",
            }}
            onClick={() => {
              if (isSigned) {
                setIsEntered(true);
                open();
                save();
              } else {
                alert("서명을 그려주세요.");
              }
            }}
          >
            입력
          </ClearButton>
        </div>
      </div>
    </Container>
  );
};

export default Signature;
