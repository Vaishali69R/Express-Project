import pool from "../db/dbConfig.js";
import product from "../model/product.js"
export const addProductPage = (request,response,next)=>{
    response.render("addproduct.ejs");
}

export const addProductAction = (request,response,next)=>{
       // console.log(request.body);
    
            let { id,title,price,category_id } = request.body;
            let pro = new product(id,title,price,category_id);
        
            
            pro.insert_product()
                .then(result => {
                    if (result.affectedRows > 0) { 
                        response.redirect("/admin/dashboard"); 
                    } else {
                        response.redirect("/admin/sign-in");  
                    }
                })
                .catch(err => {
                    console.log(err);
                    response.status(500).end("An error occurred during product insertion");
                });     
            }
            
            export const viewproductAction = (request,response,next)=>{
                const{product_name,price,category_id} =request.body;
                pool.getConnection((err,con)=>{
                    if(!err){
                        let sql='SELECT products.id,products.product, products.price, categories.name AS category_name FROM products INNER JOIN categories ON products.category_id = categories.id;';
                        

                        con.query(sql,(err,result)=>
                        {
                            con.release();
                            if(!err){
                                console.log(result);
                                return response.render("product_view.ejs",{products:result})
                            }
                            else{
                                console.log(err)
                                    response.end(err)
                                
                            }
                        });
    
                    }
                    else{
                        console.log("connection failed" , err)
                        response.send("Database connection failed..")
                    }
    
             } ) 
            
            }
            export const editProductAction = (request,response,next)=>{
                let {id,title,price} = request.body;
                let p = new product(id,title,price);
                p.update()
                .then(result=>{
                    response.redirect("/product/view-product");
                }).catch(err=>{
                    console.log(err);
                })
            }
            export const editProductPage = async (request,response,next)=>{
               try{ 
                let productId = request.params.productId;
                let result  = await product.getProductById(productId);
                console.log(result[0]);
                return response.render("edit-product.ejs",{product: result[0]});
               }
               catch(err){
                console.log(err);
               }
            }
            export const deleteProduct = (request,response,next)=>{
                let productId = request.params.productId;
                product.delete(productId)
                .then(result=>{
                    return response.redirect("/product/view-product");
                }).catch(err=>{
                    console.log(err);
                })
            }
            export const viewProductPage = async (request,response,next)=>{
               try{ 
                let result = await product.getProduct();
                return response.render("view-product.ejs",{productList: result});
               }
               catch(err){
                console.log(err);
               }
            }
    