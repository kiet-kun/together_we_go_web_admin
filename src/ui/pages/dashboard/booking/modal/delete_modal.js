// lib
import { Modal, Button, Col, Form, InputGroup, Row, Alert, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from "react"
// logic
import { deleteBooking } from '../../../../../services/booking_service';
import { TOAST_TYPE } from '../../../../../constanst';
import { toast } from 'react-toastify';
import { notifyAfterCallApi } from '../../../../../utils/utils';

const DeleteModal = ({ show, data, handleClose, loadPage }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else {
        setIsLoading(true);
        event.preventDefault();

        const response = await deleteBooking(data.id);
        console.log(response);
        notifyAfterCallApi(response);
        if (response.status == 200) {
          loadPage();
          handleClose();
        }
      } 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setValidated(true);
    }
    
  };

  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert key="info" variant="danger">
            Bạn muốn xóa chuyến đi?
            Tất cả dữ liệu liên quan đến chuyến đi này sẽ bị xóa
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