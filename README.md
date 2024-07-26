# wanted-pre-onboarding-backend

기업의 채용을 위한 웹 서비스

## 목차

1. [설명](#설명)
2. [프로젝트 구조](#프로젝트-구조)
3. [스택](#스택)
4. [설치](#설치)
5. [사용법](#사용법)
6. [기여](#기여)
7. [라이선스](#라이선스)
8. [문의](#문의)

## 설명

본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.

## 프로젝트 구조

```plaintext
.
├── src
│   ├── controllers
│   │   └── announcement.js   # 채용공고 관련 로직을 처리하는 컨트롤러
│   │   └── apply.js          # 사용자 지원 관련 로직을 처리하는 컨트롤러
│   ├── routers
│   │   └── announcement.js   # 채용공고 관련 API 라우트 정의
│   │   └── apply.js          # 사용자 지원 관련 API 라우트 정의
│   ├── services
│   │   └── announcement.js   # 채용공고 비즈니스 로직 처리
│   │   └── apply.js          # 사용자 지원 로직 처리
│   ├── database.js           # 데이터베이스 정보 파일
│   └── index.js              # 서버 시작 파일
├── test
│   └── announcement.test.js  # 채용공고 관련 테스트 코드
│   └── apply.test.js         # 사용자 지원 관련 테스트 코드
├── .gitignore                # Git 무시 목록
├── package.json              # npm 패키지 및 스크립트 정보
└── README.md                 # 프로젝트 설명서

```

## 스택

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

## 설치

```bash
git clone https://github.com/Kim-Hyunhee/wanted-pre-onboarding-backend.git
cd wanted-pre-onboarding-backend
npm install
```

## 사용법

npm run start
서버가 실행되며, 기본적으로 http://localhost:3000에서 접근할 수 있습니다.

## 기여

1. 포크를 합니다(fork).
2. 새로운 브랜치를 만듭니다(`git checkout -b feature/AmazingFeature`).
3. 변경 사항을 커밋합니다(`git commit -m 'Add some AmazingFeature'`).
4. 브랜치에 푸시합니다(`git push origin feature/AmazingFeature`).
5. 풀 리퀘스트를 엽니다.

## 라이선스

MIT 라이선스에 대한 자세한 내용은 LICENSE 파일을 참조하십시오.

## 문의

문의 사항이 있으면 tta_bi@naver.com으로 연락 주시기 바랍니다.
