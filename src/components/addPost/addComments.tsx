import {Button, FloatingLabel, Form} from "react-bootstrap";
import React from "react";
import {useFormContext} from "react-hook-form";

const AddComments = () => {
  const methods = useFormContext()

  return(
    <Form>
      <FloatingLabel className={"mb-3"} controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{height: '100px', resize: 'none'}}
        />
      </FloatingLabel>
      <Button className={"mb-3"} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
export default AddComments