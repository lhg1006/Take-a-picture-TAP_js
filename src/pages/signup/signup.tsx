import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {SignUpInputs} from "../../types/loginDataType";
import {confirmEmailDuplication, signUp} from "../../api/call/auth";
import {phoneNumberAutoFormat} from "../../utills";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const SignupPage = () => {
  const [emailOk , setEmailOk] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required().matches(/\S+@\S+\.\S+/, '이메일 형식을 확인하세요.'),
    password:yup.string().required().length(6, "6자리 이상 입력하세요"),
    chkPassword:yup.string().required().length(6)
  }).required()


  const methods = useForm<SignUpInputs>({
    resolver: yupResolver(schema)
  });

  const onSignUp = (data : SignUpInputs) => {
    if(!emailOk) {
      window.alert("이메일 중복확인")
      return;
    }
    signUp(data).then((res)=>{
      switch (res.data){
        case 1 :
          toast.success("회원가입 성공.")
          navigate("/");
          break;
        case -2:
          toast.error("비밀번호를 확인하세요.")
          break;
        default:window.alert("System Error ...")
      }
    })
  }

  const emailChk = (data: string) => {
    if(!data.match(/\S+@\S+\.\S+/)) return;
    confirmEmailDuplication(data).then((res)=>{
      if(res.data === 0){
        setEmailOk(true)
        toast.success("사용가능한 이메일 입니다.")
      }else if (res.data === 1){
        setEmailOk(false)
        toast.warning("이미 등록된 이메일 입니다.")
      }
    })
  }

  const [value, setValue] = useState<string>("");
  const onChange = (e:any) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setValue(targetValue);
  };

  return(
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
      <form onSubmit={methods.handleSubmit(onSignUp)}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...methods.register("name")}
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input type="tel"
                 maxLength={13}
                 value={value}
                 className="form-control"
                 placeholder="Phone number"
                 {...methods.register("phone", {onChange: onChange})}/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            {...methods.register("email")}
          />
        </div>
        <div className="d-grid">
          <button type="button" onClick={ () => { emailChk(methods.getValues("email")) }} className={!emailOk ? "btn btn-secondary" : "btn btn-success"}>
            {!emailOk ? "Email Check" : "Available"}
          </button>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...methods.register("password")}
          />
          {methods.formState?.errors?.password ? "※ 6자리 이상 입력해주세요" : ""}
        </div>
        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...methods.register("chkPassword")}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sing Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
        </div>
      </div>
    </>
  )
}

export default SignupPage