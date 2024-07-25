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
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." });
  }

  return res.send(announcement);
};

export const getManyAnnouncement = async (req, res) => {
  const { search } = req.query;

  const announcement = await AnnouncementService.findManyAnnouncement({
    search,
  });

  return res.send(announcement);
};

export const putAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { position, country, area, reward, description, skill } = req.body;

  const announcement = await AnnouncementService.findAnnouncement({ id });
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." });
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

  return res.send(true);
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  const announcement = await AnnouncementService.findAnnouncement({ id });
  if (!announcement) {
    return res.send({ message: "존재하지 않는 채용 공고입니다." });
  }

  await AnnouncementService.removeAnnouncement({ id });

  return res.send(true);
};
