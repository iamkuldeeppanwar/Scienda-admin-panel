import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Stack,
  Form,
  Spinner,
} from "react-bootstrap";
import { MotionDiv } from "../../components";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  useAcceptTicketMutation,
  useCloseTicketMutation,
  useGetSingleTicketMutation,
  usePostMessageMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import ModalTemplate from "../../components/modals/ModalTemplate";
import { MdOutlineCancelPresentation } from "react-icons/md";

const TicketChat = () => {
  const { ticketId } = useParams();
  const [getSingleTicket, { isLoading }] = useGetSingleTicketMutation();
  const [closeTicket, { isLoading: isCloseLoading }] = useCloseTicketMutation();
  const [acceptTicket, { isLoading: isStatusLoading }] =
    useAcceptTicketMutation();
  const [postMessage, { isLoading: sendMessageLoading }] =
    usePostMessageMutation();
  const [socket, setSocket] = useState("");
  const [chat, setChat] = useState("");
  const [ticket, setTicket] = useState("");
  const chatContainerRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleShowCancelModal = () => setShowCancelModal(true);
  const handleCloseCancelModal = () => setShowCancelModal(false);

  useEffect(() => {
    getTicket();
  }, [isCloseLoading]);

  useEffect(() => {
    const newSocket = io("https://scienda-socket.onrender.com");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (ticket._id && socket) {
      socket.emit("login", { _id: ticket._id });
    }
  }, [socket, ticket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      console.log(message);
      getTicket();
    });
    return () => socket.off("receiveMessage");
  }, [socket, ticketId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [ticket.chats]);

  const getTicket = async () => {
    try {
      const response = await getSingleTicket(ticketId).unwrap();
      setTicket(response.ticket);
    } catch (error) {
      getError(error);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    try {
      await postMessage({ message: chat, ticketId }).unwrap();
      socket.emit("sendMessage", {
        chat,
        ticket: ticketId,
        isAdmin: true,
      });
      setChat("");
      getTicket();
    } catch (error) {
      getError(error);
    }
  };

  // ====== Time and date ===========

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }

  function formatTime(dateString) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", options);
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const handleStatus = async (e) => {
    try {
      if (e.target.value === "Open") {
        await acceptTicket(ticketId);
        getTicket();
      }
    } catch (error) {
      getError(error);
    }
  };

  const closeTicketHandler = () => {
    handleShowCancelModal();
  };

  const handleDelete = async () => {
    try {
      await closeTicket(ticketId);
      handleCloseCancelModal();
    } catch (error) {
      getError(error);
    }
  };

  // console.log(ticket);

  return (
    <MotionDiv>
      <Container>
        <ModalTemplate
          show={showCancelModal}
          onHide={handleCloseCancelModal}
          title={`issue resolved ? Are you sure you want to close ticket?`}
          onDiscard={handleCloseCancelModal}
          onConfirm={handleDelete}
          color={true}
          buttonConfirmTxt={true}
          buttonCancelTxt={true}
        />

        <div className="d-flex gap-2 pointer">
          <Link className="back_txt" to="/admin/tickets">
            <IoMdArrowBack size={22} />
            <span>Back</span>
          </Link>
        </div>

        <Row className="px-3 mt-1">
          <Col>
            <div className="d-flex align-items-center gap-4">
              <img
                className="chat_avtar"
                src="data:image/png;base64,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"
                alt="..."
              />
              <div>
                <div>{ticket.to && ticket.to?.name}</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column justify-content-between gap-2 mt-1 status_txt">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="issue_raised_txt">Issue Raised :</div>
                  <div>{ticket.subject && ticket.subject}</div>
                </div>
                {ticket.status && ticket.status !== "Closed" && (
                  <Button
                    onClick={closeTicketHandler}
                    style={{
                      backgroundColor: "#6172F3",
                      border: "none",
                      minWidth: "max-content",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.75rem",
                      height: "2.5rem",
                    }}
                  >
                    Close Ticket <MdOutlineCancelPresentation size={22} />
                  </Button>
                )}
              </div>

              <div>
                <div
                  style={{
                    width: "100%",
                    height: "50px",
                    overflowY: "scroll",
                  }}
                >
                  {!isLoading ? (
                    ticket.description && ticket.description
                  ) : (
                    <Spinner size="sm" />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="px-3 mt-1">
          <Col>
            {ticket.status && ticket.status === "Pending" && (
              <div className="d-flex flex-wrap gap-2">
                <div className="head_text">Change Status</div>
                <select onChange={handleStatus} className="select_status">
                  <option value="Closed">Close</option>
                  <option value="Open">Open</option>
                </select>
              </div>
            )}
          </Col>
          <Col>
            <div className="d-flex flex-wrap gap-2 justify-content-end">
              <div className="head_text">Raised On:</div>
              <div className="date">
                {ticket.createdAt && formatDate(ticket.createdAt)}
              </div>
            </div>
            <div className="text-end">
              {ticket.createdAt && formatTime(ticket.createdAt)}
            </div>
          </Col>
        </Row>

        <div className="p-4">
          <div
            className="p-3 pt-5 bg-white rounded-xl chat_box_container"
            style={{
              border: "1px solid #EFEFEF",
              boxShadow: "0px 4px 12px 0px #0000000A",
            }}
            ref={chatContainerRef}
          >
            {ticket.status && ticket.chats.length > 0 ? (
              ticket.chats.map((data) => {
                return (
                  <div
                    key={data._id}
                    className={`${
                      data.from === user._id
                        ? "d-flex flex-row-reverse"
                        : "d-flex flex-row-start w-50"
                    } mt-3 `}
                  >
                    <div className="me-2">
                      <p
                        className="my-0 p-4"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 400,
                          backgroundColor: "#EEEEEE",
                          borderRadius: "22px",
                          borderTopRightRadius: "4px",
                        }}
                      >
                        {data.message}
                      </p>
                      <p
                        className="my-1 text-end"
                        style={{
                          fontWeight: 400,
                          fontSize: "0.75rem",
                          color: "#797979",
                        }}
                      >
                        Sent at :{" "}
                        <span style={{ fontWeight: 300 }}>
                          {formatDateTime(data.date)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No Chats Found!</div>
            )}
          </div>
        </div>

        {ticket.status && ticket.status !== "Closed" && (
          <div className=" rounded-xl">
            <Form onSubmit={handleChat}>
              <Form.Group className="px-4 mx-auto">
                <Stack direction="horizontal" gap={3}>
                  <Form.Control
                    type="text"
                    value={chat}
                    required
                    onChange={(e) => setChat(e.target.value)}
                    placeholder="Write something here..."
                    className="py-2 px-3"
                    style={{
                      border: "1px solid #8098F9",
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={sendMessageLoading}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      border: "none",
                      minWidth: "max-content",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    {sendMessageLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <span className="me-2">Send</span>
                    )}
                    {/* <FlyingArrowIcon /> */}
                  </Button>
                </Stack>
              </Form.Group>
            </Form>
          </div>
        )}
      </Container>
    </MotionDiv>
  );
};

export default TicketChat;
