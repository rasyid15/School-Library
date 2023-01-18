const express = require('express')
const app = express()
app.use(express.json())

const borrowController = require('../controllers/borrow_controllers')

app.post("/addBorrow", borrowController.addBorrowing)
app.put("/:id", borrowController.updateBorrowing)
app.delete("/:id", borrowController.deleteBorrowing)
app.get("/return/:id", borrowController.returnBook)
app.get("/getBorrow", borrowController.getBorrow)

module.exports = app