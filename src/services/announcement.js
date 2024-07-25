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
    if (!announcement) {
      return false;
    }

    return announcement;
  },

  findManyAnnouncement: async ({ search }) => {
    const query = `SELECT * FROM announcement 
    WHERE position LIKE '%${search}%' 
    OR country LIKE '%${search}%'
    OR area LIKE '%${search}%'
    OR reward LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR skill LIKE '%${search}%';`;

    const [announcements] = await databaseConfig.query(query);

    return announcements;
  },

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

    await databaseConfig.query(query);

    return true;
  },

  removeAnnouncement: async ({ id }) => {
    const query = `DELETE FROM announcement WHERE id = ${id};`;

    await databaseConfig.query(query);

    return true;
  },
};

export default AnnouncementService;
