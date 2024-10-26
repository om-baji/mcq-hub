import mongoose, {Schema,Document} from "mongoose";

export interface MCQ extends Document{
    question : string;
    options : string[];
    comment? : string[];
    tag : string;
    correctAnswer : string;
}

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    isVerified : boolean;
    verifyCode : string;
    verificationExpiry : Date;
    createdAt : Date;
}

const mcqSchema : Schema <MCQ> = new Schema({
    question : {
        type : String,
        required : [true,"Question Field cannot be empty!"],
        unique : true,
        trim : true,
        minlength : [4,"Question should be atleat 4 characters!"]
    },
    options : {
        type : [String],
        validate : {
            validator: function(v: string[]) {
                return v.length >= 2;
            },
            message: "At least 2 options are required!"
        },
    },
    comment : {
        type : [String],
    },
    tag : {
        type : String,
        required : [true,"Required Field"]
    },
    correctAnswer : {
        type : String,
        required : [true,"Required Field"]
    }
})

const userSchema : Schema <User> = new Schema({
    username : {
        type : String,
        required : [true,"Username Field cannot be empty!"],
        unique : true,
        trim : true,
        minlength : [4,"Username should be atleat 4 characters!"]
    },
    email : {
        type : String,
        required : [true,"Email field cannot be empty!"],
        unique : true,
        trim : true,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verifyCode : {
        type : String,
        required : [true, "This cannot be empty!"]
    },
    verificationExpiry : {
        type : Date,
        required : [true, "This cannot be empty!"]
    },
    createdAt : {
        type : Date,
        default : () => new Date()
    },
    password : {
        type : String,
    }
}) 

export const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User" , userSchema)
export const mcqModel = (mongoose.models.Mcq as mongoose.Model<MCQ>) || mongoose.model<MCQ>("Mcq" , mcqSchema)
