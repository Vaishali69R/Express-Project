// 

import pool from "../db/dbConfig.js";
import category from "../model/Category.js";

export const addcategorypage = (request, response, next) => {
    response.render('addcategory.ejs');
}

export const addcategoryAction = (request, response, next) => {
    let { title } = request.body;
    let cat = new category(title);

    
    cat.insert_category()
        .then(result => {
            if (result.affectedRows > 0) { 
                response.redirect("/admin/dashboard"); 
            } else {
                response.redirect("/admin/sign-in");  
            }
        })
        .catch(err => {
            console.log(err);
            response.status(500).end("An error occurred during category insertion");
        });


        //Category.category_view()
    }

        // export const cat_view = (request,response,next)=>{
        //     let {name} = request.body;
        //     Category.category_view()
        //     .then(result=>{
        //       if(result.length!=0){
                
        //         response.render("/admin/dashboard",{result});
        //       } 
        //       else
        //         response.render("/admin/sign-in");  
        //     }).catch(err=>{
        //       console.log(err);
        //     });
        // }
        // export const viewcategoryPage = (request,response,next)=>{
        //     response.render("Category_view.ejs");
        // }
        
        export const viewcategoryAction = (request,response,next)=>{
            const{id,category_name} =request.body;
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql="select * from categories";
                    con.query(sql,[id,category_name],(err,result)=>
                    {
                        con.release();
                        if(!err){
                            console.log(result);
                            return response.render("Category_view.ejs",{categories:result})
                        }
                        else{
                            console.log(err)
                                response.end(err)
                            
                        }
                    });

                }
                else{
                    console.log("connection failed" , err)
                }

         } ) 
         
        
        }
        export const deleteCategory = (request,response,next)=>{
            let categoryId = request.params.categoryId;
            category.delete(categoryId)
            .then(result=>{
                return response.redirect("/category/view-Category");
            }).catch(err=>{
                console.log(err);
            })
        }
        export const editCategoryAction = (request,response,next)=>{
            let {id,title} = request.body;
            let p = new category(id,title);
            p.update()
            .then(result=>{
                response.redirect("/category/view-Category");
            }).catch(err=>{
                console.log(err);
            })
        }
        export const editCategoryPage = async (request,response,next)=>{
           try{ 
            let categoryId = request.params.categoryId;
            let result  = await category.getCategoryById(categoryId);
            console.log(result[0]);
            return response.render("edit-category.ejs",{category: result[0]});
           }
           catch(err){
            console.log(err);
           }
        }

