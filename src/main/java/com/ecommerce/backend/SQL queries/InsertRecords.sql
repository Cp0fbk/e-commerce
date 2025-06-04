-- Insert bảng MembershipClass
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `account` (username, `password`, `role`)
VALUES
    ('nguyenvannam@gmail.com', '$2a$10$sSbyOAXRXFZASuZ11M5aPuKcicy.QwDXM6sADA4xXpk/1WYwU2Dcu', 'ROLE_CUSTOMER'),     -- 123456789
    ('ledinhbao@gmail.com', '$2a$10$wyTpxQhFYrr56fkTspl3TObBvw3q6AEnRuePdF0izC8jIAJM8AuHm', 'ROLE_CUSTOMER'),        -- 2159561563
    ('buiconglan@gmail.com', '$2a$10$ZlPqYkLB4JCBk5T2IbA    /R.ykKFGzZjkKPkD4Kb8I/EiOj6cMCwHse', 'ROLE_CUSTOMER'),       -- 7822463256
    ('nguyenhoa1594@gmail.com', '$2a$10$sXTu24YQP6Yiozvwic1oyebyJiTqAD0G7m42KplwpBSRNa6vrueku', 'ROLE_CUSTOMER'),    -- setgsr85gs
    ('tnguyen21ah@gmail.com', '$2a$10$XJs..IIhWP9A6OQNx24j1u7WjqBrfmJ01Sh7JOJMVFMyJm4U8Abpa', 'ROLE_CUSTOMER'),      -- st9e8ds567
    ('thanhnguyen51@gmail.com', '$2a$10$DMCl29qdNvWW6TxyW1VmkucmDQS6dnnMKcfkwMhdzxHpMNmtEIvKe', 'ROLE_CUSTOMER'),    -- sgresgh7se5
    ('anh.nguyen@example.com', '$2a$10$WMdBkSGGsAwZOKGQIxHCyOFOo.IUZhweOKGYlFIcLB2ENkJ6gJvay', 'ROLE_EMPLOYEE'),     -- 5455dsfg56
    ('khoa.tran@example.com', '$2a$10$cMnKty3u5DuCZxNcSkItnu9giiF9otN6Y/tuJteB4pIr0seQlsnLi', 'ROLE_EMPLOYEE'),      -- wdgew8ga6s
    ('phi.nguyen@example.com', '$2a$10$/JrS5LmIfCPTLt.5lk7.VO46dbhUAqb5yPc6ja.HrH3MPBd.Wcxh2', 'ROLE_EMPLOYEE'),     -- ewe4s5eg48
    ('phi.le@example.com', '$2a$10$sdCOrLSlMJVMmsAS9F0AA.MvTNObH9RtgKK2PfAwZEev4cvNIHrXq', 'ROLE_EMPLOYEE'),         -- se8ssd125e
    ('ptai205@example.com', '$2a$10$h74A1pJTdyMlX1aDP2YXHOFl7e9Xk4d5ZvBVeNjFtDYAYB5HzNRl.', 'ROLE_EMPLOYEE'),        -- sw3dg48fds
    ('khoatrk22@example.com', '$2a$10$dUUQspjiwlahwcf7wVFxhusTXIwPVF3IMEgXxL9S.eTtNNS6124aq', 'ROLE_EMPLOYEE');      -- 37sei9dke8

INSERT INTO membership_class (`name`, discount_percent, minimum_no_point)  
VALUES 
    ('Normal', 0, 0),
    ('Silver', 5, 5),
    ('Gold', 10, 10),
    ('Diamond', 15, 20);

SET FOREIGN_KEY_CHECKS = 1;

