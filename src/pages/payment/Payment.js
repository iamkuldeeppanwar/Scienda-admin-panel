
import React, {  useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  MessageBox,
  useTitle,
  MotionDiv,
  CustomTable,
  ViewButton,
  DeleteButton,
} from "../../components";
import { getError, toastOptions } from "../../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import axiosInstance from "../../utils/axiosUtil";
import { Col, Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import { selectAuth } from "../../features/authSlice";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
  const {isLoading} = useSelector((state)=>state.loading);  
  const [error,setError] = useState(null);
  // const [users,setUsers] = useState([]);
  const [usersCount,setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const curPageHandler = (p) => setCurPage(p);

  const users = [
    {
      "userId": "user001",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "selectedModuleCategory": "Finance",
      "subscriptionPlan": {
        "planName": "Premium",
        "amount": 299
      },
      "profName": "Prof. Smith",
      "expiryDate": "2024-03-31"
    },
    {
      "userId": "user002",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "selectedModuleCategory": "Marketing",
      "subscriptionPlan": {
        "planName": "Standard",
        "amount": 199
      },
      "profName": "Prof. Johnson",
      "expiryDate": "2024-05-15"
    },
    {
      "userId": "user003",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "selectedModuleCategory": "Information Technology",
      "subscriptionPlan": {
        "planName": "Basic",
        "amount": 99
      },
      "profName": "Prof. Lee",
      "expiryDate": "2024-02-20"
    },
    {
      "userId": "user004",
      "name": "Bob Brown",
      "email": "bob.brown@example.com",
      "selectedModuleCategory": "Human Resources",
      "subscriptionPlan": {
        "planName": "Premium",
        "amount": 299
      },
      "profName": "Prof. Davis",
      "expiryDate": "2024-08-12"
    }
  ]
  

// useEffect(()=>{
    
//     const fetchUsers = async()=>{

//         let url =`/api/admin/users/?resultPerPage=${resultPerPage}&currentPage=${curPage}`;
//         try {
//             dispatch(showLoading());
//              const response = await axiosInstance.get(url,{
//                 headers:{
//                     Authorization: token
//                 }
//              });
//              console.log(response);
//              const {users,usersCount} = response.data;   
//              setUsers(users);
//              setUsersCount(usersCount);
//             dispatch(hideLoading());

//         } catch (error) {
//            setError(getError(error));
//             dispatch(hideLoading());
//         }
//     }

//     fetchUsers();

// },[token,resultPerPage,curPage]);


  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  console.log("no of Page", numOfPages, resultPerPage,usersCount);

  const column = [
    "S.No",
    "UserId",
    "User Name",
    "Email",
    "Area of Speciality selected",
    "Payment Received",
    "Prof. Name",
    "Actions"
  ];

  // useTitle("Users");
  // useTitle("User Details");
  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( 
        <>
      

        <CustomTable
          loading={isLoading}
          column={column}
          rowNo={resultPerPage}
          rowProps={{ setResultPerPage }}
          paging={numOfPages > 0}
          pageProps={{ numOfPages, curPage }}
          pageHandler={curPageHandler}
           search={true}
           searchProps={{ searchInput, setSearchInput, setQuery }}
          isTitle="true"
          
          title="Payment details"
        >
          {users &&
            users?.map((user, i) => (
              <tr key={user?._id} className="odd">
                <td className="text-center">{skip + i + 1}</td>
                <td>{user?.userId}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.selectedModuleCategory}</td>
                <td className="text-center">{user?.subscriptionPlan?.amount}</td>
                <td>{user?.profName}</td>
                {/* <td>{user.role}</td> */} 
                <td className="text-center">
                  <ViewButton
                    onClick={() => navigate(`/admin/users/view-user`)}
                  />
                  <DeleteButton onClick={() =>{
                    //  deleteUser(user?._id)
                     console.log('deleted')
                  }}
           />
                </td> 
              </tr>
            ))}
        </CustomTable>
        </>
      )}
    </MotionDiv>
  );
}
