import React, { useEffect, useState, useRef } from "react";
import "../assets/css/customer-qna.css";
import { HOST } from "../redux/store";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Faq = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch("https://cms.credot.kr/api/faqs").then((res) => res.json());
    console.log(res.data);
    setData(res.data);
    for (var i = 0; i < res.data.length; i++) {
      console.log(res.data[i].attributes);
    }
  };

  useEffect(() => {
    console.log("현재 데이터 출력합니다.");
    console.log(data);
  }, [data]);

  const render = (data) => {
    var push = [];

    for (var i = 0; i < data.length; i++) {
      push.push(renderInfo(data[i].attributes.title, data[i].attributes.contents, data[i].attributes.date));
    }
    return push;
  };

  const renderInfo = (title, contents, date) => {
    return (
      <div key={title} className="n-table-box">
        <div className="n-table-board">
          <span className="n-table-board-span1">{title}</span>
          <div className="board-date">
            <span className="board-date-span1 font-eng">{date}</span>
            <button className="board-date-arrow-wrap">
              <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="n-board-lead">
          <span className="n-board-lead-span">
            <div dangerouslySetInnerHTML={{ __html: contents }}></div>
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []); // 빈 배열을 조건으로 줘야 Mount 시점에 적용.
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
    document.querySelector(".header").classList.remove("this-page-s__i");
    document.querySelector(".header").classList.remove("this-page-n");
    document.querySelector(".header").classList.add("this-page-c");

    return () => {};
  });

  return (
    <main className="container">
      <Helmet>
        <title>자주하는 질문 - 크레닷</title>
      </Helmet>
      <div className="inner">
        <section className="section-wrap introduce-wrap guide-wrap">
          <div className="inner">
            <div className="n-head">
              <span className="head-title">고객센터</span>
              <div className="head-link">
                <Link className="head-link-a active" to="/Faq">
                  자주하는 질문
                </Link>
                <Link className="head-link-a" to="/Inquiry">
                  1:1 문의하기
                </Link>
              </div>
            </div>
            <div className="n-body">
              <div className="n-table-wrap">{render(data)}</div>
              <button className="more-btn">
                더보기 +<img src="../" alt="" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Faq;
