import {
    createBrowserRouter,
    Navigate,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Pet from "../Pages/Pet listing/Pet";
import Login from "../Pages/Login/Login";
import Register from "../Pages/register/Register";
import PrivateRoute from "./PrivateRoute";
import PetDetails from "../Pages/Pet details/PetDetails";
import PetCategory from "../Pages/Home/Pet by category/PetCategory";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import DonationDetails from "../Pages/Donation details/DonationDetails";
import Dashboard from "../Layout/Dashboard";
import AddPet from "../Pages/Dashboard/AddPet";
import MyPets from "../Pages/Dashboard/MyPets";
import AdoptionRequest from "../Pages/Dashboard/AdoptionRequest";
import CreateCampaign from "../Pages/Dashboard/CreateCampaign";
import MyDonations from "../Pages/Dashboard/MyDonations";
import MyCampaigns from "../Pages/Dashboard/MyCampaigns";
import SeeRequest from "../Pages/Dashboard/SeeRequest";
import EditMyPets from "../Pages/Dashboard/EditMyPets";
import EditCampaign from "../Pages/Dashboard/EditCampaign";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllPets from "../Pages/Dashboard/Admin/AllPets";
import AllDonations from "../Pages/Dashboard/Admin/AllDonations";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'donation',
            element: <PrivateRoute><DonationCampaigns></DonationCampaigns></PrivateRoute>
        },
        {
          path: '/pet',
          element: <PrivateRoute><Pet></Pet></PrivateRoute>
      },
      {
        path: '/pet/category/:categoryName',
        element: <PrivateRoute><PetCategory></PetCategory></PrivateRoute> ,
        loader: ({ params }) =>
          fetch(`https://medi-care-cerver.vercel.app/pets/category/${params.categoryName}`)
      },
        {
          path: '/login',
          element: <Login></Login>
      },
        {
          path: '/register',
          element: <Register></Register>
      },
      {
        path:"petDetails/:id",
        element: <PetDetails></PetDetails>,
        loader:({params}) => fetch(`https://medi-care-cerver.vercel.app/pets/${params.id}`)
      },
      {
        path:"donation/:id",
        element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute> ,
        loader:({params}) => fetch(`https://medi-care-cerver.vercel.app/donation-campaigns/${params.id}`)
      },
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children: [
         {
              index: true, 
              element: <Navigate to="addPet" />
            },
         {
            path: 'addPet',
            element: <AddPet></AddPet>
        },
         {
            path: 'myPets',
            element: <MyPets></MyPets>
        },
         {
            path: 'adoptionRequest',
            element: <AdoptionRequest></AdoptionRequest>
        },
         {
            path: 'createCampaign',
            element: <CreateCampaign></CreateCampaign>
        },
         {
            path: 'myCampaigns',
            element: <MyCampaigns></MyCampaigns>
        },
         {
            path: 'myDonations',
            element: <MyDonations></MyDonations>
        },
        
        {
        path:"request/:_id",
        element: <SeeRequest></SeeRequest>,
        loader:({params}) => fetch(`https://medi-care-cerver.vercel.app/pets/${params._id}`)
      },

       {
        path:"edit/:id",
        element: <EditMyPets></EditMyPets>,
        loader:({params}) => fetch(`https://medi-care-cerver.vercel.app/pets/${params.id}`)
      },
       {
        path:"editCampaign/:id",
        element: <EditCampaign></EditCampaign>,
        loader:({params}) => fetch(`https://medi-care-cerver.vercel.app/donation-campaigns/${params.id}`)
      },

      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'allPets',
        element: <AllPets></AllPets>
      },
      {
        path: 'allDonations',
        element: <AllDonations></AllDonations>
      }

       
      ]
    }
  ]);