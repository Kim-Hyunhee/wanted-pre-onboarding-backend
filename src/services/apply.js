import { databaseConfig } from "../database.js";

const ApplyService = {
  createApply: async ({ userId, announcementId }) => {
    const query = `INSERT INTO 
    apply(userId, announcementId) 
    VALUES ('${userId}',
    '${announcementId}');`;

    await databaseConfig.query(query);

    return true;
  },

  findApply: async ({ userId, announcementId }) => {
    const query = `SELECT * FROM apply 
    WHERE userId = ${userId} 
    AND announcementId = ${announcementId};`;

    const [[apply]] = await databaseConfig.query(query);
    if (apply) {
      return false;
    }

    return true;
  },
};

export default ApplyService;
