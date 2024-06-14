import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AdminProtectedRoute, UnprotectedRoute } from "./routes";
import { Header, Footer, SideNavBar, NotFound } from "./components";
import { AdminLoginScreen, Dashboard } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import Users from "./pages/users/Users";
import Prof from "./pages/Prof/Prof";
import ViewUser from "./pages/users/ViewUser";
import Domains from "./pages/domains/Domains";
import Questions from "./pages/questions/Questions";
import Tests from "./pages/tests/Tests";
import { ToastContainer } from "react-toastify";
import Payment from "./pages/payment/Payment";
import Tickets from "./pages/tickets/Tickets";
import GetPages from "./pages/contentManagement/GetPages";
import Reports from "./pages/reports/Reports";
import Plans from "./pages/plans/Plans";
import ViewAmountDetails from "./pages/plans/ViewAmountDetails";
import ListOfDomains from "./pages/domains/ListOfDomains";
import CreateTest from "./pages/tests/CreateTest";
import TopicSubtopic from "./pages/domains/TopicSubtopic";
import ListOfTopics from "./pages/domains/ListOfTopics";
import ListOfSubtopics from "./pages/domains/ListOfSubtopic";
import ListOfAreaOfSpeciality from "./pages/domains/ListOfAreaOfSpecialty";
import AddEditDomain from "./pages/domains/AddEditDomain";
import AddEditProf from "./pages/Prof/AddEditProf";
import { selectAuth } from "./features/authSlice";
import DetailedTickets from "./pages/tickets/DetailedTickets";
import TextEditor from "./components/layout/TextEditor";
import AddEditQuestion from "./pages/questions/AddEditQuestion";
import AddEditPage from "./pages/contentManagement/AddEditPage";
import ViewSummary from "./pages/domains/ViewSummary";
import TicketChat from "./pages/tickets/TicketChat";
import ViewUserReport from "./pages/reports/ViewUserReport";
import ViewModuleReport from "./pages/reports/ViewModuleReport";
import ViewPayment from "./pages/payment/ViewPayment";

function App() {
  const { accessToken } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const pageLocation = useLocation();

  const [isExpanded, setExpandState] = useState(window.innerWidth > 768);
  const sidebarHandler = () => setExpandState((prev) => !prev);

  useEffect(async () => {
    //  await getOptions({dispatch:dispatch ,token:isLoggedIn});
    console.log(accessToken);
  }, [accessToken]);

  const routeList = [
    { path: "/admin/dashboard", comp: <Dashboard /> },

    { path: "/admin/users", comp: <Users /> },
    { path: "/admin/users/view-user", comp: <ViewUser /> },

    { path: "/admin/profs", comp: <Prof /> },
    { path: "/admin/profs/add-prof", comp: <AddEditProf /> },
    { path: "/admin/profs/edit-prof/:id", comp: <AddEditProf /> },

    { path: "/admin/domains", comp: <Domains /> },
    { path: "/admin/domains/add-specialty", comp: <AddEditDomain /> },
    { path: "/admin/domains/edit-specialty/:id", comp: <AddEditDomain /> },
    { path: "/admin/domains/topic-subtopic/:id", comp: <TopicSubtopic /> },
    { path: "/admin/domains/all-domains", comp: <ListOfDomains /> },
    {
      path: "/admin/domains/all-specialties/:id",
      comp: <ListOfAreaOfSpeciality />,
    },
    { path: "/admin/domains/all-topics/:id", comp: <ListOfTopics /> },
    { path: "/admin/domains/all-subtopics/:id", comp: <ListOfSubtopics /> },
    { path: "/admin/domains/summary", comp: <ViewSummary /> },

    { path: "/admin/questions", comp: <Questions /> },
    { path: "/admin/questions/add-question", comp: <AddEditQuestion /> },
    { path: "/admin/questions/edit-question/:id", comp: <AddEditQuestion /> },

    { path: "/admin/tests", comp: <Tests /> },
    { path: "/admin/tests/create-test", comp: <CreateTest /> },
    { path: "/admin/tests/edit-test/:id", comp: <CreateTest /> },

    { path: "/admin/payment", comp: <Payment /> },
    { path: "/admin/payment/view", comp: <ViewPayment /> },

    { path: "/admin/manage-plans", comp: <Plans /> },
    { path: "/admin/manage-plans/edit-domain", comp: <AddEditDomain /> },
    { path: "/admin/manage-plans/view", comp: <ViewAmountDetails /> },

    { path: "/admin/reports", comp: <Reports /> },
    { path: "/admin/reports/users", comp: <ViewUserReport /> },
    { path: "/admin/reports/module", comp: <ViewModuleReport /> },

    { path: "/admin/content-management", comp: <GetPages /> },
    { path: "/admin/content-management/add-page", comp: <AddEditPage /> },
    { path: "/admin/content-management/edit-page/:id", comp: <AddEditPage /> },

    { path: "/admin/tickets", comp: <Tickets /> },
    { path: "/admin/tickets/details", comp: <DetailedTickets /> },
    { path: "/admin/ticket/chat/:ticketId", comp: <TicketChat /> },

    { path: "/admin/editor", comp: <TextEditor /> },
  ];

  return (
    <div className="main-wrapper">
      {isExpanded && accessToken && (
        <div className="sidebar-overlay" onClick={sidebarHandler}></div>
      )}
      <div className="sidebar-wrapper">
        <SideNavBar isExpanded={isExpanded} />
      </div>
      <div
        className={`body-wrapper ${isExpanded ? "mini-body" : "full-body"} 
        ${accessToken ? "" : "m-0"} d-flex flex-column`}
      >
        <Header sidebarHandler={sidebarHandler} />
        <Routes location={pageLocation} key={pageLocation.pathname}>
          <Route
            path="/"
            element={
              <UnprotectedRoute>
                <AdminLoginScreen />
              </UnprotectedRoute>
            }
          />

          {routeList.map(({ path, comp }) => (
            <Route
              key={path}
              path={path}
              element={<AdminProtectedRoute>{comp}</AdminProtectedRoute>}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
