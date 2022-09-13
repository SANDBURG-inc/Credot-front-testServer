import React, { useEffect } from "react";
import "../assets/css/introduce-what_service.css";

const About = () => {
  useEffect(() => {
    document.querySelector(".header").classList.add("this-page-s__i");

    return () => {};
  });
  return (
    <main className="container">
      <div className="inner">
        <section className="section-wrap introduce-wrap">
          <div className="inner">
            <div className="i-head">
              <span className="head-title">서비스 소개</span>
              <div className="head-link">
                <a className="head-link-a active" href="/About">
                  선정산 서비스란?
                </a>
                <a className="head-link-a" href="/Guide">
                  서비스 가이드
                </a>
              </div>
            </div>
            <div className="i-body">
              <div className="i-body-info">
                <div className="i-body-info-lead">
                  <span className="i-body-info-lead-span1">선정산 서비스란?</span>
                  <span className="i-body-info-lead-span2">
                    정산 주기가 길어 사업의 유지나 확장에
                    <br className="br-f-mo2" />
                    어려움을 겪고 있는
                    <br className="br-f-mo" />
                    온오프라인 셀러들을 위해 <br className="br-f-mo2" />
                    판매대금을 선정산해주는 서비스입니다.
                  </span>
                </div>
                <img className="i-body-info-img" src="../assets/images/subpage-introduce/wh-1.png" alt="" />
              </div>
              <div className="i-body-info">
                <img className="i-body-info-img" src="../assets/images/subpage-introduce/wh-2.png" alt="" />
                <div className="i-body-info-lead">
                  <span className="i-body-info-lead-span1">
                    선정산 서비스
                    <br />왜 사용해야할까요?
                  </span>
                  <span className="i-body-info-lead-span2">
                    정산 주기로 인해 사업 유지보수 및 확장이
                    <br className="br-f-add" />
                    어려울 때
                    <br className="br-f-remove" />
                    선정산을 통해 신용등급 하락의 위험 없이 <br />
                    쉽고 간편하고 빠르게 정산을 미리 받을 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
