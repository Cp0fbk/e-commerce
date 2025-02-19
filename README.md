# Electronic Commerce Project

## Hướng dẫn thiết lập (Dành cho Windows)
### Database (MySQL) 
- Bước 1: Tải [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) và [MySQL Installer](https://dev.mysql.com/downloads/windows/installer/8.0.html) (link tải MySQL Installer này dành cho Windows)
- Bước 2: Tiến hành cài đặt MySQL (tham khảo từ 6:25 đến 10:25 trong video hướng dẫn).
- Bước 3: Tạo connection mới bằng cách nhấn vào nút dấu + trong MySQL Workbench. Lưu ý thông tin hostname, port, username, password (nên để 127.0.0.1:3306, username: samgiahuy, không cài password) để dễ tiến hành kết nối với backend sau đó.
- Bước 4: Trong thư mục /backend/SQL queries, mở 2 file DDL.sql và InsertRecords.sql và tiến hành chạy 2 file này để tạo schema và dữ liệu cho database.

[Video hướng dẫn tại đây](https://www.youtube.com/watch?v=3RUvjSfNtKE)
### Backend (Spring Boot Java)
- Bước 1: Tải các extension cần thiết (maven, spring boot...)
- Bước 2: Trong thư mục src/main/resources, mở file application.properties, kiểm tra lại các thông tin của connection đã tạo ở trên.
- Bước 3: Chạy file EcommerceApplication.java. Nếu dùng Visual Studio Code thì chạy trên Spring Boot Dashboard (biểu tượng nút mở/tắt trong hình lục giác đều)
### Frontend (Vite + ReactJS)
- Bước 1: Chuyển terminal sang thư mục frontend
- Bước 2: Chạy câu lệnh npm install, sau đó là npm run dev
- Bước 3: Nếu chạy thành công, vào http://localhost:5173/ để kiểm tra.