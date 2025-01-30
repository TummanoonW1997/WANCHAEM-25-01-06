import { Router } from "express";
import User from "../models/m_user";
import CryptoJS from "crypto-js";

export const UserRoutes = Router();

const path = '/users';

//REGISTER USER
UserRoutes.route(path).post(async (req, res) => {
    try {
        const { username, password, display_name } = req.body;

        const password_hash = CryptoJS.MD5(password);

        const newU = new User({
            username,
            password_hash: password_hash.toString(),
            display_name: display_name ?? username
        });

        await newU.save();

        res.status(200).json(newU);
    } catch (error) {
        res.status(400).json(error);
    }
});

//GET BY ID
UserRoutes.route(path + '/:user_id').get(async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const user = await User.findById(user_id);

        if (!user) {
            res.status(404).send('user not found.');
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

//LOGIN
UserRoutes.route(path).put(async (req, res) => {
    try {
        const { username, password } = req.body;

        const password_hash = CryptoJS.MD5(password).toString();

        const user = await User.findOne({ username: username, password_hash: password_hash });

        if (!user) {
            res.status(404).send('incorrect username or password');
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

//UPDATE USER' DISPLAY NAME
UserRoutes.route(path + '/:user_id').put(async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const { display_name } = req.body;

        const user = await User.findById(user_id);

        if (!user) {
            res.status(404).send('user not found.');
        } else {
            if (!display_name) {
                res.status(405).send('invalid diaplay_name');
            } else {
                user.display_name = display_name;
                await user.save();

                res.status(200).json(user);
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

//RESET PASSWORD
UserRoutes.route(path + '/:user_id/reset').put(async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const { password } = req.body;

        const user = await User.findById(user_id);

        if (!user) {
            res.status(200).send('password updated');
        } else {
            if (!password && password.length < 6) {
                res.status(405).send('invalid password or password length is lesser than 6');
            } else {
                const password_hash = CryptoJS.MD5(password);
                user.password_hash = password_hash.toString();
                await user.save();

                res.status(200).send('password updated');
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

//DELETE USER
UserRoutes.route(path + '/:user_id').delete(async (req, res) => {
    try {
        const user_id = req.params.user_id;

        await User.findByIdAndDelete(user_id);

        res.status(200).send('user deleted');
    } catch (error) {
        res.status(400).json(error); 
    }
});