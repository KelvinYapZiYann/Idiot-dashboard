import NotFound from "@/pages/NotFoundPage.vue";
import AuthLayout from "@/pages/Layout/AuthLayout.vue";
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import auth from "@/middleware/auth";
import authSession from "@/middleware/authSession";

const Login = () => import("@/pages/Login.vue");
const Register = () => import("@/pages/Register.vue");
const ForgotPassword = () => import("@/pages/ForgotPassword.vue");

const ProfileDetail = () => import("@/pages/Profile/ProfileDetail.vue");
const ProfileEdit = () => import("@/pages/Profile/ProfileEdit.vue");

const Dashboard = () => import("@/pages/Dashboard.vue");
const Stores = () => import("@/pages/Resources/Store/Stores.vue");
const StoreAdd = () => import("@/pages/Resources/Store/StoreAdd.vue");
const StoreEdit = () => import("@/pages/Resources/Store/StoreEdit.vue");
const StoreDetail = () => import("@/pages/Resources/Store/StoreDetail.vue");
const InStoreTraffics = () => import("@/pages/Resources/InStoreTraffic/InStoreTraffics.vue");
const InStoreTrafficAdd = () => import("@/pages/Resources/InStoreTraffic/InStoreTrafficAdd.vue");
const InStoreTrafficEdit = () => import("@/pages/Resources/InStoreTraffic/InStoreTrafficEdit.vue");
const InStoreTrafficDetail = () => import("@/pages/Resources/InStoreTraffic/InStoreTrafficDetail.vue");

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  {
    path: "/",
    component: AuthLayout,
    name: "Authentication",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
        meta: { middleware: authSession }
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
      {
        path: "forgot-password",
        name: "Forgot Password",
        component: ForgotPassword,
      },
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    name: "Others",
    children: [
      {
        path: "profile",
        name: "Profile Detail",
        component: ProfileDetail,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "profile/edit",
        name: "Edit Profile",
        component: ProfileEdit,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    name: "Resources",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "stores",
        name: "Stores",
        component: Stores,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "stores/add",
        name: "Add Store",
        component: StoreAdd,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "stores/:storeId",
        name: "Store Detail",
        component: StoreDetail,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "stores/:storeId/edit",
        name: "Edit Store",
        component: StoreEdit,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "inStoreTraffics",
        name: "In Store Traffics",
        component: InStoreTraffics,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "inStoreTraffics/add",
        name: "Add In Store Traffic",
        component: InStoreTrafficAdd,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "inStoreTraffics/:inStoreTrafficId",
        name: "In Store Traffic Detail",
        component: InStoreTrafficDetail,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
      {
        path: "inStoreTraffics/:inStoreTrafficId/edit",
        name: "Edit In Store Traffic",
        component: InStoreTrafficEdit,
        meta: { middleware: auth },
        props: {
          default: true
        }
      },
    ]
  },
  { 
    path: "*", 
    component: NotFound 
  },
];

export default routes;