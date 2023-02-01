import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {login} from "../../api/call/auth";
import {LoginInputs} from "../../types/loginDataType";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAction} from "../../reducers/login";

const LoginPage = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch();

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
        const param = {
          login: true,
          email: data.email
        }
        dispatch(loginAction.setIsLogin(param))
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
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="/forgot">password?</a>
          </p>
        </form>
        </div>
      </div>
    </>
  )
}
export default LoginPage