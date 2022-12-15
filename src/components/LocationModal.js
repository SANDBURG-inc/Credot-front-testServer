import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const ModalOverlay = styled.div`
  box-sizing: border-box;
  justify-content: center;
  display: flex;
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
  position: relative;
  margin: auto;
  width: 500px;
  height: 400px;
  background-color: white;
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 0px;
  }
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
    props.setData(fullAddress);
    props.businessLocComponent.current.style.fontSize = "12px";
    props.close();
  };

  const clickOutside = () => {
    props.close();
  };

  return (
    <>
      {props.open ? (
        <ModalOverlay onClick={clickOutside}>
          <Modal>
            <DaumPostcode autoClose onComplete={complete}></DaumPostcode>
          </Modal>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default LocationModal;
