import express from "express";
import { addProductAction, addProductPage ,viewproductAction, deleteProduct, editProductPage,editProductAction} from "../controllar/product.controllar.js";
import { verify } from "../middleware/auth.js";
const router = express.Router();

router.get("/add-product",verify,addProductPage);
router.post("/add-product",verify,addProductAction);
router.get("/view-product" , verify , viewproductAction);
router.get("/delete/:productId", verify ,deleteProduct);
router.get("/edit/:productId" , verify , editProductPage);
router.post("/edit-product" , verify , editProductAction);
export default router;