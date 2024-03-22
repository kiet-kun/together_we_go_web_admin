import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ViewModal = ({show, data, handleClose }) => {
    return  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default ViewModal;