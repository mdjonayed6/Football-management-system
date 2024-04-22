import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/ui/ErrorPage";
import App from "../App";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Login from "../shared/Login/Login";
import Register from "../shared/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Profile/Profile";
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import Users from "../pages/Dashboard/Users/Users";
import EditUser from "../pages/Dashboard/Users/EditUser";
import ViewRoles from "../pages/Dashboard/Roles/ViewRoles";
import CreateRoles from "../pages/Dashboard/Roles/CreateRoles";
import ViewTeams from "../pages/Dashboard/Teams/ViewTeams";
import CreateTeams from "../pages/Dashboard/Teams/CreateTeams";
import EditTeams from "../pages/Dashboard/Teams/EditTeams";
import ViewPlayers from "../pages/Dashboard/Players/ViewPlayers";
import EditPlayers from "../pages/Dashboard/Players/EditPlayers";
import CreatePlayers from "../pages/Dashboard/Players/CreatePlayers";
import CreateMatch from "../pages/Dashboard/Matches/CreateMatch";
import ViewMatches from "../pages/Dashboard/Matches/ViewMatches";
import EditMatches from "../pages/Dashboard/Matches/EditMatches";
import Fixtures from "../pages/Fixtures/Fixtures";
import RegisteredPlayers from "../pages/RegisteredPlayers/RegisteredPlayers";
import RegisterPlayerDetails from "../pages/RegisteredPlayers/RegisterPlayerDetails";
import CreateResults from "../pages/Dashboard/Results/CreateResults";
import ViewResults from "../pages/Dashboard/Results/ViewResults";
import EditResult from "../pages/Dashboard/Results/EditResult";
import AdminRoutes from "../PrivateRoutes/AdminRoutes";
import RefereeRoutes from "../PrivateRoutes/RefereeRoutes";
import CoachRoutes from "../PrivateRoutes/CoachRoutes";
import ViewUsers from "../pages/Dashboard/Players/ViewUsers";
import ViewMyPlayer from "../pages/Dashboard/Players/ViewMyPlayer";
import ResultTable from "../pages/ResultTable/ResultTable";
import ViewTeamsRef from "../pages/Dashboard/Matches/ViewTeamsRef";
import MyTeam from "../pages/Dashboard/Players/MyTeam";
import PlayerList from "../pages/Dashboard/Users/players/PlayerList";
import CoachList from "../pages/Dashboard/Users/players/CoachList";
import RefereeList from "../pages/Dashboard/Users/players/RefereeList";
import MyTeamPlayer from "../pages/Dashboard/Players/MyTeamPlayer";
import Notices from "../pages/notices/Notices";
import Notice from "../pages/Dashboard/Notice/Notice";
import CreateNotice from "../pages/Dashboard/Notice/CreateNotice";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../pages/Home/Section5/BlogDetails";
import BlogsList from "../pages/Dashboard/Blogs/BlogsList";
import CreateBlog from "../pages/Dashboard/Blogs/CreateBlog";
import EditBlog from "../pages/Dashboard/Blogs/EditBlog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />  //Insert your Home  Page component here
            },
            {
                path: "/about",
                element: <About />,  //Insert your About Page component here
            },
            {
                path: "/notices",
                element: <Notices />,  //Insert your About Page component here
            },
            {
                path: "/blogs",
                element: <Blogs />,  //Insert your About Page component here
            },
            {
                path: "/blogs/:id",
                element: <BlogDetails />,  //Insert your About Page component here
            },
            {
                path: "/dashboard",
                element: <PrivateRoutes> <DashboardLayout /></PrivateRoutes>,
                children: [
                    {
                        path: "",
                        element: <PrivateRoutes><Dashboard /></PrivateRoutes>
                    },
                    {
                        path: "myteam",
                        element: <PrivateRoutes><MyTeam /></PrivateRoutes>
                    },
                    {
                        path: "my-team-player/:id",
                        element: <PrivateRoutes><MyTeamPlayer /></PrivateRoutes>
                    },
                    {
                        path: "view-users",
                        element: <AdminRoutes><Users /></AdminRoutes>
                    },
                    {
                        path: "notice",
                        element: <AdminRoutes><Notice /></AdminRoutes>
                    },
                    {
                        path: "create-notice",
                        element: <AdminRoutes><CreateNotice /></AdminRoutes>
                    },
                    {
                        path: "view-player-list",
                        element: <AdminRoutes><PlayerList /></AdminRoutes>
                    },
                    {
                        path: "view-coach-list",
                        element: <AdminRoutes><CoachList /></AdminRoutes>
                    },
                    {
                        path: "view-referee-list",
                        element: <AdminRoutes><RefereeList /></AdminRoutes>
                    },
                    {
                        path: "edit-user/:id",
                        element: <AdminRoutes><EditUser /></AdminRoutes>
                    },
                    {
                        path: "view-roles",
                        element: <AdminRoutes><ViewRoles /></AdminRoutes>
                    },
                    {
                        path: "create-roles",
                        element: <AdminRoutes><CreateRoles /></AdminRoutes>
                    },
                    {
                        path: "view-teams",
                        element: <AdminRoutes><ViewTeams /></AdminRoutes>
                    },
                    {
                        path: "create-teams",
                        element: <AdminRoutes><CreateTeams /></AdminRoutes>
                    },
                    {
                        path: "edit-teams/:id",
                        element: <AdminRoutes><EditTeams /></AdminRoutes>
                    },
                    {
                        path: "blogs",
                        element: <AdminRoutes><BlogsList /></AdminRoutes>
                    },
                    {
                        path: "create-blog",
                        element: <AdminRoutes><CreateBlog /></AdminRoutes>
                    },
                    {
                        path: "edit-blog/:id",
                        element: <AdminRoutes><EditBlog /></AdminRoutes>
                    },
                    {
                        path: "view-players",
                        element: <CoachRoutes><ViewPlayers /></CoachRoutes>
                    },
                    {
                        path: "view-my-players",
                        element: <CoachRoutes><ViewMyPlayer /></CoachRoutes>
                    },
                    {
                        path: "view-all-users",
                        element: <CoachRoutes><ViewUsers /></CoachRoutes>
                    },
                    {
                        path: "edit-players/:id",
                        element: <CoachRoutes><EditPlayers /></CoachRoutes>
                    },
                    {
                        path: "create-players",
                        element: <CoachRoutes><CreatePlayers /></CoachRoutes>
                    },
                    {
                        path: "create-match",
                        element: <AdminRoutes><CreateMatch /></AdminRoutes>
                    },
                    {
                        path: "view-matches",
                        element: <AdminRoutes><ViewMatches /></AdminRoutes>
                    },
                    {
                        path: "view-referee-teams",
                        element: <RefereeRoutes><ViewTeamsRef /></RefereeRoutes>
                    },
                    {
                        path: "edit-matches/:id",
                        element: <AdminRoutes><EditMatches /></AdminRoutes>
                    },
                    {
                        path: "create-results",
                        element: <RefereeRoutes><CreateResults /></RefereeRoutes>
                    },
                    {
                        path: "view-results",
                        element: <RefereeRoutes><ViewResults /></RefereeRoutes>
                    },
                    {
                        path: "edit-results/:id",
                        element: <RefereeRoutes><EditResult /></RefereeRoutes>
                    },
                ]
            },
            {
                path: "/profile",
                element: <PrivateRoutes><Profile /></PrivateRoutes>
            },
            {
                path: "/fixtures",
                element: <Fixtures />
            },
            {
                path: "/players",
                element: <RegisteredPlayers />
            },
            {
                path: "/players/:id",
                element: <RegisterPlayerDetails />
            },
            {
                path: "/result-table",
                element: <ResultTable />
            }
            // Include others routes here;
            //................................................................
            //................................................................
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
    ,
    {
        path: "/register",
        element: <Register />
    }
]);

export default router;