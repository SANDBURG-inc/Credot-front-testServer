import React, { useEffect } from "react";
import "../assets/css/customer-inquiry.css";

const Inquiry = () => {
  useEffect(() => {
    return () => {
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
      document.querySelector(".header").classList.add("this-page-c");
    };
  });

  return (
    <main class="container">
      <div class="inner">
        <section class="section-wrap introduce-wrap guide-wrap">
          <div class="inner">
            <div class="n-head">
              <span class="head-title">고객센터</span>
              <div class="head-link">
                <a class="head-link-a" href="/Faq">
                  자주하는 질문
                </a>
                <a class="head-link-a active" href="/Inquiry">
                  1:1 문의하기
                </a>
              </div>
            </div>
            <div class="n-body">
              <form class="n-body-form" action="">
                <div class="input-box">
                  <span class="input-box-span">성함</span>
                  <input class="input-box-input" type="text" />
                </div>
                <div class="input-box">
                  <span class="input-box-span">이메일</span>
                  <input class="input-box-input" type="text" />
                </div>
                <div class="input-box">
                  <span class="input-box-span">연락처</span>
                  <input class="input-box-input" type="text" />
                </div>
                <div class="input-box">
                  <span class="input-box-span">문의내용</span>
                  <textarea class="input-box-textarea" name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="button-wrap">
                  <button class="form-btn">
                    문의하기
                    <img class="form-btn-img" src="../assets/images/subpage-customer/i-button.svg" alt="" />
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
