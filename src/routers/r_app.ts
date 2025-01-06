import { Router } from "express";
import { UserRoutes } from "./r_user";

export const routes = Router();

routes.use(UserRoutes);