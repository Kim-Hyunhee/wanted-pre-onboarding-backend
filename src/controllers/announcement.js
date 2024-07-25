import AnnouncementService from "../services/announcement.js";

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

  return res.send(true);
};
