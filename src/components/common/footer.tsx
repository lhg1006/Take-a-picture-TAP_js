import React from "react";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
const Footer = () => {
  const navigator = useNavigate()

  const onIcoHome = () => {
    navigator("/main")
  }

  const onIcoPlus = () => {
    navigator("/add-post")
  }

  const onIcoGear = () => {
    navigator("/my-page")
  }

  const icoStyle = {
    fontSize: "1.8rem",
    cursor: "pointer",
  }
  return(
    <>
      <footer className={'footer'}>
        <Row style={{paddingTop:"10px"}}>
          <Col></Col>
          <Col>
            <i onClick={onIcoHome} className="bi bi-house" style={icoStyle}></i>
          </Col>
          <Col>
            <i onClick={onIcoPlus} className="bi bi-plus-square" style={icoStyle}></i>
          </Col>
          <Col>
            <i onClick={onIcoGear} className="bi bi-gear" style={icoStyle}></i>
          </Col>
          <Col></Col>
        </Row>
      </footer>
    </>
  )
}

export default Footer;