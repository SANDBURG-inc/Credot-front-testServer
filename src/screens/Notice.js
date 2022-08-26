import React, { useEffect } from "react";
import "../assets/css/notice-notice.css";

const Notice = () => {
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
      document.querySelector(".header").classList.add("this-page-n");
    };
  });
  return (
    <main className="container">
      <div className="inner">
        <section className="section-wrap introduce-wrap guide-wrap">
          <div className="inner">
            <div className="n-head">
              <span className="head-title">공지사항</span>
              <div className="head-link">
                <a className="head-link-a active" href="/Notice">
                  공지사항
                </a>
                <a className="head-link-a" href="/Media">
                  언론속의 크레닷
                </a>
              </div>
            </div>
            <div className="n-body">
              <div className="n-table-wrap">
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
                <div className="n-table-box">
                  <div className="n-table-board">
                    <span className="n-table-board-span1">정산금 지급 문자 수신 후 정산금이 들어오지 않는 오류에 대해 말씀드립니다.</span>
                    <div className="board-date">
                      <span className="board-date-span1 font-eng">22-08-04</span>
                      <button className="board-date-arrow-wrap">
                        <img className="board-date-arrow" src="../assets/images/subpage-notice/n-table-arrow.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="n-board-lead">
                    <span className="n-board-lead-span">
                      보다 편리한 사용성을 위해 카카오톡 알림톡 서비스가 7월 31일부터 시행되며, 이에 따른 ‘이용약관’ 및 ‘개인정보 처리방침’의 추가에
                      관한 안내의 말씀을 드립니다.
                      <br />
                      아래의 이용약관 및 개인정보 처리방침의 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다.
                      <br />
                      <br />
                      약관 개정 공지일 : 2022년 7월 25일(월)
                      <br />
                      약관 개정 적용일 : 2022년 7월 31일(일)
                      <br />
                      <br />
                      [이용약관]
                      <br />
                      <br />
                      ■ 추가내용
                      <br />
                      <br />
                      “스토어”가 회원가입, 주문안내, 배송안내 등 비광고성 정보를 카카오톡 알림톡으로 알려드리며, 만약 알림톡 수신이 불가능하거나 수신
                      차단하신 경우에는 일반 문자메시지로 보내 드립니다. <br />
                      카카오톡 알림톡을 통해 안내되는 정보를 와이파이가 아닌 이동통신망으로 이용할 경우, 알림톡 수신 중 데이터 요금이 발생할 수
                      있습니다. <br />
                      카카오톡을 통해 발송되는 알림톡 수신을 원치 않으실 경우 반드시 알림톡을 차단하여 주시기 바랍니다.
                    </span>
                  </div>
                </div>
              </div>
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

export default Notice;
