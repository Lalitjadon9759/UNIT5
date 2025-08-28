let fs=require("fs")
 fs.readFile("./data.txt","utf-8",(err,data)=>{
     if(err){
         console.log("err",err)
     }
     if(data){
         console.log("data",data)
     }
 })

  fs.writeFile("./data.txt","this is appended data",(err)=>{
    if(err){
        console.log("file written")
    }
    console.log("file written")
})