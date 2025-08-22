const { default: mongoose } = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function(){
    console.log('MongoDB connected successfully')
}).catch(function(err) {
    console.log(err)
})

module.exports = mongoose.connection