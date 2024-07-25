import express from "express";
import { postApply } from "../controllers/apply.js";

const router = express.Router();

router.post("/", postApply);

export const applyRouter = router;
