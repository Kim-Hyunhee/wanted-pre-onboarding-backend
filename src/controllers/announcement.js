import AnnouncementService from "../services/announcement.js"; // Announcement 서비스 모듈을 불러옵니다.

/**
 * 새로운 채용 공고를 생성하는 컨트롤러 함수
 * @param {Request} req - 클라이언트의 요청 객체
 * @param {Response} res - 서버의 응답 객체
 * @returns {Promise<Response>} - 생성된 채용 공고에 대한 응답
 */
export const postAnnouncement = async (req, res) => {
  const { position, country, area, reward, description, skill, companyId } =
    req.body;

  await AnnouncementService.createAnnouncement({
    position,
    country,
    area,
    reward,
    description,
    skill,
    companyId,
  });

  return res.send(true); // 성공적으로 생성되었음을 응답합니다.
};

/**
 * 특정 ID의 채용 공고를 조회하는 컨트롤러 함수
 * @param {Request} req - 클라이언트의 요청 객체
 * @param {Response} res - 서버의 응답 객체
 * @returns {Promise<Response>} - 조회된 채용 공고에 대한 응답
 */
export const getAnnouncement = async (req, res) => {
  const { id } = req.params;

  const announcement = await AnnouncementService.findAnnouncement({ id });
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." }); // 해당 ID의 공고가 없는 경우 메시지를 응답합니다.
  }

  return res.send(announcement); // 조회된 채용 공고를 응답합니다.
};

/**
 * 여러 채용 공고를 조회하는 컨트롤러 함수
 * @param {Request} req - 클라이언트의 요청 객체
 * @param {Response} res - 서버의 응답 객체
 * @returns {Promise<Response>} - 조회된 여러 채용 공고에 대한 응답
 */
export const getManyAnnouncement = async (req, res) => {
  const { search } = req.query;

  const announcements = await AnnouncementService.findManyAnnouncement({
    search,
  });

  return res.send(announcements); // 조회된 여러 채용 공고를 응답합니다.
};

/**
 * 특정 ID의 채용 공고를 업데이트하는 컨트롤러 함수
 * @param {Request} req - 클라이언트의 요청 객체
 * @param {Response} res - 서버의 응답 객체
 * @returns {Promise<Response>} - 업데이트된 채용 공고에 대한 응답
 */
export const putAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { position, country, area, reward, description, skill } = req.body;

  const announcement = await AnnouncementService.findAnnouncement({ id });
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." }); // 해당 ID의 공고가 없는 경우 메시지를 응답합니다.
  }

  await AnnouncementService.updateAnnouncement({
    id,
    position,
    country,
    area,
    reward,
    description,
    skill,
  });

  return res.send(true); // 성공적으로 업데이트되었음을 응답합니다.
};

/**
 * 특정 ID의 채용 공고를 삭제하는 컨트롤러 함수
 * @param {Request} req - 클라이언트의 요청 객체
 * @param {Response} res - 서버의 응답 객체
 * @returns {Promise<Response>} - 삭제된 채용 공고에 대한 응답
 */
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  const announcement = await AnnouncementService.findAnnouncement({ id });
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." }); // 해당 ID의 공고가 없는 경우 메시지를 응답합니다.
  }

  await AnnouncementService.removeAnnouncement({ id });

  return res.send(true); // 성공적으로 삭제되었음을 응답합니다.
};
