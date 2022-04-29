import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUserApi } from "../../../api/userApi";

const ConfirmModal = (props) => {
    const onsubmit = async () => {
        if (props?.user?.id) {
            try {
                await deleteUserApi(props?.user?.id);
            } catch (error) {
                console.log(error);
            }
        }
        props.onHide();
        props.reload();
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
                    Confirm delete
                </Modal.Title>
                <Button onClick={props.onHide} className="btn-close">
                    x
                </Button>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want to delete user "{props.user.userName}"</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onsubmit()} className="btn-blue">
                    Yes
                </Button>
                <Button onClick={props.onHide} className="btn-clear">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
