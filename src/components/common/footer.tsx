import React from "react";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../utills";

const Footer = () => {
  const isLogin = getCookie("isLogin")
  const navigator = useNavigate()
  const cookieMemberEmail = getCookie("memberEmail")

  const onIcoHome = () => {
    if(window.location.pathname === "/main"){
      window.scrollTo({top:0, behavior:"smooth"})
    }else{
      navigator("/main")
    }
  }

  const onIcoPlus = () => {
    navigator("/add-post")
  }

  const onIcoGear = () => {
    navigator(`/user-page?email=${cookieMemberEmail}`)
  }

  const icoStyle = {
    fontSize: "1.8rem",
    cursor: "pointer",
  }
  return (
    <>
      {isLogin &&
          <footer className={'footer'}>
              <Row style={{paddingTop: "10px"}}>

                  <Col>
                      <i onClick={onIcoHome} className="bi bi-grid footer-grid-icon" style={icoStyle}></i>
                  </Col>

                  <Col>
                      <i onClick={onIcoPlus} className="bi bi-plus-square" style={icoStyle}></i>
                  </Col>

                  <Col><i onClick={onIcoGear} className="bi bi-person-square footer-person-square-icon" style={icoStyle}></i></Col>

              </Row>
          </footer>
      }
    </>
  )
}

export default Footer;