-- Insert bảng Customer
INSERT INTO customer (customer_id, phone_number, email, registration_date, shipping_address, lname, fname, total_points, membership_class_id) 
VALUES 
    (1, '0376872568', 'nguyenvannam@gmail.com', '2024-11-01', 'KP6, Tan Lap Street, Dong Hoa, Di An, Binh Duong', 'Nguyen', 'Nam', 0, 1),
    (2, '0968125694', 'ledinhbao@gmail.com', '2024-11-02', 'KP6, Tan Lap Street, Dong Hoa, Di An, Binh Duong', 'Le', 'Bao', 0, 1),
    (3, '0352583109', 'buiconglan@gmail.com', '2024-10-03', 'KP6, Tan Lap Street, Dong Hoa, Di An, Binh Duong', 'Bui', 'Lan', 0, 1),
    (4, '0369142631', 'nguyenhoa1594@gmail.com', '2023-12-04', 'KP6, Tan Lap Street, Dong Hoa, Di An, Binh Duong', 'Nguyen', 'Hoa', 0, 1),
    (5, '0862549670', 'tnguyen21ah@gmail.com', '2022-11-01', 'KP6, Tan Lap Street, Dong Hoa, Di An, Binh Duong', 'Tran', 'Nguyen', 0, 1),
    (6, '0761295168', 'thanhnguyen51@gmail.com', '2021-11-05', 'KP6, Tan Lap Street, Dong Hoa, Di An, Binh Duong', 'Nguyen', 'Thanh', 0, 1);

-- Insert bảng Cart
INSERT INTO cart (customer_id, total_amount, created_date) 
VALUES 
	(1, 0, '2024-11-01'),
    (2, 0, '2024-11-03'),
    (3, 0, '2024-11-04');

-- Insert bảng Store
INSERT INTO store (number_of_employees, area, store_name, `address`) 
VALUES 
    (4, 100.00, 'Phone Store', 'Ta Quang Buu Street, Dong Hoa, Di An, Binh Duong'),
    (2, 200.00, 'Duy Apple', '123 Le Quyen Street, District 8, TPHCM'),
    (0, 300.00, 'Tech Store', '123 Ly Thuong Kiet, District 10, TPHCM');

-- Insert bảng Promotion
INSERT INTO promotion (`type`, `name`, `start_date`, end_date) 
VALUES 
    ('Sale 10% Headphone', 'Merry Christmas', '2024-12-01', '2024-12-26'),
    ('Sale 10% Earphone', 'Happy New Year', '2023-12-30', '2024-01-15'),
    ('Sale 10% Laptop', 'Back to School', '2024-07-05', '2024-08-15');

-- Insert bảng CategoryType
INSERT INTO category_type(`name`) 
VALUES 
	('Smartphone'),
    ('Laptop'),
	('Tablet'),
    ('Headphone'),
	('Smartwatch');

