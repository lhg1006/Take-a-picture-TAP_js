import React, {useEffect} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addPostDefault, addPostSchema} from "../../schema/addPost";
import {getCookie} from "../../utills";
import AddPhoto from "../../components/addPost/addPhoto";
import AddComments from "../../components/addPost/addComments";

const AddPost = () => {
  const isLogin = getCookie('isLogin')

  const methods = useForm({
    resolver: yupResolver(addPostSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: addPostDefault,
  })

  useEffect(() => {
    if (!isLogin) {
      window.location.replace("/")
      return;
    }
  }, [])

  return (
    <>
      {isLogin &&
          <div className={"main-wrapper"}>
              <div className={"content-wrapper"}>
                  <FormProvider {...methods}>
                      <AddPhoto />
                      <AddComments />
                  </FormProvider>
              </div>
          </div>
      }
    </>
  )
}

export default AddPost