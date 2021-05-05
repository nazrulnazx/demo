const express        = require('express');
const connectDB      = require('./config/db');


/**---------------------------------------------------
 *  App Initialization
 * ---------------------------------------------------
 */
const app     = express();
const PORT    = process.env.PORT || 3000;
connectDB();



/**---------------------------------------------------
 *  DEFINING ROUTES
 * ---------------------------------------------------
 */
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/post',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/user',require('./routes/api/user'));


app.use('',(req,res) => { res.send('OOOooppppssss  Wrong URL'); });

/**---------------------------------------------------
 *  Server Initialization
 * ---------------------------------------------------
 */
app.listen(PORT,() => {
    console.log(`App is listing on port ${PORT}`);
});
