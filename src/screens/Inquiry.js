import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../assets/css/customer-inquiry.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Inquiry = () => {
  useEffect(() => {
    let tableBox = document.querySelectorAll(".n-table-board");
    for (let i = 0; i < tableBox.length; i++) {
      tableBox[i].addEventListener("click", function () {
        if (this.parentNode.classList.contains("is-opened")) {
          this.parentNode.classList.remove("is-opened");
        } else {
          let current = document.getElementsByClassName("is-opened");
          if (current.length > 0) {
            current[0].className = current[0].className.replace(" is-opened", "");
          }
          this.parentNode.className += " is-opened";
        }
      });
    }
    document.querySelector(".header").classList.remove("this-page-n");
    document.querySelector(".header").classList.remove("this-page-s__i");
    document.querySelector(".header").classList.add("this-page-c");
    return () => {};
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_8h1pn0j", "template_kil80le", e.target, "CC6tKIfGeDYkzejKg").then(
      (response) => {
        alert("1:1 문의가 접수되었습니다.");
        window.location.reload();
        // setStatus('success');
      },
      (error) => {
        alert("문의 접수에 실패하였습니다.");
        // setStatus('fail');
      }
    );
  };

  return (
    <main className="container">
      <Helmet>
        <title>1:1 문의 - 크레닷</title>
        <meta name="description" content="셀러들의 선정산 서비스 크레닷(Cre.) - 1:1 문의" />
        <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
      </Helmet>
      <div className="inner">
        <section className="section-wrap introduce-wrap guide-wrap">
          <div className="inner">
            <div className="n-head">
              <span className="head-title">고객센터</span>
              <div className="head-link">
                <Link className="head-link-a" to="/Faq">
                  자주하는 질문
                </Link>
                <Link className="head-link-a active" to="/Inquiry">
                  1:1 문의하기
                </Link>
              </div>
            </div>
            <div className="n-body">
              <form className="n-body-form" onSubmit={sendEmail}>
                <div className="input-box">
                  <span className="input-box-span">성함</span>
                  <input className="input-box-input" type="text" name="name" />
                </div>
                <div className="input-box">
                  <span className="input-box-span">이메일</span>
                  <input className="input-box-input" type="text" name="email" />
                </div>
                <div className="input-box">
                  <span className="input-box-span">연락처</span>
                  <input className="input-box-input" type="text" name="phone" />
                </div>
                <div className="input-box">
                  <span className="input-box-span">문의내용</span>
                  <textarea className="input-box-textarea" name="message" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="button-wrap">
                  <button className="form-btn">
                    문의하기
                    <img className="form-btn-img" src="../assets/images/subpage-customer/i-button.svg" alt="" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Inquiry;
