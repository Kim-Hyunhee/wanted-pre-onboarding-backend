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
    const query = `SELECT * FROM announcement 
    JOIN company ON announcement.companyId = company.id 
    WHERE announcement.id = ${id}`;

    const [[announcement]] = await databaseConfig.query(query);
    if (!announcement) {
      return false;
    }

    return announcement;
  },

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
