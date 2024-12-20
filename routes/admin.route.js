// import express from "express";
// import { singInPage, signInAction } from "../controllar/admin.controllar.js";
// const router = express.Router();

// // http://localhost:3000/admin/sign-in
// router.get("/sign-in",singInPage);
// router.post("/sign-in",signInAction);
// export default router;
import express from "express";
import { singInPage, signInAction, dashboardPageAction, } from "../controllar/admin.controllar.js";
import { verify } from "../middleware/auth.js";
// import router from "./product.route.js";
// import cat_router from "./category.route.js";
const router = express.Router();

// http://localhost:3000/admin/sign-in
router.get("/sign-in",singInPage);
router.post("/sign-in",signInAction);
router.get("/dashboard",verify,dashboardPageAction)

export default router;  