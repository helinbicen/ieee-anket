import "./index.css";

import { useSwiper } from "swiper/react";

function SurveyInner({
  bgTitle,
  mdTitle,
  title,
  prevButtonShow,
  nextButtonShow,
  children,
}) {
  const swiper = useSwiper();
  return (
    <div className="content">
      {bgTitle && <div className="bg-title">{bgTitle}</div>}
      {mdTitle && <div className="md-title">{mdTitle}</div>}
      {title && <div className="title">{title}</div>}
      {children}
      <div className="buttons">
        {prevButtonShow !== false && (
          <button className="prev-button" onClick={() => swiper.slidePrev()}>
            ←
          </button>
        )}

        {nextButtonShow !== false && (
          <button className="next-button" onClick={() => swiper.slideNext()}>
            DEVAM ET
          </button>
        )}
      </div>
    </div>
  );
}

export default SurveyInner;
