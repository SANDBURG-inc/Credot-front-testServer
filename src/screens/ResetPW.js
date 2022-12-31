import React, { useState, useEffect, useRef } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { HOST } from "../redux/store";
import { Helmet } from "react-helmet";
import LocationModal from "../components/LocationModal";
import axios from "axios";
import styles from "../assets/css/register.module.css";
import { textChangeRangeIsUnchanged } from "typescript";
const ResetPW = () => {
  const [parameters, setParameters] = useSearchParams();
  const code = parameters.get("code");

  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordValidationFlag, setPasswordValidationFlag] = useState(false);
  const [pwEqual, setPwEqual] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (password.length > 5) {
      setPasswordValidationFlag(true);
      if (password === checkPassword) setPwEqual(true);
      else setPwEqual(false);
    } else {
      setPasswordValidationFlag(false);
      setPwEqual(false);
    }
  }, [password, checkPassword]);

  const changePassword = () => {
    console.log(code);
    if (passwordValidationFlag && pwEqual) {
      axios
        .post("http://cms.credot.kr/api/auth/reset-password", {
          code: code,
          password: password,
          passwordConfirmation: checkPassword,
        })
        .then((response) => {
          setChangeSuccess(true);
        })
        .catch((error) => {
          console.log("An error occured:", error.response);
        });
    }
  };

  return (
    <main className="container">
      <Helmet>
        <title>비밀번호 재설정 - 크레닷</title>
        <meta name="description" content="셀러들의 선정산 서비스 크레닷(Cre.) - 비밀번호 재설정" />
        <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
      </Helmet>
      <div className="inner">
        <section className="section-wrap introduce-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">비밀번호 재설정</span>
            </div>
            <div className="i-body">
              <div className="form-wrap">
                <div className="form">
                  {changeSuccess ? (
                    <>
                      <span className="sec__head font-eng">비밀번호 재설정이 완료되었습니다.</span>
                      <button
                        className={styles.loginBtn}
                        style={{ color: "white" }}
                        onClick={() => {
                          window.close();
                        }}
                      >
                        닫기
                      </button>
                    </>
                  ) : (
                    <div className="inner__sec">
                      <div className={styles.registerInnerSec}>
                        <span className={styles.registerSecHead}>비밀번호 재설정</span>
                      </div>
                      <div className={styles.registerInputWrap}>
                        <div className={styles.registerPasswordWrap}>
                          <input
                            type={passwordShown ? "text" : "password"}
                            className={styles.inputPassword}
                            placeholder="비밀번호를 입력해주세요"
                            name="password"
                            onChange={handlePassword}
                          />
                          <div onClick={togglePassword} className={passwordShown ? styles.rEyes : `${styles.rEyes} ${styles.visible}`}></div>
                        </div>
                        <div className={pwEqual ? `${styles.registerPasswordWrap} ${styles.passwordCheckInput}` : styles.registerPasswordWrap}>
                          <input type="password" placeholder="비밀번호를 확인해주세요" name="password" onChange={handleCheckPassword} />
                        </div>
                      </div>
                      {passwordValidationFlag ? null : <div className={styles.errorMessage}>비밀번호는 6자 이상이어야 합니다.</div>}
                      <button className={styles.loginBtn} style={{ marginTop: "50px" }} type="button" onClick={changePassword}>
                        비밀번호 변경하기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResetPW;
