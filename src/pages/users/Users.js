import React, { useEffect, useState } from "react";
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
import { ReceiptButton } from "../../components/layout/CustomTable";
import { selectAuth } from "../../features/authSlice";
import { useGetUsersMutation } from "../../features/apiSlice";

export default function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
  const [error, setError] = useState(null);
  // const [users,setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const curPageHandler = (p) => setCurPage(p);

  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [users, setUsers] = useState([]);

  // const users = [
  //   {
  //     userId: "user001",
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     selectedModuleCategory: "Finance",
  //     subscriptionPlan: {
  //       planName: "Premium",
  //       amount: 299,
  //     },
  //     profName: "Prof. Smith",
  //     expiryDate: "2024-03-31",
  //   },
  //   {
  //     userId: "user002",
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     selectedModuleCategory: "Marketing",
  //     subscriptionPlan: {
  //       planName: "Standard",
  //       amount: 199,
  //     },
  //     profName: "Prof. Johnson",
  //     expiryDate: "2024-05-15",
  //   },
  //   {
  //     userId: "user003",
  //     name: "Alice Johnson",
  //     email: "alice.johnson@example.com",
  //     selectedModuleCategory: "Information Technology",
  //     subscriptionPlan: {
  //       planName: "Basic",
  //       amount: 99,
  //     },
  //     profName: "Prof. Lee",
  //     expiryDate: "2024-02-20",
  //   },
  //   {
  //     userId: "user004",
  //     name: "Bob Brown",
  //     email: "bob.brown@example.com",
  //     selectedModuleCategory: "Human Resources",
  //     subscriptionPlan: {
  //       planName: "Premium",
  //       amount: 299,
  //     },
  //     profName: "Prof. Davis",
  //     expiryDate: "2024-08-12",
  //   },
  // ];

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
  console.log("no of Page", numOfPages, resultPerPage, usersCount);

  const column = [
    "S.No",
    // "UserId",
    "Name",
    "Email",
    "Selected Module Category",
    "Subscription Plan",
    "Prof. Name",
    "Expiry Date",
    // "Role",
    "Actions",
  ];

  // useTitle("Users");
  // useTitle("User Details");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await getUsers();
      console.log(data.users);
      setUsers(data.users);
    } catch (error) {
      getError(error);
    }
  };
  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <CountCard title={"Total Users"} count={250} />
            <CountCard title={"Newly Added Users"} count={50} />
          </Row>

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
            title="User Details"
          >
            {users &&
              users?.map((user, i) => (
                <tr key={user?._id} className="odd">
                  <td className="text-center">{skip + i + 1}</td>
                  {/* <td>{user?.updatedAt?.slice(0, 10)}</td> */}
                  {/* <td>{user?.userId}</td> */}
                  <td>
                    {user?.first_name} {user?.last_name}
                  </td>
                  <td>{user?.email}</td>
                  <td>Finance</td>
                  <td>{user?.active_transactions[0]?.amount}</td>
                  <td>Prof. Smith</td>
                  <td>{user?.active_transactions[0]?.expiry.split("T")[0]}</td>
                  <td>
                    <ReceiptButton
                      onClick={() => console.log("receipt downloaded")}
                    />
                    <ViewButton
                      onClick={() => navigate(`/admin/users/view-user`)}
                    />
                  </td>
                </tr>
              ))}
          </CustomTable>
        </>
      )}
      <ToastContainer />
    </MotionDiv>
  );
}
