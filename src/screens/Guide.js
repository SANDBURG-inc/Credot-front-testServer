import React, { useEffect } from "react";
import "../assets/css/introduce-what_service.css";
import { Link } from "react-router-dom";

const Guide = () => {
  useEffect(() => {
    document.querySelector(".header").classList.remove("this-page-n");
    document.querySelector(".header").classList.remove("this-page-c");
    document.querySelector(".header").classList.add("this-page-s__i");
    return () => {};
  });
  return (
    <main className="container">
      <div className="inner">
        <section className="section-wrap introduce-wrap guide-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title">서비스 소개</span>
              <div className="head-link">
                <Link className="head-link-a" to="/About">
                  선정산 서비스란?
                </Link>
                <Link className="head-link-a active" to="/Guide">
                  서비스 가이드
                </Link>
              </div>
            </div>
            <div className="i-body" style={{ width: "var(--main-width)" }}>
              <span className="g-title">서비스 가이드</span>
              <div className="g-process">
                <span className="g-process-info">1. 사용중인 커머스를 확인하고 판매자 정보를 입력합니다.</span>
                <div className="g-process-img">
                  <img src="../assets/images/subpage-introduce/i-process1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Guide;
