import pool from "../db/dbConfig.js";
export default  class product{
    constructor( id,p_name,price,category_id){
        this.id=id;
        this.p_name=p_name;
        this.price=price;
        this.category_id=category_id;
    }
    insert_product() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "INSERT INTO products (product, price , category_id) VALUES (?,?,?)";
                
                    con.query(sql, [this.p_name,this.price,this.category_id], (err, result) => {
                        con.release();
                        if (!err)
                            resolve(result);
                        else
                        console.log("first");
                            reject(err);
                    });
                } else {
                    console.log("second");
                    reject(err);
                }
            });
        });
    }

static delete(id){
    return new Promise((resolve,reject)=>{
     pool.getConnection((err,con)=>{
         if(!err){
           let sql = "delete from products where id = ?";
           con.query(sql,[id],(err,result)=>{
             err ? reject(err) : resolve(result);
             con.release();
           });
         }
         else
           reject(err);
     })
    }); 

 }

 static getProductById(id){
     return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
             if(!err){
               let sql = "select * from products where id = ?";
               con.query(sql,[id],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
               });
             }
             else
               reject(err);
         })
        });
 }
 update(){
     return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
             if(!err){
               let sql = "update products set product=?,price=? where id = ?";
               con.query(sql,[this.p_name,this.price,this.id],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
               });
             }
             else
               reject(err);
         })
        });
 }
}
