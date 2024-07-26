import express from "express"; // Express 모듈을 불러옵니다.
import {
  deleteAnnouncement,
  getAnnouncement,
  getManyAnnouncement,
  postAnnouncement,
  putAnnouncement,
} from "../controllers/announcement.js"; // Announcement 컨트롤러를 불러옵니다.

const router = express.Router(); // 라우터 객체를 생성합니다.

// 새로운 채용 공고를 생성하는 라우트
router.post("/", postAnnouncement);
// 특정 ID의 채용 공고를 조회하는 라우트
router.get("/:id", getAnnouncement);
// 여러 채용 공고를 조회하는 라우트
router.get("/", getManyAnnouncement);
// 특정 ID의 채용 공고를 업데이트하는 라우트
router.put("/:id", putAnnouncement);
// 특정 ID의 채용 공고를 삭제하는 라우트
router.delete("/:id", deleteAnnouncement);

// 라우터를 내보냅니다.
export const announcementRouter = router;
