import express from "express";
import bodyParser from "body-parser";
import AdminRouter from "./routes/admin.route.js";
import session from "express-session";
import ProductRouter from "./routes/product.route.js";
import cat_router from "./routes/category.route.js";

const app = express();


app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:"forse"}));

app.use("/admin",AdminRouter);
app.use("/product",ProductRouter);
app.use("/category",cat_router );
//app.use("/category" , cat_router)
app.listen(3004,()=>{
    console.log("Server started...");
});