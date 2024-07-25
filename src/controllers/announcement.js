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

export const getAnnouncement = async (req, res) => {
  const { id } = req.params;

  const announcement = await AnnouncementService.findAnnouncement({ id });

  return res.send(announcement);
};
