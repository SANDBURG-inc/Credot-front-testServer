import React, { useEffect, useState } from "react";
import "./SecurityModal.css";
import securityProgress from "../../assets/images/icon_modal/securityProgress.png";
import securityCompleted from "../../assets/images/icon_modal/securityCompleted.png";
import { Rings } from "react-loader-spinner";

const SecurityModal = (props) => {
  const { open } = props;
  const [progress, setProgress] = useState(true);

  const changeAfterSeconds = () => {
    setTimeout(async () => {
      setProgress(false);
    }, 6000);
  };

  useEffect(() => {
    setProgress(true);
    changeAfterSeconds();
  }, []);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <>
          <main>
            {progress ? (
              <>
                <div className="securityProgressWrapper">
                  <img className="securityProgress" src={securityProgress} />
                  <div>
                    <div>
                      <text>보안 모듈 실행 중</text>
                    </div>
                    <Rings color="orange" height={30} width={30} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="securityCompletedWrapper">
                  <img className="securityCompleted" src={securityCompleted} />
                  <div>
                    <progress max="100" width="283px"></progress>
                  </div>
                  <div>
                    <text>커머스 정보 확인 중 . . .</text>
                  </div>
                </div>
              </>
            )}
          </main>
        </>
      ) : null}
    </div>
  );
};

export default SecurityModal;
