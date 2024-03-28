// lib
import { Modal, Button, Col, Form, InputGroup, Row, Alert, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from "react"
// logic
import { TOAST_TYPE } from '../../../../../constanst';
import { deleteUser } from '../../../../../services/user_service';

const DeleteModal = ({ show, data, handleClose, loadPage, appState }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setIsLoading(true);
      try {
        event.preventDefault();

        const response = await deleteUser(data.id);
        console.log(response);
        if (response.status == 200) {
          appState.showToast('Xóa thành công', TOAST_TYPE.success);
          loadPage();
          handleClose();
        }
        else {
          appState.showToast(response.data['message'], TOAST_TYPE.danger);
        }
      } catch (error) {
        appState.showToast('Xảy ra lỗi', TOAST_TYPE.danger);
        console.log(error);
      }
      setIsLoading(false);
    }

    setValidated(true);
  };

  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert key="info" variant="danger">
            Bạn muốn xóa người dùng {data.firstName}?
            Tất cả dữ liệu liên quan đến người dùng này sẽ bị xóa:
            chuyến đi, đánh giá, tin nhắn,...
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          {
            isLoading && <Button variant="danger" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Đang lưu...</span>
            </Button>
          }
          {
            !isLoading && <Button type="submit" variant="danger" >
              Lưu
            </Button>
          }
        </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default DeleteModal;