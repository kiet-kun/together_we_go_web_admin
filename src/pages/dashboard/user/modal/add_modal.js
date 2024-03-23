import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddModal = ({show, data, handleClose }) => {
    return  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm người dùng mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>content</Modal.Body>
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

export default AddModal;