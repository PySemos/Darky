const express = require("express")

app = express()
app.use(express.static("./frontend"))


app.listen(3000,()=>{
    console.log("Server running in port 3000")
})