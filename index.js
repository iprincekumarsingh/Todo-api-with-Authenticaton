const app = require('./app')
// importing the environment variables
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello to the todo app')
})
// starting the server  on port 3000 
app.listen(process.env.PORT, () => {
    console.log('Server is up on port ' + process.env.PORT)

})