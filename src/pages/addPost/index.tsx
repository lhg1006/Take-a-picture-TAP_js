import React, {useEffect} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addPostDefault, addPostSchema} from "../../schema/addPost";
import {getCookie} from "../../utills";

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
                      <Form>
                          <FloatingLabel controlId="floatingTextarea2" label="Comments">
                              <Form.Control
                                  as="textarea"
                                  placeholder="Leave a comment here"
                                  style={{height: '100px', resize: 'none'}}
                              />
                          </FloatingLabel>
                          <Button variant="primary" type="submit">
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