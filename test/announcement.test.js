import { expect } from "chai";
import AnnouncementService from "../src/services/announcement.js";
import { databaseConfig } from "../src/database.js";

describe("AnnouncementService", () => {
  // 데이터베이스 설정 또는 마이그레이션 스크립트를 실행합니다.
  before(async () => {
    // 이곳에서 테스트 데이터베이스를 설정할 수 있습니다.
    await databaseConfig.connect();
  });

  // 테스트 후 데이터베이스를 정리합니다.
  after(async () => {
    // 데이터베이스 연결을 종료합니다.
    await databaseConfig.end();
  });

  it("should create an announcement", async () => {
    // 테스트 데이터
    const announcementData = {
      position: "Developer",
      country: "South Korea",
      area: "Seoul",
      reward: 70000,
      description: "Great opportunity",
      skill: "JavaScript",
      companyId: 10,
    };

    // 공고를 생성하고, 생성이 성공했는지 확인합니다.
    const result = await AnnouncementService.createAnnouncement(
      announcementData
    );
    expect(result).to.be.true;

    // 공고가 실제로 생성되었는지 검증합니다.
    const announcement = await AnnouncementService.findAnnouncement({ id: 26 });
    expect(announcement).to.not.be.false; // 공고가 존재해야 합니다.
  });

  it("should find an announcement", async () => {
    // 기존 공고를 조회하고, 공고가 존재하는지 확인합니다.
    const announcement = await AnnouncementService.findAnnouncement({ id: 26 });
    expect(announcement).to.not.be.false;
  });

  it("should update an announcement", async () => {
    // 업데이트할 데이터
    const updateData = {
      id: 26,
      position: "Developer",
      country: "South Korea",
      area: "Seoul",
      reward: 1000000,
      description: "Updated description",
      skill: "JavaScript, Node.js",
    };

    // 공고를 업데이트하고, 업데이트가 성공했는지 확인합니다.
    const result = await AnnouncementService.updateAnnouncement(updateData);
    expect(result).to.be.true;

    // 업데이트된 공고의 속성이 올바르게 변경되었는지 확인합니다.
    const updatedAnnouncement = await AnnouncementService.findAnnouncement({
      id: 26,
    });
    expect(updatedAnnouncement.announcement).to.have.property(
      "reward",
      1000000
    );
    expect(updatedAnnouncement.announcement).to.have.property(
      "skill",
      "JavaScript, Node.js"
    );
  });

  it("should delete an announcement", async () => {
    // 공고를 삭제하고, 삭제가 성공했는지 확인합니다.
    const result = await AnnouncementService.removeAnnouncement({ id: 32 });
    expect(result).to.be.true;

    // 삭제된 공고가 존재하지 않는지 확인합니다.
    const announcement = await AnnouncementService.findAnnouncement({ id: 32 });
    expect(announcement).to.be.false;
  });
});
