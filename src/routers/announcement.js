import express from "express";
import {
  getAnnouncement,
  postAnnouncement,
} from "../controllers/announcement.js";

const router = express.Router();

router.post("/", postAnnouncement);
router.get("/:id", getAnnouncement);

export const announcementRouter = router;
