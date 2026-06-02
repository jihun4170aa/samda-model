const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const https = require('https');
const app = express();

// SSL 인증서 검증 우회 (개발 환경용)
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

// CORS 허용
app.use(cors());

// 네이버 지도 프록시 엔드포인트
app.get('/api/map', async (req, res) => {
    try {
        // 쿼리 파라미터 받기
        const { w, h, center, level, markers } = req.query;

        // 네이버 Static Map API URL 생성 (올바른 엔드포인트 사용)
        const apiUrl = `https://maps.apigw.ntruss.com/map-static/v2/raster?` +
            `w=${w}&h=${h}&center=${center}&level=${level}&markers=${markers}`;

        console.log('Requesting map from:', apiUrl);

        // 네이버 API 호출 (헤더 포함 + SSL 검증 우회)
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-NCP-APIGW-API-KEY-ID': 'nticxunj9s',
                'X-NCP-APIGW-API-KEY': '11Pis2DvfVpt9GetGvdXGnmt1zH8iIpZ40CWvoT2'
            },
            agent: httpsAgent
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Naver API error: ${response.status}`, errorText);
            throw new Error(`Naver API error: ${response.status}`);
        }

        // 이미지 데이터를 클라이언트에 전달
        const imageBuffer = await response.buffer();
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);

    } catch (error) {
        console.error('Proxy error:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).json({ error: 'Failed to fetch map', details: error.message });
    }
});

// 정적 파일 서빙
app.use(express.static(__dirname));

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/index.html in your browser`);
});
