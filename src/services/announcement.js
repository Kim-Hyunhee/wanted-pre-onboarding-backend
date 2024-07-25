import { databaseConfig } from "../database.js";

const AnnouncementService = {
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
    await databaseConfig.query(query);

    return true;
  },

  findAnnouncement: async ({ id }) => {
    const query = `SELECT * FROM announcement WHERE id = ${id}`;

    const [[announcement]] = await databaseConfig.query(query);

    return announcement;
  },

  findManyAnnouncement: async () => {
    const query = `SELECT * FROM announcement;`;

    const [announcements] = await databaseConfig.query(query);

    return announcements;
  },
};

export default AnnouncementService;