-- Insert bảng ProductLine
INSERT INTO product_line(`name`, brand, is_used, stock_status, price, `description`, category, color, promotion_id, discount_percentage, category_type_id) 
VALUES 
    ('Iphone 12', 'Apple', 1, 1, 11000000, 'iPhone 12 ra mat voi vai tro mo ra mot ky nguyen hoan toan moi.', 'device', 'Black', NULL, 0, 1),
    ('Samsung Galaxy Tab S6', 'Samsung', 0, 1, 6990000, 'Samsung Galaxy Tab S6 Lite 2024 mang toi cho ban nhung bat ngo moi ve trai nghiem.', 'device', 'Grey', NULL, 0, 3),
    ('OPPO Reno12 F', 'Oppo', 0, 1, 9090000, 'OPPO Reno12 F la đai dien the he Reno tre trung va ca tinh.', 'device', 'Green', NULL, 0, 1),
    ('Galaxy Z Fold6', 'Samsung', 0, 1, 41990000, 'Galaxy Z Fold6 voi man hinh gap vuot troi.', 'device', 'White', NULL, 0, 1),
    ('Lenovo ThinkBook 14 G6 IRL', 'Lenovo', 0, 1, 18290000, 'Lenovo ThinkBook 14 G6 IRL hoan hao cho cong viec thuong ngay cua ban, san sang duong dau moi thu thach.', 'device', 'Grey', NULL, 0, 1),
    ('Tai nghe Bluetooth Edifier W800BT Pro', 'Edifier', 0, 1, 1080000, 'Tai nghe chup tai voi am thanh vuot troi.', 'accessory', 'Black', NULL, 0, 5),
    ('Tai nghe AirPods Max', 'Apple', 0, 1, 12990000, 'AirPods Max dem toi su can bang hoan hao giua trai nghiem am thanh trung thuc va tinh tien dung.', 'accessory', 'Silver', 1, 10, 4);
    ('iPhone 15 Pro Max','Apple',0,1,32990000,'iPhone 15 Pro Max trang bị chip A17 Pro, cụm camera chuyên nghiệp và màn hình Super Retina XDR 6.7 inch.','device',NULL,NULL,0,1),
    ('Samsung Galaxy S24 Ultra','Samsung',0,1,28990000,'Samsung Galaxy S24 Ultra sở hữu màn hình Dynamic AMOLED 2X 6.8 inch và camera 200MP ấn tượng.','device',NULL,NULL,0,1),
    ('Xiaomi 14 Ultra','Xiaomi',0,1,24990000,'Xiaomi 14 Ultra mang đến hiệu năng vượt trội với chip Snapdragon 8 Gen 3 và camera Leica cao cấp.','device',NULL,NULL,0,1),
    ('OPPO Find X7 Ultra','OPPO',0,0,21990000,'OPPO Find X7 Ultra có thiết kế tinh tế, màn hình AMOLED 6.8 inch và camera ấn tượng.','device',NULL,NULL,0,1),
    ('iPhone 15','Apple',0,1,21990000,'iPhone 15 thiết kế gọn nhẹ, trang bị chip A16 Bionic và camera kép chất lượng.','device',NULL,NULL,0,1),
    ('Samsung Galaxy S24','Samsung',0,1,19990000,'Samsung Galaxy S24 với màn hình Dynamic AMOLED 2X 6.2 inch và chip Exynos 2400.','device',NULL,NULL,0,1),
    ('Xiaomi 14','Xiaomi',0,1,16990000,'Xiaomi 14 nổi bật với cấu hình mạnh mẽ, chip Snapdragon 8 Gen 3 và camera 50MP.','device',NULL,NULL,0,1),
    ('OPPO Reno 12 Pro','OPPO',0,1,14990000,'OPPO Reno 12 Pro sở hữu thiết kế thời thượng, màn hình 6.7 inch và camera 50MP.','device',NULL,NULL,0,1),
    ('Vivo X100 Pro','Vivo',0,1,22990000,'Vivo X100 Pro trang bị chip Snapdragon 8 Gen 3, camera chuyên nghiệp và màn hình 6.78 inch.','device',NULL,NULL,0,1),
    ('iPhone 14 Pro Max','Apple',0,0,26990000,'iPhone 14 Pro Max với màn hình ProMotion 6.7 inch, chip A16 Bionic và camera Pro 48MP.','device',NULL,NULL,0,1),
    ('Realme GT 6','Realme',0,1,15990000,'Realme GT 6 cung cấp hiệu năng cao với chip Snapdragon 8s Gen 3 và màn hình 6.78 inch.','device',NULL,NULL,0,1),
    ('Nokia X50','Nokia',0,1,9990000,'Nokia X50 thiết kế bền bỉ, trang bị chip Snapdragon và camera Zeiss chất lượng.','device',NULL,NULL,0,1),
    ('MacBook Pro 16-inch','Apple',0,1,55990000,'MacBook Pro 16-inch trang bị chip M2 Pro, màn hình Retina sắc nét và bàn phím Magic Keyboard.','device',NULL,NULL,0,2),
    ('Dell XPS 13','Dell',0,1,33990000,'Dell XPS 13 với thiết kế mỏng nhẹ, màn hình InfinityEdge 13.4 inch và chip Intel i7-1355U.','device',NULL,NULL,0,2),
    ('HP Spectre x360','HP',0,1,30990000,'HP Spectre x360 14 inch 2-in-1 có màn hình OLED và chip Intel i7 thế hệ 12.','device',NULL,NULL,0,2),
    ('Lenovo ThinkPad X1 Carbon','Lenovo',0,1,31990000,'ThinkPad X1 Carbon 14 inch nhẹ nhàng, chip Intel i7-1365U và độ bền quân sự.','device',NULL,NULL,0,2),
    ('ASUS ROG Zephyrus G14','ASUS',0,1,36990000,'ASUS ROG Zephyrus G14 sở hữu CPU Ryzen 9 7940HS, GPU RTX 4070 và màn hình 14 inch 120Hz.','device',NULL,NULL,0,2),
    ('Acer Swift 5','Acer',0,1,25990000,'Acer Swift 5 14 inch siêu nhẹ, chip Intel i5-1335U và thời lượng pin lâu.','device',NULL,NULL,0,2),
    ('Microsoft Surface Laptop 5','Microsoft',0,1,27990000,'Surface Laptop 5 13.5 inch, chip Intel i5-1235U và bàn phím Alcantara.','device',NULL,NULL,0,2),
    ('Razer Blade 14','Razer',0,1,41990000,'Razer Blade 14 gaming laptop với CPU Ryzen 9 7940HS và GPU RTX 4070, màn hình 14 inch QHD 165Hz.','device',NULL,NULL,0,2),
    ('iPad Pro 11-inch','Apple',0,1,24990000,'iPad Pro 11-inch M2 với màn hình Liquid Retina 120Hz và hỗ trợ Apple Pencil 2.','device',NULL,NULL,0,3),
    ('Samsung Galaxy Tab S8','Samsung',0,1,19990000,'Galaxy Tab S8 với màn hình TFT 11 inch, chip Snapdragon 8 Gen 1 và bút S Pen.','device',NULL,NULL,0,3),
    ('Xiaomi Pad 6','Xiaomi',0,1,8990000,'Xiaomi Pad 6 11 inch, chip Snapdragon 870 và loa stereo Harman Kardon.','device',NULL,NULL,0,3),
    ('Huawei MatePad Pro','Huawei',0,1,17990000,'Huawei MatePad Pro 12.6 inch OLED, chip Kirin 9000E và bút M-Pencil.','device',NULL,NULL,0,3),
    ('Lenovo Tab P11 Pro','Lenovo',0,1,11990000,'Lenovo Tab P11 Pro 11.5 inch OLED, chip Snapdragon 730G và bốn loa JBL.','device',NULL,NULL,0,3),
    ('Amazon Fire HD 10','Amazon',0,1,4990000,'Amazon Fire HD 10 11th Gen, màn hình 10.1 inch Full HD và pin 12 giờ.','device',NULL,NULL,0,3),
    ('Microsoft Surface Go 3','Microsoft',0,1,10990000,'Surface Go 3 10.5 inch, chip Intel Pentium Gold 6500Y và hỗ trợ Type Cover.','device',NULL,NULL,0,3),
    ('Huawei MatePad','Huawei',0,1,9990000,'Huawei MatePad 10.4 inch, chip Kirin 810 và hỗ trợ bút cảm ứng.','device',NULL,NULL,0,3),
    ('Sony WH-1000XM5','Sony',0,1,7990000,'Sony WH-1000XM5 tai nghe chống ồn chủ động, pin 30 giờ và âm thanh cao cấp.','device',NULL,NULL,0,4),
    ('Bose QuietComfort 45','Bose',0,1,7490000,'Bose QuietComfort 45 chống ồn, pin 24 giờ và kết nối Bluetooth 5.1.','device',NULL,NULL,0,4),
    ('Sennheiser HD 450BT','Sennheiser',0,1,3490000,'Sennheiser HD 450BT tai nghe không dây, chống ồn và âm thanh Hi-Fi.','device',NULL,NULL,0,4),('Apple AirPods Max','Apple',0,0,12990000,'AirPods Max tai nghe over-ear với âm thanh động lực học cao cấp và chống ồn chủ động.','device',NULL,NULL,0,4),
    ('Beats Studio3','Beats',0,1,5290000,'Beats Studio3 Wireless, chống ồn chủ động và thời lượng pin 22 giờ.','device',NULL,NULL,0,4),
    ('JBL Live 660NC','JBL',0,1,2990000,'JBL Live 660NC chống ồn, kết nối Bluetooth 5.0 và âm thanh JBL Signature.','device',NULL,NULL,0,4),
    ('Bang & Olufsen Beoplay HX','Bang & Olufsen',0,1,12990000,'Beoplay HX cao cấp, âm thanh 3D và pin 35 giờ.','device',NULL,NULL,0,4),
    ('Jabra Elite 85h','Jabra',0,1,3990000,'Jabra Elite 85h chống ồn chủ động, pin 36 giờ và chống nước IP52.','device',NULL,NULL,0,4),
    ('Apple Watch Series 9','Apple',0,1,11990000,'Apple Watch Series 9 với chip S9, màn hình Always-On Retina và đo ECG.','device',NULL,NULL,0,5),
    ('Samsung Galaxy Watch 6','Samsung',0,1,7490000,'Galaxy Watch 6 44mm, màn hình Super AMOLED và theo dõi sức khỏe toàn diện.','device',NULL,NULL,0,5),
    ('Fitbit Sense 2','Fitbit',0,1,4990000,'Fitbit Sense 2 đo ECG, đo nhiệt độ da và theo dõi stress.','device',NULL,NULL,0,5),
    ('Garmin Venu 3','Garmin',0,1,8990000,'Garmin Venu 3 OLED, định vị GPS, đo nhịp tim và theo dõi thể thao.','device',NULL,NULL,0,5),
    ('Huawei Watch GT 4','Huawei',0,1,6490000,'Huawei Watch GT 4 pin 2 tuần, màn hình AMOLED và theo dõi sức khỏe.','device',NULL,NULL,0,5),
    ('Amazfit GTR 4','Amazfit',0,1,3990000,'Amazfit GTR 4 1.43 inch AMOLED, đo nồng độ oxy máu và GPS đa chế độ.','device',NULL,NULL,0,5),
    ('Fossil Gen 6','Fossil',0,1,5490000,'Fossil Gen 6 Snapdragon Wear 4100+ và sạc nhanh, theo dõi sức khỏe cơ bản.','device',NULL,NULL,0,5),
    ('TicWatch Pro 3','Mobvoi',0,1,6790000,'TicWatch Pro 3 với dual-layer display, chip Snapdragon Wear 4100 và pin 3 ngày.','device',NULL,NULL,0,5);

