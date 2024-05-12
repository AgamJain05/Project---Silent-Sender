import { create } from "domain";

import mongoose , { Schema , Document,}from "mongoose";



export interface Message extends Document{
    content: string;
    createdAt: Date;
}

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
    isVerified: boolean;
    createdAt: Date;
    messages: Message[];

}
const MessageSchema: Schema<Message> = new Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, required: true , default: Date.now}
});

const UserSchema: Schema<User> = new Schema({
    username:{
        trim: true,
        unique: true,
        required: [true, "Please enter a username"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password:{
        type: String,
        required: [true, "Please enter a password"]
    },
    verifyCode:{
        type: String,
        required: [true, "Please enter a valid verification code"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Please enter a valid expiry date"]
    },
    isAcceptingMessages:{
        type: Boolean,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    },

    messages: [MessageSchema]
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;