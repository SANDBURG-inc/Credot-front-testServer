import React, { useEffect, useState, useRef } from "react";
import "../assets/css/notice-news.css";
import { HOST } from "../redux/store";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Media = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch("https://cms.credot.kr/api/media").then((res) => res.json());
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
      push.push(renderInfo(data[i].attributes.title, data[i].attributes.img, data[i].attributes.contents, data[i].attributes.date));
    }
    return push;
  };

  const renderInfo = (title, img, contents, date) => {
    return (
      <div key={title} className="news-box">
        <img className="box-l" src={img} alt="" />
        {/* <img className="box-l" src="../assets/images/subpage-notice/news1.png" alt="" /> */}
        <div className="box-r">
          <div className="box-r-top">
            <span className="news-title">{title}</span>
            <button className="table-arrow-wrap">
              <img src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
            </button>
          </div>
          <div className="box-r-bottom">
            <div className="news-lead" dangerouslySetInnerHTML={{ __html: contents }}></div>
            <span className="news-date font-eng">{date}</span>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    getData();
  }, []); // 빈 배열을 조건으로 줘야 Mount 시점에 적용.
  useEffect(() => {
    let tableBox = document.querySelectorAll(".box-r-top");
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
    document.querySelector(".header").classList.remove("this-page-c");
    document.querySelector(".header").classList.add("this-page-n");
    return () => {};
  });
  return (
    <main className="container">
      <Helmet>
        <title>언론속의 크레닷 - 크레닷</title>
      </Helmet>
      <div className="inner">
        <section className="section-wrap introduce-wrap guide-wrap">
          <div className="inner">
            <div className="n-head">
              <span className="head-title">공지사항</span>
              <div className="head-link">
                <Link className="head-link-a" to="/Notice">
                  공지사항
                </Link>
                <Link className="head-link-a active" to="/Media">
                  언론속의 크레닷
                </Link>
              </div>
            </div>
            <div className="n-body">
              <div className="n-table-wrap">{render(data)}</div>
              <div className="pagination-wrap">
                <div className="pagination">
                  <button className="pagination-btn pagination-btn-l">
                    <img className="pagination-btn-arrow" src="../assets/images/subpage-my_page/pagination-l.svg" alt="" />
                  </button>
                  <button className="pagination-btn font-eng active">1</button>
                  <button className="pagination-btn font-eng">2</button>
                  <button className="pagination-btn font-eng">3</button>
                  <button className="pagination-btn font-eng">4</button>
                  <button className="pagination-btn font-eng">5</button>
                  <button className="pagination-btn font-eng">6</button>
                  <button className="pagination-btn pagination-btn-r">
                    <img className="pagination-btn-arrow" src="../assets/images/subpage-my_page/pagination-r.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Media;
