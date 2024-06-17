import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { getError } from "../utils/error";
import FormField from "../components/layout/FormField";
import {
  useForgetPasswordMutation,
  useNewPasswordMutation,
  useSubmitOTPMutation,
} from "../features/apiSlice";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPasswords, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [otpCheck, setOTPCheck] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [
    newPassword,
    {
      isLoading: { newPasswordLoading },
    },
  ] = useNewPasswordMutation();
  const [
    submitOTP,
    {
      isLoading: { otpLoading },
    },
  ] = useSubmitOTPMutation();

  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputs = useRef([]);
  const [otps, setOtps] = useState(0);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 4 - 1) {
      inputs.current[index + 1].focus();
    }
    setOtps(newOtp.join(""));
  };

  const handleKeyUp = (e, index) => {
    if (e.keyCode === 8 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleForget = async (e) => {
    e.preventDefault();
    if (!check && !otpCheck) {
      try {
        await forgetPassword({ email }).unwrap();
        localStorage.setItem("email", email);
        setCheck(true);
        return;
      } catch (error) {
        getError(error);
        return;
      }
    }

    if (!otpCheck) {
      try {
        const mail = localStorage.getItem("email");
        await submitOTP({ email: mail, otp: otps }).unwrap();
        setOTPCheck(true);
        return;
      } catch (error) {
        getError(error);
        return;
      }
    }

    if (check && otpCheck) {
      try {
        const mail = localStorage.getItem("email");
        await newPassword({ email: mail, password: newPasswords }).unwrap();
        navigate("/");
      } catch (error) {
        getError(error);
      }
    }
  };

  return (
    <Container fluid className="p-0 vh-100 f-center flex-column login-page">
      <div className="login-logo ">
        <Link to="/" className="text-center">
          <Image
            src="logo/sciendaLogo.png"
            height={"50px"}
            className="border"
          />{" "}
          <b className="fs-1 fw-bold" style={{ color: "rgba(0, 0, 139, 1)" }}>
            Scienda
          </b>
        </Link>
      </div>

      <Card className="login-box shadow">
        <Card.Body>
          <p className="text-center">To continue please enter your details</p>
          <Form onSubmit={handleForget}>
            {!check ? (
              <FormField
                placeholder={"Enter your Email"}
                type={"email"}
                label={"Email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            ) : (
              <>
                {!otpCheck ? (
                  <>
                    <div>We sent a verification link to </div>
                    <div className="otp-input mb-3">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={data}
                          onChange={(e) => handleChange(e.target, index)}
                          onKeyUp={(e) => handleKeyUp(e, index)}
                          ref={(el) => (inputs.current[index] = el)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <FormField
                      placeholder={"Enter your Password"}
                      type={"password"}
                      label={"New Password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPasswords}
                    />
                    <FormField
                      placeholder={"Enter your Confirm Password"}
                      type={"password"}
                      label={"Confirm Password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </>
                )}
              </>
            )}

            <Row>
              <Col className="">
                <hr />
                {isLoading || otpLoading || newPasswordLoading ? (
                  <Button type="submit" className="float-sm-end" disabled>
                    <Spinner animation="border" size="sm" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="float-sm-end w-100 "
                    style={{ background: "rgba(0, 0, 139, 1)" }}
                  >
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
          <ToastContainer />
        </Card.Body>
      </Card>
    </Container>
  );
}
