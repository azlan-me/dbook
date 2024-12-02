import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Appointments from "@/pages/Appointments";
import NewAppointment from "@/pages/NewAppointment";
import AppointmentDetails from "@/pages/AppointmentDetails";
import Patients from "@/pages/Patients";
import PatientDetails from "@/pages/PatientDetails";
import CreateUser from "@/pages/CreateUser";
import ManageUsers from "@/pages/ManageUsers";
import EditUser from "@/pages/EditUser";
import Locations from "@/pages/Locations";
import AddLocation from "@/pages/AddLocation";
import EditLocation from "@/pages/EditLocation";
import Settings from "@/pages/Settings";
import PriorAuthorizations from "@/pages/PriorAuthorizations";
import PriorAuthDetails from "@/pages/PriorAuthDetails";

// Simple auth check
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute><Index /></PrivateRoute>,
  },
  {
    path: "/appointments",
    element: <PrivateRoute><Appointments /></PrivateRoute>,
  },
  {
    path: "/appointments/new",
    element: <PrivateRoute><NewAppointment /></PrivateRoute>,
  },
  {
    path: "/appointments/details/:id",
    element: <PrivateRoute><AppointmentDetails /></PrivateRoute>,
  },
  {
    path: "/patients",
    element: <PrivateRoute><Patients /></PrivateRoute>,
  },
  {
    path: "/patients/:id",
    element: <PrivateRoute><PatientDetails /></PrivateRoute>,
  },
  {
    path: "/manage-users",
    element: <PrivateRoute><ManageUsers /></PrivateRoute>,
  },
  {
    path: "/manage-users/create",
    element: <PrivateRoute><CreateUser /></PrivateRoute>,
  },
  {
    path: "/manage-users/edit/:id",
    element: <PrivateRoute><EditUser /></PrivateRoute>,
  },
  {
    path: "/locations",
    element: <PrivateRoute><Locations /></PrivateRoute>,
  },
  {
    path: "/locations/add",
    element: <PrivateRoute><AddLocation /></PrivateRoute>,
  },
  {
    path: "/locations/edit/:id",
    element: <PrivateRoute><EditLocation /></PrivateRoute>,
  },
  {
    path: "/settings",
    element: <PrivateRoute><Settings /></PrivateRoute>,
  },
  {
    path: "/prior-auth",
    element: <PrivateRoute><PriorAuthorizations /></PrivateRoute>,
  },
  {
    path: "/prior-auth/:id",
    element: <PrivateRoute><PriorAuthDetails /></PrivateRoute>,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];
