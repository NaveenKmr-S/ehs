/*jshint esversion: 6 */
import React, { useState } from "react";
import "./NavBar.css";
import EhsLogo from "../../../images/EhsLogo.svg";
import Vector from "../../../images/Vector.svg";
import ShopCart from "../../../images/Shop.svg";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
import { Link } from "react-router-dom";
import { getArtWorks} from "../../../helper/apiPath";
import swal from "sweetalert";

const NavBar = (props) => {
  const [authUser, setAuthUser] = React.useState("");
  const [find, setFind] = React.useState("");

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("userDetails123")))
      setAuthUser(
        JSON.parse(localStorage.getItem("userDetails123")).emailid ||
          JSON.parse(localStorage.getItem("userDetails123")).phonenumber
      );
  }, [props.loginResponse]);

  const [searchCat, setCat] = useState("All Categories");

  const searchCatogoriesOnClick = (event) => {
    setCat(event.target.text);
    // window.location.replace(
    //   "http://" + window.location.host + "/" + event.target.text.toLowerCase()
    // );
  };

  const search_catogories = [
    "All Categories",
    "Posters",
    "Signages",
    "Floor-Graphics",
    "Asset-Marking",
  ];

  function findArt() {
    Axios.get(getArtWorks, {
      params: {
        find: find,
      },
    })
      .then((res) => {
        if (res.data.posterData.length > 0) {
          props.setSearchData(res.data.posterData);
          localStorage.setItem("searchData123",JSON.stringify(res.data.posterData));
          window.location.replace(
            window.location.protocol +
              "//" +
              window.location.hostname +
              ":3000/" +
              "search"
          );
        } else {
          swal("No ArtWork Found", "", "error");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="navBarTop">
      <nav className="container navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img id="ehsLogoImg" src={EhsLogo} alt="Ehs Logo" />
        </Link>
        <div className="collapse navbar-collapse">
          <div
            className="form-inline input-group ml-5"
            style={{ width: "620px" }}
          >
            <div className="input-group-prepend">
              <button
                className="btn btn-secondary bg-white textColorAndWeight shadow-none"
                style={{
                  color: "#757575",
                  paddingRight: "65px",
                  height: "40px",
                  borderRight: "1px solid lightgrey",
                }}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={Vector} className="mr-2" alt="" />
                {searchCat}
              </button>
              <div
                className="dropdown-menu p-3"
                aria-labelledby="dropdownMenuButton"
              >
                {search_catogories.map((v, i) =>
                  v === "All Categories" ? (
                    <>
                      <Link
                        key={v}
                        to="/"
                        onClick={searchCatogoriesOnClick}
                        className="searchCategory dropdown-item"
                      >
                        {v}
                      </Link>
                    </>
                  ) : (
                    <Link
                      key={v}
                      to={"/" + v.toLowerCase()}
                      onClick={searchCatogoriesOnClick}
                      className="searchCategory dropdown-item"
                    >
                      {v}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div
              className="bg-white"
              style={{ height: "38px", marginTop: "1px" }}
            >
              <SearchIcon
                className="mt-2 ml-3"
                aria-hidden="true"
                style={{ color: "grey", border: "0px" }}
                onClick={() => (find ? findArt() : null)}
              />
            </div>

            <input
              type="text"
              className="form-control bg-white shadow-none"
              placeholder="Search for posters, signages and more"
              style={{
                borderLeft: "none",
                border: "0px",
                marginTop: "1px",
              }}
              onChange={(e) => setFind(e.target.value)}
            />
          </div>

          <ul className="navbar-nav pl-4">
            <li
              className="nav-item text-white"
              style={{
                marginTop: "2px",
                display: "inline-block",
                marginLeft: "6px",
              }}
            >
              {authUser ? (
                <p
                  className="text-white textColorAndWeight text-decoration-none"
                  style={{ marginTop: "13px" }}
                >
                  {authUser.includes("@") ? authUser.split("@")[0] : authUser}
                </p>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white textColorAndWeight text-decoration-none"
                  >
                    Login
                  </Link>{" "}
                  |{" "}
                  <Link
                    to="/signup"
                    className="text-white textColorAndWeight text-decoration-none"
                  >
                    Register
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <nav className="container navbar navbar-expand-lg mt-0 pt-0">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {authUser ? (
              <>
                <li className="nav-item ml-4">
                  <Link
                    to="/dashboard"
                    className="nav-link text-white textColorAndWeight btn shadow-none border-0"
                    style={{ backgroundColor: "#003459", border: "0px" }}
                  >
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ml-4">
                  <p>{"                    "}</p>
                </li>
              </>
            )}
            <li className="nav-item ml-4">
              <div class="dropdown">
                <Link
                  to="/posters"
                  className="nav-link text-white textColorAndWeight btn shadow-none border-0 drpbut "
                  style={{ backgroundColor: "#003459", border: "0px" }}
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => window.location.replace("/posters")}
                >
                  Posters
                </Link>
                <div className="dropdown-content p-3">
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/HINDI"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    HINDI
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/BILINGUAL-HINDI-AND-ENGLISH"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    BILINGUAL-HINDI-AND-ENGLISH
                  </Link>
                  <hr />
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/PPE"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    PPE
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/ELECTRICAL-HAZARD"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    ELECTRICAL-HAZARD
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/MATERIAL-HANDLING"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    MATERIAL-HANDLING
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/CHEMICAL-HAZARDS"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    CHEMICAL-HAZARDS
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/FIRE"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    FIRE
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/HOUSE-KEEPING"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    HOUSE-KEEPING
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/QUALITY"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    QUALITY
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/ENVIRONMENT"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    ENVIRONMENT
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/posters/PICTOGRAM"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    {" "}
                    PICTOGRAM
                  </Link>

                  <Link
                    to="/posters/COVID-19"
                    className="searchCategory dropdown-item"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    COVID-19
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item ml-4">
              <div class="dropdown">
                <Link
                  to="/signages"
                  className="nav-link text-white textColorAndWeight btn shadow-none border-0 drpbut "
                  style={{ backgroundColor: "#003459", border: "0px" }}
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => window.location.replace("/signages")}
                >
                  Signages
                </Link>
                <div className="dropdown-content p-3">
                  <Link
                    className="searchCategory dropdown-item"
                    to="/signages/PRE-PRINTED"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    PRE PRINTED
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/signages/PICTOGRAMS"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    PICTOGRAMS
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/signages/SIGNAL-TEMPLATE-SHEETS"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    SIGNAL TEMPLATE SHEETS
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item ml-4">
              <div class="dropdown">
                <Link
                  to="/floor-graphics"
                  className="nav-link text-white textColorAndWeight btn shadow-none border-0"
                  style={{ backgroundColor: "#003459", border: "0px" }}
                  onClick={() => window.location.replace("/floor-graphics")}
                >
                  Floor Graphics
                </Link>
                <div className="dropdown-content p-3">
                  <Link
                    className="searchCategory dropdown-item"
                    to="/floor-graphics/ROAD-SAFETY"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    ROAD SAFETY
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/floor-graphics/WAREHOUSE"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    WAREHOUSE
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/floor-graphics/PUBLIC-PLACE"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    PUBLIC PLACE
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item ml-4">
              <Link
                to="/asset-marking"
                className="nav-link text-white textColorAndWeight btn shadow-none border-0"
                style={{ backgroundColor: "#003459", border: "0px" }}
              >
                Asset Marking
              </Link>
            </li>
            <li className="nav-item ml-4">
              <div class="dropdown">
                <Link
                  to="/campaigns"
                  className="nav-link text-white textColorAndWeight btn shadow-none border-0 drpbut "
                  style={{ backgroundColor: "#003459", border: "0px" }}
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => window.location.replace("/campaigns")}
                >
                  Campaigns
                </Link>
                <div className="dropdown-content p-3">
                  <Link
                    className="searchCategory dropdown-item"
                    to="/campaigns/FIT-INDIA"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    Fit India
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/campaigns/MONSOON-SAFETY"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    Monsoon Safety
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/campaigns/WORK-RIGHT"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    Work Right
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/campaigns/HOME-ALONE"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    Home Alone
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/campaigns/LAB-AND-SCHOOL-SAFETY"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    Lab And School Safety
                  </Link>
                  <Link
                    className="searchCategory dropdown-item"
                    to="/campaigns/NATURE-AND-SAFETY"
                    onClick={(e) => props.setSubCat(e.target.text.trim())}
                  >
                    Nature And Safety
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item ml-4">
              <Link className="nav-link text-white textColorAndWeight" to="/#">
                Create your own
              </Link>
            </li>
            <li className="nav-item ml-4">
              <Link className="nav-link text-white textColorAndWeight" to="/#">
                Resources
              </Link>
            </li>
            <li className="nav-item ml-4" style={{ marginTop: "-2px" }}>
              <Link
                to="/cart"
                className="nav-link text-white textColorAndWeight"
              >
                Shopping Cart
                <img className="ml-1" src={ShopCart} alt="Shop" />
                <span
                  className="text-center"
                  style={{
                    marginTop: "-8px",
                    marginLeft: "-6px",
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: "#F2994A",
                    width: "17px",
                    height: "17px",
                    paddingTop: "1.5px",
                  }}
                >
                  {props.num}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
