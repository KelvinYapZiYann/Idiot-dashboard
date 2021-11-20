import store from "../store";

export default function authSession({ next, router }) {
    if (!store.getters.isAuthenticated) {
        return router.push({ name: "Login" });
    }
    return next();
}