-- Insert bảng Device
INSERT INTO device (id, ram, operator_system, battery_capacity, `weight`, camera, storage, screen_size, display_resolution) 
VALUES 
    (1, '4GB', 'iOS', '2815 mAh', '164 g', '12 MP', '256GB', '6.1 inches', '1170 x 2532 pixels'),
    (2, '4GB', 'Android', '7040 mAh', '467 g', '8 MP', NULL, '10.4 inches', '1200 x 2000 pixels'),
    (3, '8GB', 'Android', '5000 mAh', '187 g', '50 MP', '256GB', '6.7 inches', '1080 x 2040 pixels'),
    (4, '12GB', 'Android', '4400 mAh', '239 g', '50 MP', '256GB', '7.6 inches', '2160 x 1856 pixels'),
    (5, '16GB', 'Android', '60 Wh', '1.38 kg', '1080p Webcam', '512GB', '14 inches', '1920 x 1200 pixels');

-- Insert bảng Accessory
INSERT INTO accessory (id, battery_capacity) 
VALUES 
    (6,'45 hours'),
    (7,'20 hours');

-- Insert bảng Delivery
INSERT INTO delivery (shipping_provider, actual_delivery_date, estimated_delivery_date, shipping_address, lname, fname, phone_number)
VALUES 
    ('Viettel Post', '2023-11-08', '2023-11-08', '345 Pham Van Dong Street, Thu Duc, HCMC', 'Tran', 'Nguyen', '0862549670'),
    ('Vietnam Post', '2023-01-13', '2023-01-14', '31A Pham Van Dong Street, Thu Duc, HCMC', 'Le', 'Bao', '0968125694'),
    ('J&T Express', '2023-12-05', '2023-12-04', '123 Pham Van Dong Street, Thu Duc, HCMC', 'Nguyen', 'Hoa', '0369142631'),
    ('Viettel Post', '2024-11-03', '2024-11-03', '123 Pham Van Dong Street, Thu Duc, HCMC', 'Nguyen', 'Hoa', '0369142631'),
	('J&T Express', '2024-12-03', '2023-12-02', '123 Pham Van Dong Street, Thu Duc, HCMC', 'Bui', 'Lan', '0352583109'),
	('J&T Express', '2023-12-01', '2023-12-01', '123 Pham Van Dong Street, Thu Duc, HCMC', 'Nguyen', 'Nam', '0376872568');

