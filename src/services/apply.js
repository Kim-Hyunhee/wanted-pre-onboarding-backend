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
};

export default ApplyService;
