import { Router } from "express";
import User from "../models/m_user";

export const UserRoutes = Router();

const path = '/users';

//CREATE USER
UserRoutes.route(path).post(async (req, res) => {
    try {
        const { username, password, display_name } = req.body;

        const newU = new User({
            username,
            password_hash: password,
            display_name
        });

        await newU.save();

        res.status(200).json(newU);
    } catch (error) {
        res.status(400).json(error);
    }
});

UserRoutes.route(path + '/:user_id').get(async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const user = await User.findById(user_id);

        if(!user){
            res.status(404).send('user not found.');
        }else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});