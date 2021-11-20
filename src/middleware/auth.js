import store from "../store";

export default function authSession({ next, router }) {
    if (!store.getters['auth/isAuthenticated']) {
        return router.push({ name: "Login" });
    }
    return next();
}
