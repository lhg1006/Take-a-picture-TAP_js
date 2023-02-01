import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {login} from "../../api/call/auth";
import {LoginInputs} from "../../types/loginDataType";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {addLocalStorageItem, delLocalStorageItem, getLocalStorageItem} from "../../utills";

const LoginPage = () => {
  const remember = getLocalStorageItem("rememberEmail")

  useEffect(()=>{
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
      <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...methods.register("email", {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...methods.register("password")}
            />
          </div>
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
          <p className="forgot-password text-right" style={{fontSize:"15px"}}>
            Forgot <a style={{fontSize:"15px"}} href="/forgot">password?</a>
            <br/><a style={{fontSize:"15px"}} href="/sign-up">Sign-Up</a>
          </p>
        </form>
        </div>
      </div>
    </>
  )
}
export default LoginPage