import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    username: string;
    password_hash: string;
    display_name: string;
}

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    display_name: {
        type: String
    }
}, {
    timestamps: true //add createdAt and updatedAt fields
});

const User = mongoose.model<IUser>("users", userSchema);

export default User;