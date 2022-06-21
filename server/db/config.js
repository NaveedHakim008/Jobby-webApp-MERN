const mongoose = require('mongoose')
mongoose.connect(
    'mongodb+srv://Jobby:hakim123@cluster0.hr5aw.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);