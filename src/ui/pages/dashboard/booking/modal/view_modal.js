// lib
import {Modal, Button, Col, Form, InputGroup, Row, Alert,Spinner} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import DateTimePicker from 'react-datetime-picker';
// logic
import { formatDate, genPassword, 
  formatDateWithTime, notifyAfterCallApi } from '@/utils/utils';
import { updateBooking } from '@/services/booking_service';

const ViewModal = ({ show, data, handleClose, loadPage }) => {
  const [status, setStatus] = useState(data.status);
  const [price, setPrice] = useState(data.price);
  const [bookingType, setBookingType] = useState(data.bookingType);
  const [time, setTime] = useState(data.time);
  const [content, setContent] = useState(data.content);
  const [distance, setDistance] = useState(data.distance);
  const [duration, setDuration] = useState(data.duration);
  const [createdAt, setCreatedAt] = useState(data.createdAt);
  // start addrees
  const [startPointLat, setStartPointLat] = useState(data.startPointLat);
  const [startPointLong, setStartPointLong] = useState(data.startPointLong);
  const [startPointId, setStartPointId] = useState(data.startPointId);
  const [startPointMainText, setStartPointMainText] = useState(data.startPointMainText);
  const [startPointAddress, setStartPointAddress] = useState(data.startPointAddress);
  // end address
  const [endPointLat, setEndPointLat] = useState(data.endPointLat);
  const [endPointLong, setEndPointLong] = useState(data.endPointLong);
  const [endPointLatLng, setEndPointLatLng] = useState(data.endPointLatLng);
  const [endPointId, setEndPointId] = useState(data.endPointId);
  const [endPointMainText, setEndPointMainText] = useState(data.endPointMainText);
  const [endPointAddress, setEndPointAddress] = useState(data.endPointAddress);

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

        const response = await updateBooking(data.id,
          {
            status, price, bookingType ,time, content, distance,duration,
            startPointLat, startPointLong, startPointId, startPointMainText, startPointAddress,
            endPointLat, endPointLong, endPointId, endPointMainText, endPointAddress,
        });
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

  return <>
    
      <Modal show={show} onHide={handleClose} size='xl' >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chuyến đi</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
        <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom07">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                <DateTimePicker onChange={setTime} value={time} />
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
                  required
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>

             
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Khoảng cách</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={distance}
                  onChange={(e) =>setDistance(e.target.value)}
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
              <Form.Group  as={Col} md="6" controlId="validationCustom09">
                <Form.Label>Khu vực đi</Form.Label>
                <Form.Control required as="textarea" rows={1} value={startPointAddress} 
                onChange={(e) => setStartPointAddress(e.target.value)}
                
                />
              </Form.Group>
              
              <Form.Group  as={Col} md="6" controlId="validationCustom09">
                <Form.Label>Địa điểm đi</Form.Label>
                <Form.Control required as="textarea" rows={1} value={startPointMainText} 
                onChange={(e) => setStartPointMainText(e.target.value)}
                />
              </Form.Group>

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Kinh độ địa điểm đi</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={startPointLat}
                  onChange={(e) =>setStartPointLat(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Kinh độ địa điểm đi</Form.Label>
                <Form.Control
                required
                  type="text"
                  value={startPointLong}
                  onChange={(e) =>setStartPointLong(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom11">
                <Form.Label>ID địa điểm đi</Form.Label>
                <Form.Control
                  type="text" required
                  value={startPointId}
                  onChange={(e) =>setStartPointId(e.target.value)}
                />
              </Form.Group>


            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom09">
                <Form.Label>Khu vực đến</Form.Label>
                <Form.Control required as="textarea" rows={1} value={endPointAddress} 
                onChange={(e) => setEndPointAddress(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group as={Col}  md="6" controlId="validationCustom09">
                <Form.Label>Địa điểm đến</Form.Label>
                <Form.Control required as="textarea" rows={1} value={endPointMainText} 
                onChange={(e) => setEndPointMainText(e.target.value)}
                />
              </Form.Group>

            </Row>
            

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Kinh độ địa điểm đến</Form.Label>
                <Form.Control
                  type="text" required
                  value={endPointLat}
                  onChange={(e) =>setEndPointLat(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Kinh độ địa điểm đến</Form.Label>
                <Form.Control
                  type="text" required
                  value={endPointLong}
                  onChange={(e) =>setEndPointLong(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom11">
                <Form.Label>ID địa điểm đến</Form.Label>
                <Form.Control
                  type="text" required
                  value={endPointId}
                  onChange={(e) =>setEndPointId(e.target.value)}
                />
              </Form.Group>


            </Row>

            <Row className="mb-3">
              <Form.Group  md="6" controlId="validationCustom09">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control required as="textarea" rows={2} value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              
            </Row>   
    
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