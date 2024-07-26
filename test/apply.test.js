import { expect } from "chai";
import ApplyService from "../src/services/apply.js";
import AnnouncementService from "../src/services/announcement.js";
import { databaseConfig } from "../src/database.js";

describe("ApplyService", async () => {
  // 데이터베이스 설정 또는 마이그레이션 스크립트를 실행합니다.
  await databaseConfig.connect();
  before(async () => {
    // 이곳에서 테스트 데이터베이스를 설정할 수 있습니다.
  });

  // 테스트 후 데이터베이스를 정리합니다.
  after(async () => {
    // 데이터베이스 연결을 종료합니다.
    await databaseConfig.end();
  });

  it("should apply for an announcement", async () => {
    // 테스트를 위해 존재하는 공고를 조회합니다.
    const announcement = await AnnouncementService.findAnnouncement({ id: 5 });
    expect(announcement).to.not.be.false;

    // 사용자와 공고 ID를 이용해 지원을 생성합니다.
    const applyData = {
      userId: 1,
      announcementId: 24,
    };

    // 지원 생성이 성공했는지 확인합니다.
    const result = await ApplyService.createApply(applyData);
    expect(result).to.be.true;

    // 지원이 성공적으로 기록되었는지 확인합니다.
    const apply = await ApplyService.findApply(applyData);
    expect(apply).to.be.false; // 이미 지원한 공고이므로 false를 반환할 것으로 예상합니다.
  });

  it("should check if user has applied", async () => {
    // 사용자와 공고 ID를 이용해 지원 여부를 확인합니다.
    const applyData = {
      userId: 1,
      announcementId: 24,
    };

    // 지원 여부를 확인하고, 이미 지원했음을 검증합니다.
    const apply = await ApplyService.findApply(applyData);
    expect(apply).to.be.false; // 이미 지원한 공고이므로 false를 반환할 것으로 예상합니다.
  });
});
