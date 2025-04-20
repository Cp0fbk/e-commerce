CREATE SCHEMA `e-commerce`;
USE `e-commerce`;

CREATE TABLE `e-commerce`.`account` (
    account_id          INT             auto_increment PRIMARY KEY,
    username            VARCHAR(20)     UNIQUE NOT NULL,
    `password`          VARCHAR(30)     NOT NULL,
    `role`              VARCHAR(8)      NOT NULL CHECK(role in ('customer', 'employee'))
);

CREATE TABLE `e-commerce`.`membership_class` (
	id					int				primary key auto_increment,
    `name`				varchar(30)		unique not null,
    discount_percent	smallint		not null check(discount_percent >= 0 AND discount_percent < 100),
    minimum_no_point	int				unique not null
);

CREATE TABLE `e-commerce`.`customer` (
	customer_id				INT				PRIMARY KEY,
	phone_number			CHAR(10)		UNIQUE NOT NULL,
	email					VARCHAR(50)		UNIQUE,
	registration_date		DATE			NOT NULL DEFAULT '2000-01-01',
	shipping_address		VARCHAR(100),
	lname					VARCHAR(40)		NOT NULL,
	fname					VARCHAR(15)		NOT NULL,
	total_points			INT				DEFAULT 0,
	membership_class_id		INT				NOT NULL,
	is_deleted				BOOLEAN			NOT NULL DEFAULT 0,
	CONSTRAINT fk_membership_class_customer
		FOREIGN KEY (membership_class_id) REFERENCES membership_class(id),
    CONSTRAINT fk_customer_id_customer
        FOREIGN KEY (customer_id) REFERENCES account(account_id)
);

