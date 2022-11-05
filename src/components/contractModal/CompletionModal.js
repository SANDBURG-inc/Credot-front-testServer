import React from "react";
import "./ContractModal";

const CompletionModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, contractClose, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal contractModal" : "contractModal"}>
      {open ? (
        <section style={{ height: "fit-content" }}>
          <header>
            {header}
            <button
              className="close"
              onClick={() => {
                close();
                contractClose();
              }}
            >
              &times;
            </button>
          </header>
          <main>
            <h3>작성 완료</h3>
            <h2>
              서명이 완료되었습니다. <br /> 크레닷 선정산 서비스를 이용해주셔서 감사합니다.
            </h2>
          </main>
          <footer>
            <button
              className="close"
              onClick={() => {
                close();
                contractClose();
              }}
            >
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default CompletionModal;
