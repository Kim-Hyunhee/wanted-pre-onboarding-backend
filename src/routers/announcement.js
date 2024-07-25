import express from "express";
import {
  getAnnouncement,
  getManyAnnouncement,
  postAnnouncement,
  putAnnouncement,
} from "../controllers/announcement.js";

const router = express.Router();

router.post("/", postAnnouncement);
router.get("/:id", getAnnouncement);
router.get("/", getManyAnnouncement);
router.put("/:id", putAnnouncement);

export const announcementRouter = router;
