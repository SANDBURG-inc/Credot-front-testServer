import styled from "styled-components";

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
  display: "block";
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ProgressCircleDialog = (props) => {
  const { open } = props;

  return (
    <>
      {open ? (
        <ModalWrapper>
          <ModalOverlay>
            <div
              style={{
                width: "200px",
                height: "200px",
                padding: "-5px",
                backgroundColor: "#ffffff",
                border: "0px solid black",
                borderRadius: "50%",
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
                margin: "0 auto",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", display: "block", margin: "auto", padding: "0px", borderRadius: "50%" }}
                src={require("../img/loading.gif")}
              />
            </div>
          </ModalOverlay>
        </ModalWrapper>
      ) : null}
    </>
  );
};

export default ProgressCircleDialog;
