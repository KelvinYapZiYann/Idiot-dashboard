import NotFound from "@/pages/NotFoundPage.vue";
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

const Dashboard = () => import("@/pages/Dashboard.vue");

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
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
        // meta: { middleware: auth },
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