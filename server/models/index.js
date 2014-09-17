var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roles = 'guest user admin'.split(' ');

exports.Ideas = new Schema({
    name: {
        required: true,
        type: String,
        trim: true,
        // match: /^([[:alpha:][:space:][:punct:]]{1,100})$/
        match: /^([\w ,.!?]{1,100})$/
    },
    description: {
        type: String,
        trim: true,
        max: 1000
    },
    category: {
        type: String,
        trim: true,
        max: 200
    },
    votes: [{
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        voter: {
            type: String,
            trim: true,
            max: 100
        },
    }],
    // author: {
    //   id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    //   }
    // },
    author: {
        type: String,
        trim: true,
        max: 100
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// exports.Votes = new Schema({
//    date: {
//       type: Date,
//       default: Date.now,
//       required: true
//     },
//     voter:  {
//     type: String,
//     trim: true,
//     max: 100
//     },
//     // voter: {
//     //   id: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User'
//     //   },
//     //   name: String
//     // }
// })

exports.User = new Schema({

    lastName: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    password: String,
    email: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: roles,
        required: true,
        default: roles[0]
    },
    banned: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    photoUrl: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    twitterUrl: String,
    facebookUrl: String,
    linkedinUrl: String,
    githubUrl: String
});
