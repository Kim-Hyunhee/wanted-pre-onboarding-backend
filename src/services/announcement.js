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
      const [[announcement]] = await databaseConfig.query(announcementQuery);

      if (!announcement) {
        return { announcement: null, relatedJobs: [] };
      }

      const [relatedJobs] = await databaseConfig.query(relatedJobsQuery);

      return {
        announcement,
        relatedJobs,
      };
    } catch (error) {
      console.error("Error fetching announcement and related jobs:", error);
      throw new Error("Internal Server Error");
    }
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
