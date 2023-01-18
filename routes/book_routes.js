const express = require(`express`)
const app = express()
app.use(express.json())

const bookController = require(`../controllers/book_controllers`)
app.get("/getAllBook", bookController.getAllBooks)
app.post("/findBook", bookController.findBook)
app.post("/addBook", bookController.addBook)
app.put("/:id", bookController.updateBook)
app.delete("/:id", bookController.deleteBook)

module.exports = app