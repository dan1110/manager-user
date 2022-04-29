import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addUserApi, updateUserApi } from "../../../api/userApi";
import useForm from "../../../hooks/useForm";
import { userValidate } from "../../../utils/validationUtils";

const FormModal = (props) => {
  const { form, errors, handleChange, handleSubmit, resetForm, initialValues } =
    useForm(() => onsubmit(), userValidate);

  useEffect(() => {
    initialValues({
      ...props.user,
      role: props.user.role ? props.user.role : "Admin",
    });
  }, [props.user]);

  const onsubmit = async () => {
    const { role, idUserName, userName, password } = form;

    const data = {
      id: props.user.id,
      role: role,
      idUserName: idUserName,
      userName: userName,
      password: password,
    };

    try {
      if (props?.user?.id) {
        await updateUserApi(data);
      } else {
        await addUserApi(data);
      }
    } catch (error) {
      console.log(error);
    }
    props.onHide();
    props.reload();
    resetForm();
  };

  const onCancel = () => {
    props.onHide();
    resetForm();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="d-flex justify-between align-items-center">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.user.id ? "Edit user" : "Add New User"}
        </Modal.Title>
        <Button onClick={props.onHide} className="btn-close">
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <form className="w-75 m-auto" autoComplete="off">
          <div className="d-flex">
            <Form.Label htmlFor="idUser" className="w-25 mr-2">
              ID
            </Form.Label>
            <div className="w-100">
              <Form.Control
                type="text"
                id="idUser"
                name="idUserName"
                onChange={(e) => handleChange(e.target.value, "idUserName")}
                value={form.idUserName}
                disabled={props.user?.idUserName ? true : false}
              />
              {errors?.idUserName && (
                <p className="text-danger m-0 error-input mt-1">
                  {errors?.idUserName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 d-flex">
            <Form.Label htmlFor="userName" className="w-25 mr-2">
              Username
            </Form.Label>
            <div className="w-100">
              <Form.Control
                type="text"
                id="userName"
                name="userName"
                onChange={(e) => handleChange(e.target.value, "userName")}
                value={form.userName}
              />
              {errors?.userName && (
                <p className="text-danger m-0 error-input mt-1">
                  {errors?.userName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 d-flex">
            <Form.Label htmlFor="password" className="w-25 mr-2">
              Password
            </Form.Label>
            <div className="w-100">
              <Form.Control
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e.target.value, "password")}
                value={form.password || ""}
                autoComplete="new-password"
              />
              {errors?.password && (
                <p className="text-danger m-0 error-input mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 d-flex">
            <Form.Label htmlFor="confirm" className="w-25 mr-2">
              Confirm
            </Form.Label>
            <div className="w-100">
              <Form.Control
                type="password"
                id="confirm"
                name="confirm"
                value={form.confirm || ""}
                onChange={(e) => handleChange(e.target.value, "confirm")}
              />
              {errors?.confirm && (
                <p className="text-danger m-0 error-input mt-1">
                  {errors?.confirm?.message}
                </p>
              )}
            </div>
          </div>

          <Form.Group className="mt-4 d-flex">
            <Form.Label className="mr-2 mb-0 w-25">Role</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleChange(e.target.value, "role")}
              name="role"
              value={form.role || "Admin"}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </Form.Control>
          </Form.Group>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit()} className="btn-blue">
          Save
        </Button>
        <Button onClick={() => onCancel()} className="btn-clear">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
