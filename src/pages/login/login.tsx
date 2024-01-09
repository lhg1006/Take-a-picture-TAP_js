import React, {useEffect} from "react";
import "../../css/pages/login/login.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {login} from "../../api/call/auth";
import {LoginInputs} from "../../types/loginDataType";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {addLocalStorageItem, delLocalStorageItem, getCookie, getLocalStorageItem} from "../../utills";
import {Form} from "react-bootstrap";

const LoginPage = () => {
  const remember = getLocalStorageItem("rememberEmail")
  const isLogin = getCookie('isLogin')

  useEffect(()=>{
    if(isLogin){
      window.location.replace("/main")
    }

    if(remember != undefined){
      methods.setValue("email", remember)
      methods.setValue("remember", true)
    }
  },[])

  const navigator = useNavigate()

  const schema = yup.object().shape({
    email: yup.string().required(),
    password:yup.string().required(),
    remember:yup.boolean()
  }).required()

  const methods = useForm<LoginInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: LoginInputs) => {
    login(data).then((res)=>{
      if(res.data === 1){
        if(data.remember){
          addLocalStorageItem("rememberEmail", data.email)
        }else{
          delLocalStorageItem("rememberEmail")
        }
        toast.success("인증 성공")
        navigator("/main")
      }else{
        toast.error ("입력 정보를 확인하세요")
      }
    })
  };
  return(
    <>
      {!isLogin &&
      <div className="auth-wrapper">
        <div className="auth-inner sign-inner-pd">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Sign In</h3>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="email"
              placeholder="name@example.com"
              {...methods.register("email", {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}
            />
            <label htmlFor="floatingInputCustom">Email address</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
              {...methods.register("password")}
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                {...methods.register("remember")}
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                <span style={{marginLeft:"5px"}}>Remember me</span>
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right fs15">
            Forgot <a className={'fs15'} href="/forgot">password?</a>
            <br/><a className={'fs15'} href="/sign-up">Sign-Up</a>
          </p>
        </form>
        </div>
      </div>
      }
    </>
  )
}
export default LoginPage