-- Insert bảng Employee
INSERT INTO employee (employee_id, identity_card, lname, fname, phone_number, dob, hire_date, email, supervisor_id, supervise_date, store_id) 
VALUES 
    (7, '056190536152', 'Nguyen', 'Anh', '0932345678', '1990-01-15', '2023-11-09', 'anh.nguyen@example.com', NULL, NULL, 1),
    (8, '075292436579', 'Tran', 'Khoa', '0946343210', '1992-04-25', '2023-04-09', 'khoa.tran@example.com', 7, '2023-04-10', 1),
    (9, '043388016869', 'Nguyen', 'Phi', '0975344567', '1988-03-12', '2022-12-09', 'phi.nguyen@example.com', 8, '2022-12-09', 1),
    (10, '048135287416', 'Le', 'Phi', '0914344156', '1993-07-19', '2021-11-09', 'phi.le@example.com', 8, '2023-10-07', 1),
	(11, '052201895236', 'Pham', 'Tai', '0352689512', '2001-10-08', '2022-05-02', 'ptai205@example.com', NULL, NULL, 2),
	(12, '075103956102', 'Tran', 'Khoa', '0368512569', '2003-02-19', '2022-12-23', 'khoatrk22@example.com', 11, '2023-01-05', 2);

-- Insert bảng [Order]
INSERT INTO `orders` (order_date, order_status, total_amount, employee_id, customer_id, delivery_id) 
VALUES 
    ('2023-12-05', 'pending', 0, 7, 4, 1),
    ('2024-11-03', 'pending', 0, 8, 4, 4),
    ('2023-11-08', 'pending', 0, 7, 5, 2),
    ('2023-01-13', 'pending', 0, 8, 2, 3),
	('2024-12-01', 'pending', 0, 11, 3, 5),
	('2024-11-29', 'pending', 0, 10, 1, 6);

