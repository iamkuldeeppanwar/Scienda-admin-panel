import React, { useEffect, useState } from "react";
import { MotionDiv } from "../../components";
import { Card, CardBody, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGetReportStaticsMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";

function Reports() {
  const [getReportStatics, { isLoading }] = useGetReportStaticsMutation();
  const [statics, setStatics] = useState("");

  useEffect(() => {
    fetchStaticsData();
  }, []);

  const fetchStaticsData = async () => {
    try {
      const data = await getReportStatics();
      setStatics(data.data);
    } catch (error) {
      getError(error);
    }
  };

  console.log(statics);

  return (
    <MotionDiv>
      <Container>
        <div
          style={{
            fontWeight: 600,
            fontSize: "24px",
          }}
        >
          Questions
        </div>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <Row>
                  <Col style={{ color: "#475467" }}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Total No. of Questions Prepared
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        {statics.totalNumberOfQuestions &&
                          statics.totalNumberOfQuestions}
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row>
                  <Col style={{ color: "#475467" }}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Total No. of Exams Prepared
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        {statics.totalNumberOfExams &&
                          statics.totalNumberOfExams}
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card className="mb-3" style={{ height: "100%" }}>
              <CardBody>
                <Row>
                  <Col style={{ color: "#475467" }}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Total Users
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        {statics.totalNumberOfUsers &&
                          statics.totalNumberOfUsers}
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Card className="mb-3">
              <CardBody>
                <Row>
                  <Col>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Newly Added Users
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        2240
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card className="mb-3">
              <CardBody>
                <Row>
                  <Col style={{ color: "#475467" }}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Number of Tests Completed
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        {statics.totalNumberOfTestCompleted &&
                          statics.totalNumberOfTestCompleted}
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <div
              style={{
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              Payments Received:
            </div>
            <Card className="mb-3 w-75">
              <CardBody>
                <Row>
                  <Col style={{ color: "#475467" }}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Total Amount Recieved
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        £{" "}
                        {statics.totalamountReceived &&
                          statics.totalamountReceived}
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card className="mb-3" style={{ height: "100%" }}>
              <CardBody>
                <Row>
                  <Col style={{ color: "#475467" }}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      Module Wise Money Received
                    </div>
                  </Col>
                  <Col className="text-end">
                    <BsThreeDotsVertical className="mb-1" size={"0.9rem"} />{" "}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {!isLoading ? (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "33px",
                        }}
                      >
                        2240
                      </div>
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </MotionDiv>
  );
}

export default Reports;
