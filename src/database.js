// MySQL 데이터베이스 연결을 설정하는 파일

import mysql from "mysql2/promise"; // MySQL 모듈을 불러옵니다.
import dotenv from "dotenv"; // 환경 변수를 관리하기 위한 dotenv 모듈을 불러옵니다.

dotenv.config(); // .env 파일에 정의된 환경 변수를 불러옵니다.

// 데이터베이스 연결을 설정합니다.
export const databaseConfig = await mysql.createConnection({
  host: process.env.DB_HOST, // 데이터베이스 호스트
  user: process.env.DB_USERNAME, // 데이터베이스 사용자 이름
  password: process.env.DB_PASSWORD, // 데이터베이스 비밀번호
  database: process.env.DB_DATABASE, // 데이터베이스 이름
  port: process.env.DB_PORT, // 데이터베이스 포트
});

/**
 * 데이터베이스 연결을 관리하는 함수
 * 연결이 끊어졌을 때 자동으로 재연결을 시도합니다.
 */
function handleDisconnect() {
  // 데이터베이스에 연결합니다.
  databaseConfig.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      // 연결 실패 시 2초 후에 다시 연결을 시도합니다.
      setTimeout(handleDisconnect, 2000);
    }
  });

  // 데이터베이스 오류가 발생했을 때 처리합니다.
  databaseConfig.on("error", function (err) {
    console.log("db error", err);
    // 연결이 끊어진 경우 재연결을 시도합니다.
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      return handleDisconnect();
    } else {
      // 다른 오류는 예외로 처리합니다.
      throw err;
    }
  });
}

// 데이터베이스 연결을 관리하기 위한 함수 호출
handleDisconnect();
