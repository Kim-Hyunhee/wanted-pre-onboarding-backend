import express from "express";
import {
  getAnnouncement,
  getManyAnnouncement,
  postAnnouncement,
} from "../controllers/announcement.js";

const router = express.Router();

router.post("/", postAnnouncement);
router.get("/:id", getAnnouncement);
router.get("/", getManyAnnouncement);

export const announcementRouter = router;
