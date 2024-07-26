import express from "express"; // Express 모듈을 불러옵니다.
import { postApply } from "../controllers/apply.js"; // Apply 컨트롤러를 불러옵니다.

const router = express.Router(); // 라우터 객체를 생성합니다.

// 사용자가 채용 공고에 지원하는 라우트
router.post("/", postApply);

// 라우터를 내보냅니다.
export const applyRouter = router;
