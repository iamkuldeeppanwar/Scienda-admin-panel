import React from "react";
import { Modal, Image, Button, Row, Col, Spinner } from "react-bootstrap";

function ModalTemplate({
  show,
  onHide,
  src,
  title,
  description,
  onDiscard,
  onConfirm,
  loading = false,
  // color,
  buttonConfirmTxt,
  buttonCancelTxt,
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="text-center">
        <Image src={src} className="my-2" />
        <h5>{title}</h5>
        <p>{description}</p>
        <Row>
          <Col>
            {onDiscard && (
              <Button
                variant="transparent"
                className="add-btn w-100 m-1"
                onClick={onDiscard}
              >
                {buttonCancelTxt ? "Keep Open" : "Discard"}
              </Button>
            )}
          </Col>
          <Col>
            {onConfirm && (
              <Button
                variant="transparent"
                className="blue-btn w-100 m-1"
                disabled={loading}
                onClick={onConfirm}
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : buttonConfirmTxt ? (
                  "Yes Close it"
                ) : (
                  "Confirm"
                )}
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalTemplate;
