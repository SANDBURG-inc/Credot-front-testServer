import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

let Text = styled.p`
  color: #ec5f2c;
  padding: 10px;
  font-weight: bold;
`;

let OrangeContainer = styled.div`
  background-color: #ec5f2c;
  padding: 10px;
  border: solid black;
  border-width: 1px 0px 1px 0px;
  margin-bottom: 40px;
`;

let OrangeRoundContainer = styled.div`
  background-color: rgba(236, 95, 44, 0.14);
  padding: 40px;
  border-radius: 1em;
  margin: 30px;
`;

let LookupCard = styled.div`
  padding: 20px;
  border-radius: 1rem;
  background: #ffffff;
`;

const Service = () => {
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const [result, setResult] = useState(0);

  const { id, pw } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(id);
    console.log(pw);
  };

  const lookUp = () => {
    console.log("조회 클릭");
    if (id && pw) {
      console.log("fetch");
      fetch("http://3.38.232.237:9000/coupang?id=" + id + "&pw=" + pw)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("400아니면 500에러남");
          }
          return response.text();
        })
        .then((결과) => {
          console.log("결과");
          if (결과 == "idpwError") {
            alert(결과);
            return;
          } else if (결과 == "auth") {
            const inputString = prompt("인증번호를 입력해주세요", "인증번호");
            if (inputString != "") {
              fetch("http://3.38.232.237:9000/coupangcode?code=" + inputString)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("400아니면 500에러남");
                  }
                  return response.text();
                })
                .then((결과) => {
                  if (결과 == "authError") {
                    alert("인증번호 오류입니다");
                    return;
                  }
                  var result = 결과;
                  setResult(JSON.parse(result).price);
                  alert(result);
                });
            }
            return;
          } else {
            let result = 결과;
            setResult(JSON.parse(result).price);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("조회 실패... 아이디와 비번을 확인해주세요");
        });
    } else {
      alert("값을 모두 입력해주세요");
    }
  };

  return (
    <Container>
      <Row>
        <Col style={{ padding: "100px" }}>
          <h4>크레닷으로 쉽고 빠른 판매대금 정산!</h4>
          <Text>
            지금 바로 이용중인 커머스 <br />
            판매자 정보를 입력하고
            <br />
            즉시 정산 가능한 금액을 조회해보세요!
          </Text>
        </Col>
        <Col
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            <h3>hook test</h3>

            <h3>hook test</h3>

            <h3>hook test</h3>
          </div>
        </Col>
      </Row>
      <OrangeContainer>
        <h3
          style={{
            color: "white",
          }}
        >
          지금 즉시 정산 가능한 금액을 조회해보세요!
        </h3>
        <p
          style={{
            color: "white",
          }}
        >
          {"즉시 정산 가능 금액 " + result + " 원"}
        </p>
      </OrangeContainer>

      <OrangeRoundContainer>
        <Row>
          <Col>
            <LookupCard>
              <img src={require("../img/coupang_wing.png")} height="20"></img>
              <div style={{ padding: "20px 0px" }}>
                <input
                  name="id"
                  placeholder="ID"
                  onChange={onChange}
                  value={id}
                />
                <input
                  name="pw"
                  placeholder="PW"
                  onChange={onChange}
                  value={pw}
                />
              </div>
              <button onClick={lookUp}>조회</button>
            </LookupCard>
          </Col>
          <Col>
            <LookupCard>
              <img src={require("../img/coupang_wing.png")} height="20"></img>
              <div style={{ padding: "20px 0px" }}>
                <input placeholder="ID" />
                <input placeholder="PW" />
              </div>
              <button onClick={lookUp}>조회</button>
            </LookupCard>
          </Col>
          <Col>
            <LookupCard>
              <img src={require("../img/coupang_wing.png")} height="20"></img>
              <div style={{ padding: "20px 0px" }}>
                <input placeholder="ID" />
                <input placeholder="PW" />
              </div>
              <button onClick={lookUp}>조회</button>
            </LookupCard>
          </Col>
          <Col>
            <LookupCard>
              <img src={require("../img/coupang_wing.png")} height="20"></img>
              <div style={{ padding: "20px 0px" }}>
                <input placeholder="ID" />
                <input placeholder="PW" />
              </div>
              <button onClick={lookUp}>조회</button>
            </LookupCard>
          </Col>
        </Row>
      </OrangeRoundContainer>
    </Container>
  );
};

export default Service;
