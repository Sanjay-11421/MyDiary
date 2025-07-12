import express from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import {
  create,
  get,
  getOne,
  remove,
} from "../controllers/entry.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, create);

router.get("/get", VerifyToken, get);

router.get("/getOne/:id", VerifyToken, getOne);

router.delete("/delete/:id", VerifyToken, remove);

export default router;
