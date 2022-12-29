import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../assets/css/login.css";
import styles from "../assets/css/register.module.css";

const ForgotPW = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  return (
    <main className="container">
      <Helmet>
        <title>비밀번호 찾기 - 크레닷</title>
        <meta name="description" content="셀러들의 선정산 서비스 크레닷(Cre.) - 비밀번호 찾기" />
        <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
      </Helmet>
      <div className="inner">
        <section className="section-wrap introduce-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title font-eng">비밀번호 찾기</span>
            </div>
            <div className="i-body">
              <div className="form-wrap">
                <div className="form">
                  {emailSent ? (
                    <>
                      <span className="sec__head font-eng">{inputEmail}로 비밀번호 재설정 링크를 보냈습니다!</span>
                      <span className="sec__head font-eng" style={{ fontWeight: "normal" }}>
                        <p>1. 링크로 클릭해서 새로운 비밀번호를 설정해주세요.</p>
                        <br />
                        <p>2. 변경하신 비밀번호로 다시 로그인 해주세요.</p>
                      </span>
                      <button className={styles.loginBtn}>
                        <Link to="/Login" style={{ color: "white" }}>
                          완료
                        </Link>
                      </button>
                    </>
                  ) : (
                    <div className="inner__sec">
                      <span className="sec__head font-eng">이메일로 비밀번호 찾기</span>
                      <div className={styles.registerInputWithBtnWrap}>
                        <input
                          className={styles.registerInputWithBtn}
                          type="text"
                          placeholder="이메일을 입력해주세요."
                          name="inputEmail"
                          onChange={handleInputEmail}
                        />
                        <button
                          className={`${styles.registerCheckbtn} ${styles.active}`}
                          type="submit"
                          onClick={async () => {
                            console.log("button clicked");
                            if (!inputEmail.includes("@")) {
                              alert("이메일 형식을 올바르게 입력해주세요!");
                              return;
                            }

                            fetch("https://cms.credot.kr/api/email-valid/" + inputEmail)
                              .then((res) => res.json())
                              .then((res) => {
                                console.log(res.isDuplicate);
                                if (!res.isDuplicate) {
                                  alert("등록되지 않은 이메일입니다.");
                                  return;
                                } else {
                                  axios
                                    .post("http://cms.credot.kr/api/auth/forgot-password", {
                                      email: inputEmail,
                                    })
                                    .then((response) => {
                                      setEmailSent(true);
                                    })
                                    .catch((error) => {
                                      console.log("An error occured: ", error.response);
                                    });
                                }
                              });
                          }}
                        >
                          인증하기
                        </button>
                      </div>
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

export default ForgotPW;
