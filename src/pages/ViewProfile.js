import React, {  useEffect,  useState } from "react";
import { ToastContainer } from "react-toastify";


import { useTitle, ViewCard } from "../components";
import EditProfileModel from "./UpdateProfile";
import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../features/loadingSlice";
import { getError } from "../utils/error";
import axiosInstance from "../utils/axiosUtil";



const keyProps = {
  "Email": "email", "Fullname": "fullname", "Mobile No.": "mobile", "Role": "role", "Created At": "createdAt", "Last Update": "updatedAt"
};

const Details = ({ title, loading, data, detailKey, fields }) => {
  const keyList = Object.entries(fields);

  // console.log({ loading, data, detailKey, fields })
  return (
    <>
      <u><h4 className="mt-3">{title}</h4></u>
      <Row>
        {keyList && keyList.map(([k, attr]) => {
          // console.log({ k, attr })
          return (
            <Col key={k} md={4}>
              <p className="mb-0">
                <strong>{k}</strong>
              </p>
              <p>{loading ? <Skeleton /> : data[detailKey][attr]}</p>
            </Col>
          )
        })}
      </Row>
    </>
  )
};

const ViewProfile = () => {
  
  const {token} = useSelector((state)=>state.user);
  const {isLoading} = useSelector((state)=>state.loading);

  const dispatch = useDispatch();
  const [error,setError]= useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [user,setUser] = useState("");
  const [success,setSuccess] = useState(false);
  
  const getProfile = async()=>{

    try {
      dispatch(showLoading());
      const response = await axiosInstance.get('/api/user/profile',{
        headers:{
          Authorization: token,
        }
      });
      console.log(response);
const {user,success}= response.data;
       setUser(user)

       setSuccess(success)

      dispatch(hideLoading());
      
    } catch (error) {
      dispatch(hideLoading());
      setError(getError(error));
    }
  }

  console.log({ error, user })

  useEffect(() => {

    getProfile()
    // setUser(user);
  }, [token]);

  useTitle("Profile Details");
  return (

      
       <ViewCard
      title={"Profile Details"}
      data={user}
      setModalShow={setModalShow}
      keyProps={keyProps}
      
      reducerProps={{ error, isLoading, success }}
    >
       {/* <Details
        title="Address Details"
        loading={isLoading}
        data={user}
        detailKey="addr"
        fields={{ "Address": "address", "City": "city", "Postcode": "postcode" }}
      />  */}
      <EditProfileModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        reload={async () => { await getProfile() }}
      />
      {!modalShow && <ToastContainer />}
    </ViewCard>
   
    
    
  );
};

export default ViewProfile;