const { Schema, model, ObjectId } = require('mongoose');

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: [
            validateEmail, 'Please provide a valid email address'
        ],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },
    thoughts: [{
        type: ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: ObjectId,
        ref: "User"
    }]
})
userSchema.virtual("friendCount").get(() => {
    return this.friends.length
});
// create the User model using the UserSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;