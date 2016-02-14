var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    first_name: String,
    last_name: String,
    created_at: Date,
    updated_at: Date
});

personSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

personSchema.virtual('full_name').get(function() {
    return this.first_name + ' ' + this.last_name;
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;
