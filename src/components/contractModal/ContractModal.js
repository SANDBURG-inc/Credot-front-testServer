import React, { useState } from "react";
import Contract from "./Contract";
import Signature from "./Signature";
import "./ContractModal.css";
import CompletionModal from "./CompletionModal";

const ContractModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, amount, deadline } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <>
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <Contract amount={amount} deadline={deadline}></Contract>
              <h3>서명을 입력해주세요. ✍️</h3>
              <Signature open={openModal} amount={amount} deadline={deadline} />
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
          <CompletionModal open={modalOpen} close={closeModal} contractClose={close} header="계약서 작성 완료"></CompletionModal>
        </>
      ) : null}
    </div>
  );
};

export default ContractModal;
