import React, {  useEffect, useState } from "react";
import { getProfile, updateProfile } from "../states/actions";
import { EditForm, TextInput } from "../components";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../utils/error";
import { hideLoading, showLoading } from "../features/loadingSlice";
import axiosInstance from "../utils/axiosUtil";
import { userSignin } from "../features/userSlice";

export default function EditProfileModel(props) {
  

  const {token} = useSelector((state)=>state.user);
  const {isLoading} = useSelector((state)=>state.loading);
  const [error,setError]=useState(null);
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [user,setUser] = useState(null);
  const dispatch = useDispatch();

  const userData = {
    email: "",
    fullname: "",
    mobile: "",
    
  };
  const userAttr = [
    {
      type: "text",
      props: {
        label: "Fullname",
        name: "fullname",
      }
    },
   
    {
      type: "text",
      props: {
        label: "Email",
        name: "email",
        required: true,
      }
    },
    {
      type: "text",
      props: {
        label: "Mobile No.",
        name: "mobile",
      }
    },
    
  ]
  const [info, setInfo] = useState(userData);
  
  
  

  useEffect(() => {

    const getProfile = async()=>{

        try {
          dispatch(showLoading());
          const response = await axiosInstance.get('/api/user/profile',{
            headers:{
              Authorization: token,
            }
          });
          console.log(response);
    const {user}= response.data;
           setUser(user)
          
    
          dispatch(hideLoading());
          
        } catch (error) {
          dispatch(hideLoading());
          setError(getError(error));
        }
      }
    if (user) {
      console.log({ user })
      setInfo({
        email: user.email,
        fullname: user.fullname,
        mobile: user.mobile,
        
      });
    }

    (async () => {
        await getProfile();
      })();
    
  }, [token, props.show]);

  const resetForm = () => { setInfo(userData); };
  const submitHandler = async (e) => {
    e.preventDefault();


    try {
        dispatch(showLoading());
        const response = await axiosInstance.put('/api/admin/update',{
            fullname: info.firstname,
            email: info.email,
            mobile: info.mobile,
        },{
            headers:{
                Authorization: token,
            }
        })
        dispatch(hideLoading());
   const {user,success} = response.data;

        if (success) {
            setUpdateSuccess(success);
            resetForm();
           // dispatch(userSignin(user,token))
          }

    } catch (error) {
       dispatch(hideLoading());
       setError(getError(error));;

    }


    
  };

  return (
    <EditForm
      {...props}
      title="Update Profile"
      data={info}
      setData={setInfo}
      inputFieldProps={userAttr}
      submitHandler={submitHandler}
      target=""
      successMessage="User Updated Successfully! Redirecting..."
      reducerProps={{ isLoading, error, updateSuccess }}
    >
      

      
    </EditForm>
  );
}