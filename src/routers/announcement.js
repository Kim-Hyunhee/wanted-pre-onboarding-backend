import express from "express";
import {
  deleteAnnouncement,
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
router.delete("/:id", deleteAnnouncement);

export const announcementRouter = router;
