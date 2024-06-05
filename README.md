# test_lab_be

Đây là dự án frontend của ứng dụng Test Lab, được xây dựng bằng ReactJs & Vite

## Cài Đặt

1. **Node.js**: Đảm bảo bạn đã cài đặt Node.js phiên bản `>=18.16.1`.

2. Clone repository từ GitHub:

```bash
git clone <link-repository>
cd test_lab_fe
```

3. Cài đặt các dependencies:

```bash
npm install

```

## Cấu hình

1. Vào file config/app.config.ts

```bash
const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:3000',
    authenticatedEntryPath: '/profile',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}
```

apiPrefix là đường dẫn trỏ đến backend 2. Cấu hình các biến môi trường trong file .env

## Chạy

Chạy ứng dụng:

```bash
npm start
```

## Cách sử dụng

Sau khi chạy, trang web sẽ được chạy tại http://localhost:5473 mặc định.
