// lib
import {Modal, Button, Col, Form, InputGroup, Row, Alert,Spinner} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
// logic
import { updateUser } from '@/services/user_service';
import { toast } from 'react-toastify';
import { notifyAfterCallApi } from '@/utils/utils';
import { useSelector, useDispatch } from 'react-redux'
import {JWT } from '@/constanst';
const BlockModal = ({show, data, handleClose, loadPage }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.authentication.user)
  
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

        const response = await updateUser(data.id,{isBlock: !data.isBlock}, user[JWT.ACCESS_TOKEN]);
        console.log(response);
        notifyAfterCallApi(response);
        if (response.status == 200){
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

    return  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Modal.Body>Bạn muốn {(data.isBlock) ? "khôi phục" : "khóa"} người dùng {data.firstName}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        {
            isLoading &&   <Button variant="danger" disabled>
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
            !isLoading &&  <Button type="submit" variant="danger" >
            Lưu
            </Button>
          }
      
      </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default BlockModal;