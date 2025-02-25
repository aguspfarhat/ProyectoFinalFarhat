import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    fotoPerfil: {
        type: String,
        required: false,
    },

    ubicacion: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false }
    }
});

const Users = mongoose.models.Users || mongoose.model("Users" /* model */, userSchema /* schema */, "Users" /* coll */);

export default Users;