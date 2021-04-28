import React, { useState , useRef} from "react";
import "./bestsellers.css"
import $ from "jquery";
import "bootstrap";
import NoSmoke from "../../../images/NoSmoke.svg";
import WearMask from "../../../images/WearMask.svg";
import Fire from "../../../images/Fire.svg";
import NoTouch from "../../../images/NoTouch.svg";

import SafeTwo from "../../../images/BeSafe.png";
import Mind from "../../../images/Mind.png";
import BeforeStart from "../../../images/BeforeStart.png";

import FootPrint from "../../../images/FootPrint.svg";
import OvalTwoMen from "../../../images/OvalTwoMen.svg";
import RoundTwoMen from "../../../images/RoundTwoMen.svg";
import RoundMask from "../../../images/RoundMask.svg";

import FloorImg from "../../../images/FloorImg.png";

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const ncard = (val) => {
    return (
        <ImgBox src={val.src} title={val.title} />
    );
};

const ImgBox = (props) => {
  return (
    <div className="  imgBox ">
      <img className="  m-0" id="imgBoxImage" src={props.src} alt="poster" />
      <p className=" mt-sm-1 mt-0 mb-0 " id="imgBoxTitle">
        {props.title}
      </p>
    </div>
  );
};

  

const Bestsellers = () => {

  const [category,setCategory] = useState('Posters');

    const warnImgTitle = [
        { src: NoSmoke, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: WearMask, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: Fire, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: NoTouch, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: NoSmoke, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: WearMask, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: Fire, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: NoTouch, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
      ];
    
      const FloorGraphicsImgTitle = [
        { src: FloorImg, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: SafeTwo, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: Mind, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: BeforeStart, title: "Floor Graphics | Printable Catalog | PRD-FG009"},
        { src: FloorImg, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: SafeTwo, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: Mind, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: BeforeStart, title: "Floor Graphics | Printable Catalog | PRD-FG009"},
      ];
    
      const awareImgTitle = [
        { src: FootPrint, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: OvalTwoMen, title: "Floor Graphics | Printable Catalog | PRD-FG009"},
        { src: RoundTwoMen, title: "Floor Graphics | Printable Catalog | PRD-FG009"},
        { src: RoundMask, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: FootPrint, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: OvalTwoMen, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
        { src: RoundTwoMen, title: "Floor Graphics | Printable Catalog | PRD-FG009"},
        { src: RoundMask, title: "Floor Graphics | Printable Catalog | PRD-FG009" },
      ];

      const breakPoints = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1 },
        { width: 780, itemsToShow: 1}
      ];

      const bestseller = useRef();

      const pagination = ({ pages, activePage, onClick }) => {
        
        return (
        <div className="  bestsellerPagination "  >  
             
        {pages.map(page => {
            const isActivePage = activePage === page
            return (
              <>
                <div role="button" id="sellerH"  key={page} onClick={(e) => {onClick(page)
                  setCategory(e.target.innerHTML);
                }} active={isActivePage}  className={isActivePage ? "active sellerHead" : " "} >
                {
                  (page===0)? <span className="sellerHead "  role="button" >Posters </span>
                   : ((page===1) ? <span className="sellerHead "  role="button" >Signages</span> : 
                   ((page===2) ? <span className="sellerHead "  role="button" >Floor Graphics </span> : 
                                 <span className="sellerHead "  role="button" >Asset Markings </span>))
                }
                </div>
              </>
              )
            })}
        </div>
        );
    };

    return(
      <>
        <div className="sellerContainer ">
                <h2 className="promiseHeading mb-sm-5 mb-3">Our Bestsellers</h2>
                <div className="d-flex justify-content-between  mx-sm-5 mx-2 mb-4">
                  <ArrowBackIosRoundedIcon id="prevBtn"  role="button" onClick={() => bestseller.current.slidePrev()} />
                  <ArrowForwardIosRoundedIcon id="nextBtn" role="button" onClick={() => bestseller.current.slideNext()}  />
                </div>
                <div className="" style={{background: "#F6F6F6"}}>
                <Carousel className=" w-100  "  breakPoints={breakPoints}  showArrows={false} ref={bestseller} style={{opacity: "1!important"}} 
                renderPagination={pagination}>
                    <div className="  active   "  id="carouselItem">
                      {FloorGraphicsImgTitle.slice(0,4).map(ncard)}
                    </div>
                    <div id="carouselItem" className="">
                      {warnImgTitle.slice(0,4).map(ncard)}
                      
                    </div>
                    <div id="carouselItem" className="">
                      {FloorGraphicsImgTitle.slice(0,4).map(ncard)}
                    </div>
                    <div id="carouselItem" className="">
                      {awareImgTitle.slice(0,4).map(ncard)}
                    </div>
                </Carousel>
                <Link to={`${category}/subcat/Bestsellers`}><p role="button" className="seemore" >See More</p></Link>
            
          </div>          
        </div>
      </>
    );
};

export default Bestsellers;