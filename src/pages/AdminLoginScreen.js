import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useTitle } from "../components";
import { getError, toastOptions } from "../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../features/loadingSlice";
import axiosInstance from "../utils/axiosUtil";
import { loginUser, selectAuth, setAccessToken, setUser } from "../features/authSlice";
import FormField from "../components/layout/FormField";
import { useLoginAdminMutation } from "../features/apiSlice";

export default function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [loginAdmin,{isLoading}] = useLoginAdminMutation()
  const { accessToken } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const data = await loginAdmin({
        email,
        password
      }).unwrap()

      console.log(data)

      dispatch(setUser(data?.admin));
      dispatch(setAccessToken(data?.token));
      navigate('/admin/dashboard')

    } catch (error) {
      console.log(error)
      getError(error);
    }
     
  };



  useEffect(() => {
    if (accessToken) {
      // setTimeout(() => {
      // }, 2000);
      navigate("/admin/dashboard");
    }
    // if (error) {
    //   toast.error(error, toastOptions);
    // }
  }, [ accessToken]);

  useTitle("Login");
  return (
    <Container fluid className="p-0 vh-100 f-center flex-column login-page">
      <div className="login-logo ">
        <Link to="/" className="text-center">
          <Image src="logo/sciendaLogo.png" height={'50px'} className="border"/> <b className="fs-1 fw-bold" style={{ color: "rgba(0, 0, 139, 1)" }}>
            Scienda
          </b>
        </Link>
      </div>

      <Card className="login-box shadow">
        <Card.Body>
          <p className="text-center">To continue please enter your details</p>
          <Form onSubmit={handleLogin}>
            <FormField
              placeholder={"Enter your Email"}
              type={"email"}
              label={"Email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <FormField
              type={"password"}
              placeholder={"********"}
              label={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Row>
              {/* <Col sm={7} className="mb-sm-0 mb-3">
                 <Form.Group controlId="remember">
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="Remember Me"
                  />
                </Form.Group> 
              </Col> */}
              <Link
                className="text-end "
                style={{ color: "rgba(0, 0, 139, 1)" }}
              >
                Forgot Password?
              </Link>

              <Col className="">
                <hr />
                {isLoading ? (
                  <Button type="submit" className="float-sm-end" disabled>
                    <Spinner animation="border" size="sm" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="float-sm-end w-100 "
                    style={{ background: "rgba(0, 0, 139, 1)" }}
                  >
                    Sign In As Admin
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
