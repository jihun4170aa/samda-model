# 네이버 지도 프록시 서버 사용 방법

## 문제
네이버 Static Map API는 브라우저에서 직접 호출할 때 CORS 정책으로 인해 차단됩니다.

## 해결 방법
Node.js 프록시 서버를 통해 네이버 API를 호출하고, 브라우저는 프록시 서버에서 이미지를 받아옵니다.

## 설치 및 실행

### 1. Node.js 설치 확인
터미널에서 확인:
```bash
node --version
npm --version
```

설치 안 되어 있으면: https://nodejs.org/ 에서 다운로드

### 2. 패키지 설치
프로젝트 폴더에서 실행:
```bash
npm install
```

### 3. 프록시 서버 실행
```bash
npm start
```

또는

```bash
node server.js
```

서버가 실행되면:
```
Proxy server running on http://localhost:3000
Open http://localhost:3000/index.html in your browser
```

### 4. 브라우저에서 확인
http://localhost:3000/index.html 접속

## 파일 구조
- `server.js` - Node.js 프록시 서버
- `package.json` - 패키지 의존성
- `index.html` - 메인 페이지 (프록시 서버 사용)

## 주의사항
- 프록시 서버가 실행 중이어야 지도가 표시됩니다
- Python HTTP 서버(`python -m http.server 5500`)는 필요 없습니다
- Node.js 서버가 정적 파일도 함께 서빙합니다

## 문제 해결
**지도가 안 보이면:**
1. 프록시 서버가 실행 중인지 확인
2. http://localhost:3000/index.html 로 접속했는지 확인
3. 브라우저 콘솔에서 에러 확인