CREATE TABLE `e-commerce`.cart (
	customer_id				INT				PRIMARY KEY,
	total_amount			DOUBLE			NOT NULL DEFAULT 0,
	created_date			DATE,
	CONSTRAINT fk_customer_id_cart
		FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE `e-commerce`.store (
	store_id				INT				auto_increment PRIMARY KEY,
	number_of_employees		INT				NOT NULL DEFAULT 0,
	area					DOUBLE,
	store_name				VARCHAR(50),
	`address`				VARCHAR(150)	UNIQUE NOT NULL
);

CREATE TABLE `e-commerce`.promotion (
	promotion_id			INT				auto_increment PRIMARY KEY,
	`type`					VARCHAR(20),
	`name`					VARCHAR(70)		NOT NULL,
	`start_date`			DATE			NOT NULL,
	end_date				DATE			NOT NULL
);

CREATE TABLE `e-commerce`.category_type (
	category_type_id		INT				auto_increment PRIMARY KEY,
	`name`					VARCHAR(30)		UNIQUE NOT NULL
);

CREATE TABLE `e-commerce`.product_line (
	id						INT				auto_increment PRIMARY KEY,
	`name`					VARCHAR(100)	NOT NULL,
	brand					VARCHAR(50)		NOT NULL,
	is_used					BOOLEAN			NOT NULL,
	stock_status			BOOLEAN			NOT NULL,
	price					DOUBLE			NOT NULL,
	`description`			TEXT,
	category				VARCHAR(15)		CHECK (category IN ('device', 'accessory')),
	color					VARCHAR(15),
	promotion_id			INT,
	discount_percentage		SMALLINT		CHECK (discount_percentage >= 0 AND discount_percentage < 100),
	category_type_id		INT				NOT NULL,
	CONSTRAINT fk_promotion_id_product_line
		FOREIGN KEY (promotion_id) REFERENCES promotion(promotion_id),
	CONSTRAINT fk_category_type_id_product_line
		FOREIGN KEY (category_type_id) REFERENCES category_type(category_type_id)
);

CREATE TABLE `e-commerce`.device (
	id						INT PRIMARY KEY,
	ram						VARCHAR(15),
	operator_system			VARCHAR(20),
	battery_capacity		VARCHAR(30),
	`weight`				VARCHAR(15),
	camera					VARCHAR(50),
	`storage`				VARCHAR(15),
	screen_size				VARCHAR(30),
	display_resolution		VARCHAR(30),
	CONSTRAINT fk_id_device
		FOREIGN KEY (id) REFERENCES product_line(id)
);

CREATE TABLE `e-commerce`.accessory (
	id						INT	 			PRIMARY KEY,
	battery_capacity		VARCHAR(30),
	CONSTRAINT fk_id_accessory
		FOREIGN KEY (id) REFERENCES product_line(id)
);

CREATE TABLE `e-commerce`.delivery (
	delivery_id				INT				auto_increment PRIMARY KEY,
	shipping_provider		VARCHAR(30),
	actual_delivery_date	DATE,
	estimated_delivery_date	DATE,
    shipping_province       VARCHAR(17),    -- check if shipping_province is valid
	shipping_address		VARCHAR(100),
	lname					VARCHAR(40)		NOT NULL,
	fname					VARCHAR(15)		NOT NULL
);

CREATE TABLE `e-commerce`.employee (
	employee_id				INT				PRIMARY KEY,
	identity_card			CHAR(12)		UNIQUE NOT NULL,
	lname					VARCHAR(40)		NOT NULL,
	fname					VARCHAR(15)		NOT NULL,
	phone_number			CHAR(10)		UNIQUE,
	dob						DATE			NOT NULL,
	hire_date				DATE			NOT NULL DEFAULT '2000-01-01',
	email					VARCHAR(50),
	supervisor_id			INT,
	supervise_date			DATE,
	store_id				INT				NOT NULL,
	is_deleted				BOOLEAN			NOT NULL DEFAULT 0,
	CONSTRAINT fk_supervisor_id_employee
		FOREIGN KEY (supervisor_id) REFERENCES employee(employee_id),
	CONSTRAINT fk_store_id_employee
		FOREIGN KEY (store_id) REFERENCES store(store_id),
    CONSTRAINT fk_employee_id_employee
        FOREIGN KEY (employee_id) REFERENCES account(account_id)
);

CREATE TABLE `e-commerce`.`orders`(
	order_id			INT				auto_increment PRIMARY KEY,
	order_date			DATE,
	order_status		VARCHAR(20)		NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'shipping', 'completed')),
	total_amount		DOUBLE			NOT NULL DEFAULT 0,
	employee_id			INT,
	customer_id			INT				NOT NULL,
	delivery_id			INT,
	CONSTRAINT fk_employee_id_order
		FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
	CONSTRAINT fk_customer_id_order
		FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
	CONSTRAINT fk_delivery_id_order
		FOREIGN KEY (delivery_id) REFERENCES delivery(delivery_id)
);

CREATE TABLE `e-commerce`.payment (
	order_id			INT				PRIMARY KEY,
	payment_date		DATE,
	payment_status		VARCHAR(20)		NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed')),
	method				VARCHAR(30),
	CONSTRAINT fk_order_id_payment
		FOREIGN KEY (order_id) REFERENCES `orders`(order_id)
);

