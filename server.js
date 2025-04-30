const {Client}=require('pg')
const express=require('express')
const { error } = require('console')
const app=express()
app.use(express.json())
const connection=new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "0786690541@Elie",
    database: "Student"

})




app.post('/postdata',(req,res)=>{
    const {name,id}=req.body
    const queryies="INSERT INTO employee(name,id) VALUES ($1,$2)"
    connection.query(queryies,[name,id],(error,result)=>{
        if(error){
            res.send(error)
            console.error(error)
        }else{
            res.send('inserted data')
            console.log(result)

        }
    })
})


app.get("/getdata",(req,res)=>{
    const queryselect="SELECT * FROM employee"
    connection.query(queryselect,(error,result)=>{
        if(error){
            res.send(error)

        }else{
            res.send(result);
            console.log("fetched")
        }
    })
})


app.put("/updatedby/:id",(req,res)=>{
    const id=req.params.id
    const name=req.body.name


    const queryput="UPDATE employee SET name=$1 where id=$2"
    connection.query(queryput,[name,id],(error,result)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send(result)
            console.log(result)
        }
    })
})

app.get('/fetchby/:id',(req,res)=>{
    const id=req.params.id
    

    const querid="SELECT * FROM employee where id=$1"
    connection.query(querid,[id],(error,result)=>{
        if(error){
            res.send(error)
        }else{
            res.send(result);
            console.log(result)
        }
    })
})


app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    const deletequer="DELETE FROM employee where id=$1"
    connection.query(deletequer,[id],(error,result)=>{
        if(error){
            res.send(error)
        }else{
            res.send("well deleted")
            console.log("DELETED DATABASE")
        }
    })
})
connection.connect().then(()=>console.log("my server connected"))
app.listen(3000,()=>console.log("server is running on http://localhost:3000"));
