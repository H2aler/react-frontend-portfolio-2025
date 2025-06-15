# React Frontend Portfolio 2025

## 소개
이 프로젝트는 React와 TypeScript 기반의 개인 포트폴리오 웹사이트입니다. 최신 UI/UX 트렌드를 반영한 반응형 디자인, 프로젝트 소개, 기술 스택, 깃허브 연동 등 개발자 본인을 효과적으로 어필할 수 있도록 설계되었습니다.

## 주요 특징
- **React + TypeScript** 기반의 모던 SPA
- **Emotion**을 활용한 스타일링 및 테마 지원
- **프로젝트 카드**: GitHub OpenGraph 이미지를 자동으로 썸네일로 사용
- **카테고리별 필터**: Web, Java 등 프로젝트 분류 및 필터링
- **반응형 디자인**: 모바일/PC 모두 최적화
- **애니메이션**: framer-motion을 활용한 부드러운 UI 효과
- **다국어 지원(한국어/영어)** (옵션)

## 설치 및 실행 방법

### 0. Git 저장소 클론
```bash
git clone https://github.com/H2aler/react-frontend-portfolio-2025.git
cd react-frontend-portfolio-2025
```

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
- 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 빌드 및 배포
```bash
npm run build
npm run preview
```

## 주요 개발 명령어
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 린트 검사
npm run lint

# 코드 포맷팅
npm run format
```

## 커스터마이징 안내
- **프로젝트 추가**: `src/pages/Projects.tsx`의 projects 배열에 원하는 프로젝트 정보를 추가하세요.
- **카테고리 추가/수정**: `<FilterButton>` 및 category 값을 추가/수정하면 됩니다.
- **대표 이미지**: github 링크가 있으면 자동으로 대표 이미지가 표시됩니다. 직접 이미지를 지정하려면 image 필드에 URL을 입력하세요.
- **스타일/테마**: Emotion 스타일 컴포넌트와 CSS 변수로 쉽게 커스터마이징 가능합니다.

## 기술 스택
- React 18+
- TypeScript
- Emotion (styled)
- framer-motion
- react-router-dom

## 라이선스
MIT

## 폴더 구조 예시
```
src/
├── assets/         # 이미지, 폰트 등 정적 파일
├── components/     # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트
├── styles/         # 전역 스타일 및 CSS 변수
├── App.tsx         # 메인 앱 컴포넌트
├── main.tsx        # 앱 진입점
└── env.d.ts        # 환경 변수 타입 정의
```

## 협업 및 유지보수
- **Git 브랜치 전략**: main, feature/브랜치명, fix/브랜치명 등 사용 권장
- **커밋 메시지 컨벤션**: [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/) 권장
- **PR 리뷰**: GitHub Pull Request 활용
- **이슈 관리**: GitHub Issues 활용

## 배포 가이드
- **Vercel**: [Vercel 공식 문서](https://vercel.com/docs)
- **Netlify**: [Netlify 공식 문서](https://docs.netlify.com/)
- **GitHub Pages**: 정적 빌드 후 gh-pages 브랜치로 배포

## 참고 자료
- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Emotion 공식 문서](https://emotion.sh/docs/introduction)
- [framer-motion 공식 문서](https://www.framer.com/motion/)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [Netlify 배포 가이드](https://docs.netlify.com/)

## 내 프로젝트를 GitHub 저장소에 업로드하는 방법

이미 내 컴퓨터에 프로젝트가 있다면, 아래 명령어로 공식 원격 저장소에 업로드할 수 있습니다.

```bash
git init
git remote add origin https://github.com/H2aler/react-frontend-portfolio-2025.git
git add .
git commit -m "최초 커밋"
git branch -M main
git push -u origin main
```

> 기존에 커밋이 있는 저장소라면, push 시 충돌이 날 수 있으니 필요시 `git push -f origin main`으로 강제 업로드하세요.

- 원격 저장소 주소: https://github.com/H2aler/react-frontend-portfolio-2025
- 자세한 내용은 [GitHub 공식 문서](https://docs.github.com/ko/get-started/quickstart/create-a-repo) 참고
