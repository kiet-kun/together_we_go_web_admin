import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BlockModal = ({show, data, handleClose, loadPage }) => {
    return  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn muốn khóa người dùng {data.firstName}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default BlockModal;