-- Insert bảng Payment
INSERT INTO payment (order_id, payment_date, payment_status, method) 
VALUES 
    (1, '2023-12-05', 'completed', 'COD'),
    (2, '2024-11-03', 'completed', 'COD'),
    (3, '2023-11-08', 'completed', 'Credit Card'),
    (4, '2023-01-13', 'completed', 'COD'),
	(5, '2024-12-01', 'completed', 'Credit Card'),
	(6, '2024-11-29', 'completed', 'COD');

-- Insert bảng GoodsDeliveryNote
INSERT INTO goods_delivery_note(`date`, order_id, employee_id) 
VALUES 
    ('2023-12-04', 1, 7),
    ('2024-11-03', 2, 8),
    ('2024-01-13', 4, 8),
	('2024-11-30', 6, 10);

-- Insert bảng Product
INSERT INTO `product`(store_id, device_id, note_id) 
VALUES 
    (1, 1, 1),
	(2, 2, 2),
    (1, 5, 2),
    (1, 1, 3),
    (1, 3, 4);

-- Insert bảng Review
INSERT INTO review (product_line_id, customer_id, `index`, review_date, approval_status, review_text, rating) 
VALUES 
    (1, 4, 1, '2023-12-15', 'accepted', 'Excellent', 5),
    (3, 5, 1, '2024-01-10', 'accepted', 'Good quality', 4),
    (6, 3, 1, '2024-02-20', 'pending', 'Average', 3);

