import { databaseConfig } from "../database.js"; // 데이터베이스 설정을 불러옵니다.

const ApplyService = {
  /**
   * 사용자가 채용 공고에 지원하는 함수
   * @param {number} params.userId - 사용자 ID
   * @param {number} params.announceId - 채용공고 ID
   * @returns {Promise<boolean>} - 생성 성공 여부
   */
  createApply: async ({ userId, announcementId }) => {
    const query = `INSERT INTO 
    apply(userId, announcementId) 
    VALUES ('${userId}',
    '${announcementId}');`;

    await databaseConfig.query(query); // 데이터베이스에 쿼리를 실행합니다.

    return true;
  },

  /**
   * 사용자가 특정 채용 공고에 이미 지원했는지 확인하는 함수
   * @param {Object} params - 조회 조건
   * @param {number} params.userId - 사용자 ID
   * @param {number} params.announcementId - 채용 공고 ID
   * @returns {Promise<boolean>} - 지원 여부
   */
  findApply: async ({ userId, announcementId }) => {
    // 사용자 ID와 채용 공고 ID로 지원 기록을 조회하는 쿼리
    const query = `SELECT * FROM apply 
    WHERE userId = ${userId} 
    AND announcementId = ${announcementId};`;

    try {
      // 쿼리를 실행하고 결과를 가져옵니다.
      const [[apply]] = await databaseConfig.query(query);

      // 지원 기록이 존재하면 false를 반환합니다.
      if (apply) {
        return false;
      }
      // 지원 기록이 없으면 true를 반환합니다.
      return true;
    } catch (error) {
      console.error("Error checking apply status:", error); // 오류를 로그에 기록합니다.
      throw new Error("Internal Server Error"); // 오류가 발생하면 예외를 던집니다.
    }
  },
};

export default ApplyService; // ApplyService를 기본 내보냅니다.
