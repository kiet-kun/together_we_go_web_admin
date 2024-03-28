import { Modal, Button, Col, Form, InputGroup, Row, Alert, Spinner} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { formatDate } from '../../../../utils/utils';
import { TOAST_TYPE } from '../../../../constanst';
import { addUser } from '../../../../services/user_service';
const AddModal = ({ show, data, handleClose, loadPage, showToast }) => {
  const [date, setDate] = useState(formatDate(new Date().toString()));
  const [name, setName] = useState('');
  const [age, setAge] = useState("20");
  const [gender, setGender] = useState('male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) =>  {
    console.log(date, name, gender, phoneNumber, email, age, password);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setIsLoading(true);
      try {
        event.preventDefault();

        const response = await addUser({date, name, gender, phoneNumber, email, age, password});
        console.log(response);
        if (response.status == 200){
          showToast('Thêm thành công',TOAST_TYPE.success);
          loadPage();  
          handleClose();   
        }
        else {
          showToast(response.data['message'],TOAST_TYPE.danger);
        }
      } catch (error) {
         showToast('Xảy ra lỗi',TOAST_TYPE.danger);
        console.log(error);     
      }
      setIsLoading(false);
    }

    setValidated(true);
  };
  return <>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm người dùng mới</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
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
                Vui lòng nhập
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
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
              {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
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
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Email không hợp lệ
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Ngày sinh</Form.Label>

              <Form.Control
                required
                type="date"
                value={date}
                onChange={(e) => { setDate(e.target.value); console.log(e.target.value); }}
              />
              {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group md="4" controlId="validationCustom01">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback>Hợp lệ</Form.Control.Feedback> */}
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

export default AddModal;