-- Insert bảng SpecialFeature
INSERT INTO special_feature(device_id, special_feature	) 
VALUES 
    (1, 'Waterproof, Bluetooth, Wireless Charging, Fast Charging'),
    (2, 'Noise Cancelling, Bluetooth, USB Type-C'),
    (3, 'High Resolution Display, Fast Processor'),
    (4, 'Lightweight, Compact Design'),
    (5, 'Long Battery Life, Fast Charging');

-- Insert bảng Connections
INSERT INTO connections(accessory_id, `connection`) 
VALUES 
    (6, 'USB Type-C, Bluetooth'),
    (7, 'USB Type-C, Bluetooth');

-- Insert bảng Images
INSERT INTO images (product_line_id, `image`) 
VALUES 
    (1, 'image1.jpg'),
    (2, 'image2.jpg'),
    (3, 'image3.png'),
    (4, 'image4.png'),
    (5, 'image5.jpg'),
    (6, 'image6.png'),
    (7, 'image7.png');
    (8, 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg'),
    (9, 'https://cdn.tgdd.vn/Products/Images/42/307174/TimerThumb/samsung-galaxy-s24-ultra-5g-(68).jpg'),
    (10, 'https://cdn.tgdd.vn/Products/Images/42/313889/xiaomi-14-ultra-1-750x500.jpg'),
    (11, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/e/d/eda006276802c_1.jpg'),
    (12, 'https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-hong-thumb-1-600x600.jpg'),
    (13, 'https://cdn.tgdd.vn/Products/Images/42/333363/TimerThumb/samsung-galaxy-s25-(24).jpg'),
    (14, 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/333147/xiaomi-redmi-note-14-purple-1-638723659806437798-750x500.jpg'),
    (15, 'https://cdn.tgdd.vn/Products/Images/42/327192/TimerThumb/oppo-reno12-5g-12gb-512gb-(32).jpg'),
    (16, 'https://cdn.tgdd.vn/Products/Images/42/307003/vivo-x100-pro-600x600.jpg'),
    (17, 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-tim-thumb-600x600.jpg'),
    (18, 'https://cdn.tgdd.vn/Products/Images/42/309861/realme-gt-neo6-600x600.jpg'),
    (19, 'https://cdn.tgdd.vn/Products/Images/42/237944/nokia-x50-600x600.jpg'),
    (20, 'https://laptopkhanhtran.vn/pic/product/Dell-XPS-_638702064881017032_HasThumb.jpg'),
    (21, 'https://hanoilab.com/wp-content/uploads/2024/10/Hp-Speectre-X360-HanoiLab--768x768.jpg')


-- Insert bảng CartIncludesProductLine
INSERT INTO cart_includes_product_line(product_line_id, customer_id, price, quantity) 
VALUES 
    (6, 3, 1080000, 2),
    (2, 1, 11000000, 1),
	(3, 2, 6990000, 1);

-- Insert bảng OrderIncludesProductLine
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (1, 1, 11000000, 1);
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (1, 4, 11000000, 2);
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (2, 2, 6990000, 1);
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (6, 3, 1080000, 2);
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (7, 5, 12990000, 1);
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (3, 6, 9090000, 1);
INSERT INTO order_includes_product_line(product_line_id, order_id, price, quantity) 
VALUES (5, 2, 18500000, 1);

SET SQL_SAFE_UPDATES = 0;

UPDATE `orders` SET order_status = 'completed';

-- Insert bảng ProductLineManagedByEmployee
INSERT INTO product_line_managed_by_employee(product_line_id, employee_id) 
VALUES 
    (1, 7),
    (2, 8),
    (3, 9),
    (4, 8),
    (5, 7);

-- Insert bảng AccessoryInStore
INSERT INTO `accessory_in_store` (accessory_id, store_id, stock_quantity) 
VALUES 
    (6, 1, 100),
    (7, 2, 150);



