import AnnouncementService from "../services/announcement.js";
import ApplyService from "../services/apply.js";

export const postApply = async (req, res) => {
  const { userId, announcementId } = req.body;

  const announcement = await AnnouncementService.findAnnouncement({
    id: announcementId,
  });
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." });
  }

  const apply = await ApplyService.findApply({ userId, announcementId });
  if (!apply) {
    return res.send({ message: "이미 지원한 채용공고입니다." });
  }

  await ApplyService.createApply({
    userId,
    announcementId,
  });

  return res.send(true);
};
