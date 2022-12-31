import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./ContractModal.css";

const Contract = (props) => {
  const { amount, deadline } = props;

  let userInfo = useSelector((state) => state.info);
  let incInfo = useSelector((state) => state.incInfo);

  const [contractData, setContractData] = useState({
    __CREDITOR__: "__CREDITOR__",
    __AMOUNT__: "__AMOUNT__",
    __DATE__: "__DATE__",
    __DEADLINE__: "__DEADLINE__",
    __CORPORATE__: "__CORPORATE__",
    __NAME__: "__NAME__",
    __ADDRESS__: "__ADDRESS__",
    __PHONE__: "__PHONE__",
  });

  const sandburgData = {
    __CORPORATE__: "주식회사 샌드버그",
    __NAME__: "배호진",
    __ADDRESS__: "부산광역시 금정구 부산대학로63번길 2, 306호 (효원산학협동관)",
    __PHONE__: "010-2413-4498",
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();

    let copy = { ...contractData };
    copy.__CREDITOR__ = userInfo.realName;
    copy.__AMOUNT__ = amount;
    copy.__DATE__ = year + ". " + todayMonth + ". " + todayDate + ".";
    copy.__DEADLINE__ = deadline;
    copy.__CORPORATE__ = incInfo.corporateName;
    copy.__NAME__ = incInfo.ceo;
    copy.__ADDRESS__ = incInfo.businessLoc;
    copy.__PHONE__ = userInfo.phoneNum;

    setContractData(copy);
  }, []);

  return (
    <div className="Container">
      <h2 style={{ textAlign: "center" }}>
        <strong>채권양수도 계약서</strong>
      </h2>
      <p>
        <br />
      </p>
      <p style={{ padding: "0 0 5px 0" }}>
        <strong>제1조(계약의 이행)</strong>
      </p>
      <p />
      <p style={{ paddingLeft: 13 }}>
        채권자 <span className="showText">{contractData.__CREDITOR__}</span>
        (이하 '갑'이라 한다)은/는 다음의 채권에 관하여 양수인 <span className="showText">주식회사 샌드버그</span>(이하 '을'이라 한다)와/과 아래와 같이
        채권양수도계약을 체결한다.
      </p>
      <p>
        <br />
      </p>
      <p style={{ padding: "0 0 5px 0" }}>
        <strong>제2조(채권의 내용)</strong>
      </p>
      <p />
      <p style={{ paddingLeft: 13 }}>
        <span
          listtype="circle"
          style={{
            textIndent: "-18px",
            paddingLeft: 18,
            display: "inline-block",
          }}
        >
          ① 채권의 종류: 채무자가 계약서 작성일 현재 '갑'에게 부담하고 있는&nbsp;금전채권
        </span>
      </p>
      <p style={{ paddingLeft: 13 }}>
        <span
          listtype="circle"
          style={{
            textIndent: "-18px",
            paddingLeft: 18,
            display: "inline-block",
          }}
        >
          ② 채권액: 금 <span className="showText">{contractData.__AMOUNT__}</span>원
        </span>
      </p>
      <p style={{ paddingLeft: 13 }}>
        <span
          listtype="circle"
          style={{
            textIndent: "-18px",
            paddingLeft: 18,
            display: "inline-block",
          }}
        >
          ③ 변제일: <span className="showText">{contractData.__DEADLINE__}</span>
        </span>
      </p>
      <p style={{ paddingLeft: 13 }}>
        <span
          listtype="circle"
          style={{
            textIndent: "-18px",
            paddingLeft: 18,
            display: "inline-block",
          }}
        >
          ④ 지연 이자: 변제기에 완납하지 않을 때는, 그 다음 날부터 완납일까지 남은 변제액의 연 <span className="showText">10</span>%의 지연손해배상을
          부가하여 납부하기로 한다.
        </span>
      </p>
      <p style={{ paddingLeft: 13 }}>
        <span
          listtype="circle"
          style={{
            textIndent: "-18px",
            paddingLeft: 18,
            display: "inline-block",
          }}
        >
          ⑤ 채무자(이하 '병'이라 한다)
        </span>
      </p>
      <p style={{ paddingLeft: 26 }}>
        <span
          listtype="dash"
          style={{
            textIndent: "-9px",
            paddingLeft: 9,
            display: "inline-block",
          }}
        >
          - 법인명: <span className="showText">{contractData.__CORPORATE__}</span>
        </span>
      </p>
      <p style={{ paddingLeft: 26 }}>
        <span
          listtype="dash"
          style={{
            textIndent: "-9px",
            paddingLeft: 9,
            display: "inline-block",
          }}
        >
          - 대표이사: <span className="showText">{contractData.__NAME__}</span>
        </span>
      </p>
      <p style={{ paddingLeft: 26 }}>
        <span
          listtype="dash"
          style={{
            textIndent: "-9px",
            paddingLeft: 9,
            display: "inline-block",
          }}
        >
          - 주소: <span className="showText">{contractData.__ADDRESS__}</span>
        </span>
      </p>
      <p style={{ paddingLeft: 26 }}>
        <span
          listtype="dash"
          style={{
            textIndent: "-9px",
            paddingLeft: 9,
            display: "inline-block",
          }}
        >
          - 전화번호: <span className="showText">{contractData.__PHONE__}</span>
        </span>
      </p>
      <p>
        <br />
      </p>
      <p style={{ padding: "0 0 5px 0" }}>
        <strong>제3조(계약위반)</strong>
      </p>
      <p />
      <p style={{ paddingLeft: 13 }}>본 계약을 일방이 위반시 위반자는 위반으로 인하여 발생한 상대방의 모든 손해를 배상한다.</p>
      <p>
        <br />
      </p>
      <p style={{ padding: "0 0 5px 0" }}>
        <strong>제4조(채권 양수도 통지)</strong>
      </p>
      <p />
      <p style={{ paddingLeft: 13 }}>
        '갑'이 '을'에게 채권 양수도에 관한 통지 권한을 위임함에 따라, '을'이 직접 '병'에게 채권 양수도에 관한 통지를 하기로 한다. 만약, '을'이 통지를
        하지 아니함에 따라 발생하는 모든 행위는 '갑'에게 책임을 물을 수 없다.
      </p>
      <p>
        <br />
      </p>
      <p style={{ padding: "0 0 5px 0" }}>
        <strong>제5조(특약)</strong>
      </p>
      <p />
      <p style={{ paddingLeft: 13 }}>
        상기 계약 일반사항 이외에 아래 내용을 특약사항으로 정하며, 일반사항과 특약사항이 상충되는 경우에는 특약사항을 우선하여 적용하도록 한다.
      </p>
      <p style={{ paddingLeft: 26 }}>
        <span
          listtype="dash"
          style={{
            textIndent: "-9px",
            paddingLeft: 9,
            display: "inline-block",
          }}
        >
          - <span className="showText">인수자 외 채권 양도 금지</span>
        </span>
      </p>
      <p>
        <br />
      </p>
      <p>
        <br />
      </p>
      <p>위 계약을 확실히 하기 위하여 본 증서를 작성하여 '갑'·'을'이 서명날인하고 이를 각각 1부씩 보관한다.</p>
      <p style={{ textAlign: "center" }}>
        <br />
      </p>
      <p style={{ textAlign: "center" }}>
        <br />
      </p>
      <p style={{ textAlign: "center" }}>
        <br />
      </p>
      <p style={{ textAlign: "center" }}>
        <strong id="output_25">&nbsp;{contractData.__DATE__}&nbsp;</strong>
      </p>
      <p style={{ textAlign: "center" }}>
        <br />
      </p>
      <p style={{ textAlign: "center" }}>
        <br />
      </p>
      <p>
        <br />
      </p>
      <p>
        <strong id="output_30">채권자</strong>
      </p>
      <p>
        성명: <span className="showText">{contractData.__CREDITOR__}</span> (서명 또는 인)
      </p>
      <p>
        주소: <span className="showText">{contractData.__ADDRESS__}</span>
      </p>
      <p>
        전화번호: <span className="showText">{contractData.__PHONE__}</span>
      </p>
      <p>&nbsp;&nbsp;</p>
      <p>
        <strong>인수자</strong>
      </p>
      <p>
        법인명:&nbsp; <span className="showText">{sandburgData.__CORPORATE__}</span>
      </p>
      <p>
        대표이사: &nbsp; <span className="showText">{sandburgData.__NAME__}</span>(서명 또는 인)
      </p>
      <p>
        주소: <span className="showText">{sandburgData.__ADDRESS__}</span>
      </p>
      <p>
        전화번호:
        <span className="showText"> {sandburgData.__PHONE__} </span>
      </p>
    </div>
  );
};

export default Contract;
