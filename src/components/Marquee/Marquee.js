import React from "react";
import "./Marquee.css";

const MarqueeAnimation = () => {
  return (
    <div className="visual-marquee">
      <div className="marquee">
        <MarqueeBalloon who="쿠팡 셀러 배**님의 후기" strong="사업 확대" content="에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^" />
        <MarqueeBalloon who="쿠팡 셀러 이**님의 후기" strong="사용이 편리" content="해서 초보들도 간편하게 사용할수 있어요~ 넘 좋네요" />
        <MarqueeBalloon who="쿠팡 셀러 유**님의 후기" strong="사업 확대" content="에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^" />
        <MarqueeBalloon who="쿠팡 셀러 권**님의 후기" strong="빠른정산" content="으로 사업이 더 빨리 성장 할수 있었어요!! 최고 입니다~" />
      </div>
      <div className="marquee marquee2">
        <MarqueeBalloon who="쿠팡 셀러 박**님의 후기" strong="사업 확대" content="에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^" />
        <MarqueeBalloon who="쿠팡 셀러 배**님의 후기" strong="사용이 편리" content="해서 초보들도 간편하게 사용할수 있어요~ 넘 좋네요" />
        <MarqueeBalloon who="쿠팡 셀러 이**님의 후기" strong="사업 확대" content="에 있어 큰 도움이 됩니다. 더 열심히 할 수 있게 되었어요^^" />
        <MarqueeBalloon who="쿠팡 셀러 유**님의 후기" strong="빠른정산" content="으로 사업이 더 빨리 성장 할수 있었어요!! 최고 입니다~" />
      </div>
    </div>
  );
};

const MarqueeBalloon = (props) => {
  return (
    <div className="marquee-balloon">
      <span className="marquee-balloon-span1">{props.who}</span>
      <span className="marquee-balloon-span2">
        <strong className="strong">{props.strong}</strong>
        {props.content}
      </span>
    </div>
  );
};

export default MarqueeAnimation;
