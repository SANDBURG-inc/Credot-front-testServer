import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: "block";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  justify-content: center;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1001;
`;

const Modal = styled.div`
  display: block;
  position: fixed;
  top: 22%;
  left: 35%;
  width: 500px;
  height: 400px;
  background-color: white;
`;

const LocationModal = (props) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(fullAddress);
    props.setData(fullAddress);
    props.close();
    props.showHiddenInput();
  };

  const clickOutside = () => {
    props.close();
  };

  return (
    <>
      {props.open ? (
        <ModalWrapper onClick={clickOutside}>
          <ModalOverlay>
            <Modal>
              <DaumPostcode autoClose onComplete={complete}></DaumPostcode>
            </Modal>
          </ModalOverlay>
        </ModalWrapper>
      ) : null}
    </>
  );
};

export default LocationModal;
