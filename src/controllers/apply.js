import AnnouncementService from "../services/announcement.js"; // Announcement 서비스 모듈을 불러옵니다.
import ApplyService from "../services/apply.js"; // Apply 서비스 모듈을 불러옵니다";

/**
 * 사용자가 채용 공고에 지원하는 컨트롤러 함수
 * @param {Request} req - 클라이언트의 요청 객체
 * @param {Response} res - 서버의 응답 객체
 * @returns {Promise<Response>} - 지원 결과에 대한 응답
 */
export const postApply = async (req, res) => {
  try {
    const { userId, announcementId } = req.body; // 요청 본문에서 사용자 ID와 채용 공고 ID를 추출합니다.

    // 타입 검증
    if (
      typeof userId !== "number" ||
      isNaN(userId) ||
      typeof announcementId !== "number" ||
      isNaN(announcementId)
    ) {
      return res.status(400).send({ message: "타입을 정확히 입력해주세요." });
    }

    // 채용 공고를 조회합니다.
    const announcement = await AnnouncementService.findAnnouncement({
      id: announcementId,
    });
    if (!announcement) {
      return res
        .status(404)
        .send({ message: "존재하지 않는 채용 공고입니다." }); // 해당 ID의 공고가 없는 경우 메시지를 응답합니다.
    }

    // 사용자가 이미 해당 채용 공고에 지원했는지 확인합니다.
    const apply = await ApplyService.findApply({ userId, announcementId });
    if (apply) {
      return res.status(400).send({ message: "이미 지원한 채용공고입니다." }); // 이미 지원한 경우 메시지를 응답합니다.
    }

    // 지원 정보를 생성합니다.
    await ApplyService.createApply({
      userId,
      announcementId,
    });

    return res.send(true); // 성공적으로 지원되었음을 응답합니다.
  } catch (error) {
    console.error("Error in postApply:", error); // 오류를 로그에 기록합니다.
    return res.status(500).send({ message: "서버 오류가 발생했습니다." }); // 오류 발생 시 서버 오류 메시지를 응답합니다.
  }
};
