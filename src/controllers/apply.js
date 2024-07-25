import ApplyService from "../services/apply.js";

export const postApply = async (req, res) => {
  const { userId, announcementId } = req.body;

  await ApplyService.createApply({
    userId,
    announcementId,
  });

  return res.send(true);
};
