import React, {useEffect, useState} from "react";
import "../../css/pages/login/login.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SignUpInputs} from "../../types/loginDataType";
import {confirmEmailDuplication, signUp} from "../../api/call/auth";
import {getCookie, phoneNumberAutoFormat} from "../../utills";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Form} from "react-bootstrap";
import {signUpSchema} from "../../schema/signUp";

const SignupPage = () => {
  const [emailOk, setEmailOk] = useState(false);
  const isLogin = getCookie('isLogin')
  const navigate = useNavigate();

  const methods = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema)
  });

  const onSignUp = (data: SignUpInputs) => {
    if (!emailOk) {
      window.alert("이메일 중복확인")
      return;
    }
    signUp(data).then((res) => {
      switch (res.data) {
        case 1 :
          toast.success("회원가입 성공.")
          navigate("/");
          break;
        case -2:
          toast.error("비밀번호를 확인하세요.")
          break;
        default:
          window.alert("System Error ...")
      }
    })
  }

  const emailChk = (data: string) => {
    if (!data.match(/\S+@\S+\.\S+/)) return;
    confirmEmailDuplication(data).then((res) => {
      if (res.data === 0) {
        setEmailOk(true)
        toast.success("사용가능한 이메일 입니다.")
      } else if (res.data === 1) {
        setEmailOk(false)
        toast.warning("이미 등록된 이메일 입니다.")
      }
    })
  }

  const [value, setValue] = useState<string>("");
  const onChange = (e: any) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setValue(targetValue);
  };

  useEffect(()=>{
    if(isLogin){
      window.location.replace('/main')
    }
  },[])
  return (
    <>
      {!isLogin &&
      <div className="auth-wrapper">
        <div className="auth-inner sign-up-inner">
          <form onSubmit={methods.handleSubmit(onSignUp)}>
            <h3>Sign Up</h3>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="Name"
                placeholder="Name"
                {...methods.register("name")}
              />
              <label htmlFor="floatingInputCustom">Name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="tel"
                maxLength={13}
                value={value}
                placeholder="Phone number"
                {...methods.register("phone", {onChange: onChange})}
              />
              <label htmlFor="floatingInputCustom">Phone number</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="Email"
                {...methods.register("email")}
              />
              <label htmlFor="floatingInputCustom">Email</label>
            </Form.Floating>

            <div className="d-grid mb-3">
              <button type="button" onClick={() => {
                emailChk(methods.getValues("email"))
              }} className={!emailOk ? "btn btn-secondary" : "btn btn-success"}>
                {!emailOk ? "Email Check" : "Available"}
              </button>
            </div>
            <span className={"form-error-message"}>
                {methods.formState?.errors?.password?.message ? methods.formState?.errors?.password?.message : ""}
            </span>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="password"
                placeholder="Password"
                {...methods.register("password")}
              />
              <label htmlFor="floatingInputCustom">Password</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="password"
                placeholder="Password Confirm"
                {...methods.register("chkPassword")}
              />
              <label htmlFor="floatingInputCustom">Password Confirm</label>
            </Form.Floating>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sing Up
              </button>
            </div>
            <p className="forgot-password text-right fs15">
              Already registered <a className={'fs15'} href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
      }
    </>
  )
}

export default SignupPage