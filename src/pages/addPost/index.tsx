import React, {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addPostDefault, AddPostInputType, addPostSchema} from "../../schema/addPost";
import {getCookie} from "../../utills";
import AddPhoto from "../../components/addPost/addPhoto";
import AddComments from "../../components/addPost/addComments";
import {addPost} from "../../api/call/newFeed";
import {toast} from "react-toastify";
import DropdownBox from "../../components/common/dropdown";

const AddPost = () => {
  const isLogin = getCookie('isLogin')
  const cookieMail = getCookie("memberEmail")

  useEffect(() => {
    if (!isLogin) {
      window.location.replace("/")
      return;
    }
  }, [])

  const methods = useForm({
    resolver: yupResolver(addPostSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: addPostDefault,
  })

  const onSubmit = (data:AddPostInputType) => {
    methods.setValue("userMail", cookieMail)
    try {
      addPost(data).then((res)=>{
        if(res.data === 1){
          toast.success("성공")
          window.location.replace("new-feed")
        }else{
          toast.error("실패")
        }
      })
    }catch (error){
      console.log(error)
    }


  }

  return (
      <>
        {isLogin &&
            <div className={"main-wrapper"} >
              <div className={"add-post-form"}>
                <FormProvider {...methods}>
                  <Form onSubmit={methods.handleSubmit(onSubmit)}>

                    <AddPhoto/>
                    <AddComments />

                    <Button className={"mb-3"} variant="primary" type="submit">
                      Submit
                    </Button>

                  </Form>
                </FormProvider>
              </div>
            </div>
        }
      </>
  )
}

export default AddPost