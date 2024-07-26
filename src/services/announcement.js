import { databaseConfig } from "../database.js"; // 데이터베이스 설정을 불러옵니다.

const AnnouncementService = {
  /**
   * 새로운 채용 공고를 생성하는 함수
   * @param {Object} params - 채용 공고 정보
   * @param {string} params.position - 채용 직무
   * @param {string} params.country - 국가
   * @param {string} params.area - 지역
   * @param {number} params.reward - 보상금
   * @param {string} params.description - 직무 설명
   * @param {string} params.skill - 요구 기술
   * @param {number} params.companyId - 회사 ID
   * @returns {Promise<boolean>} - 생성 성공 여부
   */
  createAnnouncement: async ({
    position,
    country,
    area,
    reward,
    description,
    skill,
    companyId,
  }) => {
    const query = `INSERT INTO 
    announcement(position,
    country,
    area,
    reward,
    description,
    skill,
    companyId) 
    VALUES ('${position}',
    '${country}',
    '${area}',
    '${reward}',
    "${description}",
    '${skill}',
    '${companyId}');`;

    await databaseConfig.query(query); // 데이터베이스에 쿼리를 실행합니다.

    return true;
  },

  /**
   * 특정 ID의 채용 공고를 조회하는 함수
   * @param {Object} params - 조회 조건
   * @param {number} params.id - 채용 공고 ID
   * @returns {Promise<Object|boolean>} - 조회된 채용 공고 및 관련 채용 공고 또는 false
   */
  findAnnouncement: async ({ id }) => {
    const announcementQuery = `
    SELECT a.*, c.* 
    FROM announcement a
    JOIN company c ON a.companyId = c.id
    WHERE a.id = ${id}
  `;

    const relatedJobsQuery = `
    SELECT id as announceId
    FROM announcement
    WHERE companyId = (
      SELECT companyId 
      FROM announcement 
      WHERE id = ${id}
    )
  `;

    try {
      const [[announcement]] = await databaseConfig.query(announcementQuery); // 채용 공고를 조회합니다.

      if (!announcement) {
        return false; // 채용 공고가 없는 경우 false 반환
      }

      const [relatedJobs] = await databaseConfig.query(relatedJobsQuery); // 관련 채용 공고를 조회합니다.

      return {
        announcement,
        relatedJobs,
      };
    } catch (error) {
      console.error("Error fetching announcement and related jobs:", error); // 오류를 로그에 기록합니다.
      throw new Error("Internal Server Error"); // 오류가 발생하면 예외를 던집니다.
    }
  },

  /**
   * 여러 채용 공고를 조회하는 함수
   * @param {Object} params - 조회 조건
   * @param {string} params.search - 검색어
   * @returns {Promise<Array>} - 조회된 채용 공고 리스트
   */
  findManyAnnouncement: async ({ search }) => {
    const query = `SELECT announcement.id, company.name as companyName,
    announcement.country, announcement.area, announcement.position,
    announcement.reward, announcement.skill
    FROM announcement 
    JOIN company ON announcement.companyId = company.id 
    WHERE announcement.position LIKE '%${search}%' 
    OR announcement.country LIKE '%${search}%'
    OR announcement.area LIKE '%${search}%'
    OR announcement.reward LIKE '%${search}%'
    OR announcement.skill LIKE '%${search}%'
    OR company.name LIKE '%${search}%';`;

    const [announcements] = await databaseConfig.query(query); // 데이터베이스에 쿼리를 실행하여 결과를 가져옵니다.

    return announcements;
  },

  /**
   * 특정 ID의 채용 공고를 업데이트하는 함수
   * @param {Object} params - 업데이트할 정보
   * @param {number} params.id - 채용 공고 ID
   * @param {string} params.position - 채용 직무
   * @param {string} params.country - 국가
   * @param {string} params.area - 지역
   * @param {number} params.reward - 보상금
   * @param {string} params.description - 직무 설명
   * @param {string} params.skill - 요구 기술
   * @returns {Promise<boolean>} - 업데이트 성공 여부
   */
  updateAnnouncement: async ({
    id,
    position,
    country,
    area,
    reward,
    description,
    skill,
  }) => {
    const query = `UPDATE
    announcement SET 
    position = '${position}',
    country = '${country}',
    area = '${area}',
    reward = '${reward}',
    description = "${description}",
    skill = '${skill}'
    WHERE id = ${id};`;

    await databaseConfig.query(query); // 데이터베이스에 쿼리를 실행합니다.

    return true;
  },

  /**
   * 특정 ID의 채용 공고를 삭제하는 함수
   * @param {Object} params - 삭제할 조건
   * @param {number} params.id - 채용 공고 ID
   * @returns {Promise<boolean>} - 삭제 성공 여부
   */
  removeAnnouncement: async ({ id }) => {
    const query = `DELETE FROM announcement WHERE id = ${id};`;

    await databaseConfig.query(query); // 데이터베이스에 쿼리를 실행합니다.

    return true;
  },
};

export default AnnouncementService; // AnnouncementService를 기본 내보냅니다.
