import {Button, FloatingLabel, Form} from "react-bootstrap";
import React from "react";
import {useFormContext} from "react-hook-form";

const AddComments = () => {
  const {register} = useFormContext()

  return(
      <FloatingLabel className={"mb-3"} controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{height: '150px', resize: 'none'}}
          {...register("content")}
        />
      </FloatingLabel>
  )
}
export default AddComments