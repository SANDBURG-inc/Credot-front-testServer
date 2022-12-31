import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/login.css";
import styles from "../assets/css/register.module.css";

const ForgotID = () => {
  const [phoneNum, setPhoneNum] = useState("");

  const handlePhoneNum = (e) => {
    setPhoneNum(e.target.value);
  }

  return (
    <main className="container">
    <Helmet>
      <title>아이디 찾기 - 크레닷</title>
      <meta name="description" content="셀러들의 선정산 서비스 크레닷(Cre.) - 아이디 찾기" />
      <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
    </Helmet>
    <div className="inner">
      <section className="section-wrap introduce-wrap">
        <div className="inner">
          <div className="i-head">
            <span className="head-title font-eng">아이디 찾기</span>
          </div>
          <div className="i-body">
            <div className="form-wrap">
              <div className="form">
                <div className="inner__sec">
                  <span className="sec__head font-eng">휴대폰으로 아이디 찾기</span>
                  <div className={styles.registerBusinessInputWrap}>
                    <input
                      className={styles.registerInputBusiness}
                      type="text"
                      placeholder="휴대폰 번호를 입력해주세요"
                      name="phoneNum"
                      onChange={handlePhoneNum}
                    />
                    <button
                      className={`${styles.registerCheckBusinessbtn} ${styles.active}`}
                      type="button"
                    >인증하기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </main>
  )
}


export default ForgotID;