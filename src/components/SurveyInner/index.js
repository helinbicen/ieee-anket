import "./index.css";

import { useSwiper } from "swiper/react";
import ArrowBack from "../../assets/arrow.svg";
import Hand from "../../assets/hand.png"

function SurveyInner({
  image,
  bgTitle,
  mdTitle,
  title,
  prevButtonShow,
  nextButtonShow,
  children,
  swipeAnimation,
}) {
  const swiper = useSwiper();
  return (
    <div className="content">
      {image && image}
      {bgTitle && <div className="bg-title">{bgTitle}</div>}
      {mdTitle && <div className="md-title">{mdTitle}</div>}
      {title && <div className="title">{title}</div>}
      {children}
    
    {
      (prevButtonShow !== false || nextButtonShow !== false ) && (
        <div className="buttons">
        {prevButtonShow !== false && (
          <button className="prev-button" onClick={() => swiper.slidePrev()}>
            <img src={ArrowBack} alt="arrow-back" />
          </button>
        )}

        {nextButtonShow !== false && (
          <button className="next-button" onClick={() => swiper.slideNext()}>
            DEVAM ET
          </button>
        )}

   
      </div>

      )
    }
     
        {swipeAnimation === true && (
          <div className="handswipe">
              <img src={Hand} alt="" className="handswipe" /> 
          </div>
        )
        
        }
      
    </div>
  );
}

export default SurveyInner;
