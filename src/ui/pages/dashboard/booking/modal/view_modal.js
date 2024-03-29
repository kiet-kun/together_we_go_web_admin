// lib
import {Modal, Button, Col, Form, InputGroup, Row, Alert,Spinner} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
// logic
import { formatDate, genPassword, formatDateWithTime } from '../../../../../utils/utils';
import { TOAST_TYPE } from '../../../../../constanst';
import { updateUser } from '../../../../../services/user_service';

const ViewModal = ({ show, data, handleClose, loadPage, showToast }) => {
  const [status, setStatus] = useState(data.status);
  const [price, setPrice] = useState(data.price);
  const [bookingType, setBookingType] = useState(data.bookingType);
  const [time, setTime] = useState(data.time);
  const [content, setContent] = useState(data.content);
  const [startPointAddress, setStartPointAddress] = useState(data.startPointAddress);
  const [endPointAddress, setEndPointAddress] = useState(data.endPointAddress);
  const [distance, setDistance] = useState(data.distance);
  const [duration, setDuration] = useState(data.duration);
  const [createdAt, setCreatedAt] = useState(data.createdAt);

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    // console.log(date, name, gender, phoneNumber, email, age);
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // else {
    //   setIsLoading(true);
    //   try {
    //     event.preventDefault();

    //     const response = await updateUser(data.id,{date, firstName : name, gender, phoneNumber, email, age, password});
    //     console.log(response);
    //     if (response.status == 200){
    //       showToast('Cập nhật thành công',TOAST_TYPE.success);
    //       loadPage();  
    //       handleClose();   
    //     }
    //     else {
    //       showToast(response.data['message'],TOAST_TYPE.danger);
    //     }
    //   } catch (error) {
    //      showToast('Xảy ra lỗi',TOAST_TYPE.danger);
    //     console.log(error);     
    //   }
    //   setIsLoading(false);
    // }

    // setValidated(true);
  };

  return <>
    
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chuyến đi</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
        <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom07">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                <Form.Control
   
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={formatDateWithTime(time)}
                />
              </Form.Group>

             
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Giá"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Loại</Form.Label>
                <Form.Select aria-label="Default select example" 
                  value={bookingType}   
                  onChange={(e) => setBookingType(e.target.value)}>
                  <option value="Tìm tài xế">Tìm tài xế</option>
                  <option value="Tìm hành khách">Tìm hành khách</option>
                </Form.Select>
              </Form.Group>
            </Row>
            
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom07">
                <Form.Label>Tổng thời gian di chuyển</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={duration}
                />
              </Form.Group>

             
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Khoảng cách</Form.Label>
                <Form.Control
                  type="text"
                  value={data.distance}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select aria-label="Default select example" 
                  value={status}   
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="2">Đang mở</option>
                  <option value="1">Đã hoàn thành</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Tên"
                  value={data.authorId.firstName}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={data.authorId.email}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom11">
                <Form.Label>Thời gian tạo</Form.Label>
                <Form.Control
                  disable
                  type="text"
                  value={formatDateWithTime(createdAt)}
                />
              </Form.Group>


            </Row>

            <Row className="mb-3">
              <Form.Group  md="6" controlId="validationCustom09">
                <Form.Label>Địa điểm đi</Form.Label>
                <Form.Control as="textarea" rows={1} value={startPointAddress}
                onChange={(e) => setStartPointAddress(e.target.value)}
                />
              </Form.Group>
              
            </Row>

            <Row className="mb-3">
              <Form.Group  md="6" controlId="validationCustom09">
                <Form.Label>Địa điểm đến</Form.Label>
                <Form.Control as="textarea" rows={1} value={endPointAddress} 
                onChange={(e) => setEndPointAddress(e.target.value)}
                />
              </Form.Group>
              
            </Row>

            <Row className="mb-3">
              <Form.Group  md="6" controlId="validationCustom09">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control as="textarea" rows={2} value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              
            </Row>   

            {/* <Row className="mb-3">
              <Form.Group  md="6" controlId="validationCustom10">
                <Form.Label></Form.Label>
              </Form.Group>
            </Row>

            <Alert key="info" variant="info">
                Trạng thái : {data.online ? "Online" : "Offline"}
            </Alert> 

            <Alert key="info" variant="info">
                <div class="d-flex justify-content-between">
                  <div>
                      Số chuyến đi quan tâm (4)
                  </div>
                  <Alert.Link href="#">Xem chi tiết</Alert.Link>
                </div>
                
                
            </Alert>  */}
  
     
    
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
        </Button>

        {
            isLoading &&   <Button variant="primary" disabled>
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
            !isLoading &&  <Button type="submit" >
            Lưu
            </Button>
          }
      
        </Modal.Footer>
        </Form>
      </Modal>

  </>
}

export default ViewModal;