
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//define model
const accountSchema = new Schema({
    klienti             :Number,
    kerkesa             :Number,
    zona                :String,
    data                :String,
    telefon             :Number,
    celular             :Number,
    mail                :String,
    problemi            :String,
    konstatimiProblemit : String,
    createdAt           :Date,
    createdBy           :String,
    statusi             :String,
    updateAt            :Date

});


//create the model class
const Account = mongoose.model('account',accountSchema);


// export the model
module.exports = Account;