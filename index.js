const app = require('./app')
// importing the environment variables
require('dotenv').config()

// starting the server  on port 3000 
app.listen(process.env.PORT, () => {
    console.log('Server is up on port ' + process.env.PORT)

})