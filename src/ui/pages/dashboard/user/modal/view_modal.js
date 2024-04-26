// lib
import {Modal, Button, Col, Form, InputGroup, Row, Alert,Spinner} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
// logic
import { formatDate, genPassword, notifyAfterCallApi } from '@/utils/utils';
import { updateUser } from '@/services/user_service';
import { toast } from 'react-toastify';
import useClipBoard from '@/hooks/useClipBoard';
import { useSelector, useDispatch } from 'react-redux'
import {JWT } from '@/constanst';
const ViewModal = ({ show, data, handleClose, loadPage }) => {
  const [date, setDate] = useState(formatDate(new Date(data.createdAt).toString()));
  const [name, setName] = useState(data.firstName);
  const [age, setAge] = useState(data.age);
  const [gender, setGender] = useState(data.gender);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [email, setEmail] = useState(data.email);
  const [address, setAddress] = useState(data.locationMainText);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const [handleClipBoard] = useClipBoard();
  const user = useSelector((state) => state.authentication.user)

  const handleSubmit = async (event) => {
    try {
      console.log(date, name, gender, phoneNumber, email, age);
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else {
        setIsLoading(true);
        event.preventDefault();
  
        const response = await updateUser(data.id,
          {date, firstName : name, gender, phoneNumber, email, age, password},
          user[JWT.ACCESS_TOKEN]);
        console.log(response);
        notifyAfterCallApi(response);
        if (response.status == 200){
          loadPage();  
          handleClose();   
        }        
      }
    } catch (error) {
      console.log(error);     
    }
    finally {
      setIsLoading(false);
      setValidated(true);
    }
  };

  return <>
    
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người dùng - {data.id}</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
        <Row className="mb-3" >
              <Form.Group  md="4" controlId="validationCustom01">
                <Form.Label>ID  
                  <div onClick={(e) => {handleClipBoard(data.id)}}>
                  <i class="bi bi-clipboard"></i>
                  </div>
                  </Form.Label>

                <Form.Control
                  disabled
                  type="text"
                  value={data.id.toUpperCase()}
                />

              </Form.Group>
              </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                 <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Tuổi</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Tuổi"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select aria-label="Default select example" 
                  value={gender}   
                  onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom07">
                <Form.Label>SĐT</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom08">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label>Ngày sinh</Form.Label>

                <Form.Control
                  required
                  type="date"
                  value={date}
                  onChange={(e) => { setDate(e.target.value); console.log(e.target.value);}}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>
            </Row>

            <Row className="mb-3" >
              <Form.Group  md="4" controlId="validationCustom01">
                <Form.Label>Mật khẩu</Form.Label>
                <div class="d-flex">
                <Form.Control
                  disabled
                  type="text"
                  value={password}
                />
                <div style={{width: '32px'}}></div>
                <Button style={{width: '20vw'}}  onClick={(e) => {
                  setPassword(genPassword());
                }}>Tạo mật khẩu</Button> 

<div style={{width: '32px'}}>    </div>
                <Button  style={{width: '20vw'}} variant="secondary" onClick={(e) => {
                  setPassword('');
                }}>Hủy</Button> 
                </div>

            
            
              
          
                {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
              </Form.Group>

    
            </Row>

            <Row className="mb-3">
              <Form.Group  md="6" controlId="validationCustom09">
                <Form.Label>Vị trí</Form.Label>
                <Form.Control as="textarea" rows={3} disabled />
              </Form.Group>
              
            </Row>

            <Row className="mb-3">
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
                
                
            </Alert> 
  
     
    
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