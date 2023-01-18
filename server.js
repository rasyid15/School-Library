const express = require(`express`)
const bodyParser = require('body-parser')
const app = express()
const PORT = 8000
const cors = require(`cors`)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const memberRoute = require(`./routes/member_routes`)
const { getAllMember, findMember } = require("./controllers/member_controllers")
app.use(`/member`, memberRoute)

const adminRoute = require(`./routes/admin_routes`)
const { getAllAdmin, findAdmin } = require("./controllers/admin_controllers")
app.use(`/admin`, adminRoute)

const bookRoute = require('./routes/book_routes')
const { getAllBook, findBook } = require("./controllers/book_controllers")
app.use('/book', bookRoute)

const borrowRoute = require('./routes/borrow_routes')
app.use('/borrow', borrowRoute)

app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port
        ${PORT}`)
})