CREATE TABLE `e-commerce`.goods_delivery_note (
	id						INT				auto_increment PRIMARY KEY,
	`date`					DATE,
	order_id				INT				UNIQUE NOT NULL,
	employee_id				INT,
	CONSTRAINT fk_order_id_goods_delivery_note
		FOREIGN KEY (order_id) REFERENCES `orders`(order_id),
	CONSTRAINT fk_employee_id_goods_delivery_note
		FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE `e-commerce`.`product` (
	`serial`				INT				auto_increment PRIMARY KEY,
	store_id				INT				NOT NULL,
	device_id				INT				NOT NULL,
	note_id					INT,
	CONSTRAINT fk_store_id_product
		FOREIGN KEY (store_id) REFERENCES store(store_id),
	CONSTRAINT fk_device_id_product
		FOREIGN KEY (device_id) REFERENCES device(id),
	CONSTRAINT fk_note_id_product
		FOREIGN KEY (note_id) REFERENCES goods_delivery_note(id)
);

CREATE TABLE `e-commerce`.review (
	product_line_id		INT,
	customer_id			INT,	
	`index`				INT,
	review_date			DATE,
	approval_status		VARCHAR(20)		NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'accepted', 'rejected')),
	review_text			TEXT,
	rating				SMALLINT		NOT NULL CHECK (rating >= 1 AND rating <= 5),
	CONSTRAINT pk_review
		PRIMARY KEY (product_line_id, customer_id, `index`),
	CONSTRAINT fk_product_id_review
		FOREIGN KEY (product_line_id) REFERENCES product_line(id),
	CONSTRAINT fk_customer_id_review
		FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE `e-commerce`.special_feature (
	device_id				INT,
	special_feature			VARCHAR(75),
	CONSTRAINT pk_special_feature
		PRIMARY KEY (device_id, special_feature),
	CONSTRAINT fk_device_id_special_feature
		FOREIGN KEY (device_id) REFERENCES device(id)
);

CREATE TABLE `e-commerce`.connections (
	accessory_id			INT,
	`connection`			VARCHAR(30),
	CONSTRAINT pk_connections
		PRIMARY KEY (accessory_id, `connection`),
	CONSTRAINT fk_accessory_id_connections
		FOREIGN KEY (accessory_id) REFERENCES accessory(id)
);

CREATE TABLE `e-commerce`.images (
	product_line_id		INT ,
	`image`				VARCHAR(50),
	CONSTRAINT pk_images
		PRIMARY KEY (product_line_id, `image`),
	CONSTRAINT fk_product_line_id_images
		FOREIGN KEY (product_line_id) REFERENCES product_line(id)
);

CREATE TABLE `e-commerce`.cart_includes_product_line (
	product_line_id		INT,
	customer_id			INT,
	price				DOUBLE			NOT NULL,
	quantity			INT				NOT NULL,
	CONSTRAINT pk_cart_includes_product_line
		PRIMARY KEY (product_line_id, customer_id),
	CONSTRAINT fk_product_line_id_cart_includes_product_line
		FOREIGN KEY (product_line_id) REFERENCES product_line(id),
	CONSTRAINT fk_customer_id_cart_includes_product_line
		FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE `e-commerce`.order_includes_product_line (
	product_line_id			INT,
	order_id				INT,
	price					DOUBLE			NOT NULL,
	quantity				INT				NOT NULL,
	CONSTRAINT pk_order_includes_product_line
		PRIMARY KEY (product_line_id, order_id),
	CONSTRAINT fk_product_line_id_order_includes_product_line
		FOREIGN KEY (product_line_id) REFERENCES product_line(id),
	CONSTRAINT fk_order_id_order_includes_product_line
		FOREIGN KEY (order_id) REFERENCES `orders`(order_id)
);

CREATE TABLE `e-commerce`.product_line_managed_by_employee (
	product_line_id		INT,
	employee_id			INT,
	CONSTRAINT pk_product_line_managed_by_employee
		PRIMARY KEY (product_line_id, employee_id),
	CONSTRAINT fk_product_line_id_product_line_managed_by_employee
		FOREIGN KEY (product_line_id) REFERENCES product_line(id),
	CONSTRAINT fk_employee_id_product_line_managed_by_employee
		FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE `e-commerce`.accessory_in_store (
	accessory_id			INT,
	store_id				INT,
	stock_quantity			INT			NOT NULL,
	CONSTRAINT pk_accessory_in_store
		PRIMARY KEY (accessory_id, store_id),
	CONSTRAINT fk_accessory_id_accessory_in_store
		FOREIGN KEY (accessory_id) REFERENCES accessory(id),
	CONSTRAINT fk_store_id_accessory_in_store
		FOREIGN KEY (store_id) REFERENCES store(store_id)
);