import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { FaPhoneVolume, FaRegEnvelope } from "react-icons/fa";
import { imgAddr } from "../features/apiSlice";
import { MotionDiv } from "../components";

function ViewProfile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);
  // console.log(user);

  return (
    <MotionDiv>
      <h3 className="text-center my-3">Admin Profile</h3>
      <Row
        className="p-2"
        style={{ backgroundColor: "rgba(238, 244, 255, 1)" }}
      >
        <Col className="text-end">
          <Image
            src={user.profile_url && imgAddr + user.profile_url}
            style={{ aspectRatio: "1/1", height: "90px", borderRadius: "50%" }}
          />
          <br />
        </Col>
        <Col>
          <h3>{user.name && user.name}</h3>
          {/* <p className="m-0">
            <FaPhoneVolume /> +{user.mobile && user.mobile.slice(2)}
          </p> */}
          <p>
            <FaRegEnvelope /> {user.email && user.email}
          </p>
        </Col>
      </Row>
    </MotionDiv>
  );
}

export default ViewProfile;
