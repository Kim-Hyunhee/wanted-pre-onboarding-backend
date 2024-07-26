// 서버 시작 파일

// Express 모듈을 불러옵니다.
import express from "express";
import cors from "cors"; // CORS 미들웨어를 불러옵니다.
import { announcementRouter, applyRouter } from "./routers/index.js"; // 라우터를 불러옵니다.

const app = express(); // Express 애플리케이션을 생성합니다.
const port = 3000; // 서버가 실행될 포트를 설정합니다.

// JSON 형태의 요청 본문을 파싱하기 위한 미들웨어를 사용합니다.
app.use(express.json());
app.use(cors()); // 모든 출처에 대해 CORS를 활성화합니다.

/**
 * 루트 엔드포인트
 * 사용자가 루트 URL에 접속했을 때 환영 메시지를 반환합니다.
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * 오류 처리 미들웨어
 * 애플리케이션에서 발생한 오류를 처리하고, 500 상태 코드를 반환합니다.
 */
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.stack);
  res.status(500).send("Something broke!");
});

// 라우터를 설정합니다.
app.use("/announcement", announcementRouter); // 채용공고 관련 라우터
app.use("/apply", applyRouter); // 지원 관련 라우터

// 서버를 지정된 포트에서 실행합니다.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
