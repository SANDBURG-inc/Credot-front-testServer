const Footer = () => {
  return (
    <footer className="footer">
      <div className="inner">
        <img className="f-logo" src="../assets/images/logo/logo.png" alt="" />
        <div className="f-info">
          <span className="f-info-span">주소 : 부산광역시 금정구 부산대학로63번길 2, 효원산학협동관 306호</span>
          <div className="devide-bar r-f-mo"></div>
          <div className="f-info-div">
            <span>대표 : 배호진</span>
            <div className="devide-bar"></div>
            <span>사업자등록번호 123 - 12-12345</span>
            <div className="devide-bar r-f-mo"></div>
          </div>
          <div className="f-info-div">
            <span>통신판매업신고 - 호</span>
            <div className="devide-bar"></div>
            <span>대표번호 - </span>
          </div>
        </div>
        <span className="f-copy font-eng">Copyright © Creadot, All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
