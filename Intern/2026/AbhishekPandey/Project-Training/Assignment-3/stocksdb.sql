DROP DATABASE IF EXISTS stocksdb;
CREATE DATABASE IF NOT EXISTS stocksdb;
USE stocksdb;

CREATE TABLE stock (
    profile_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    api_external_id VARCHAR(50) UNIQUE COMMENT 'Stores CarWale String ID',
    make_id SMALLINT UNSIGNED NOT NULL,
    city_id SMALLINT UNSIGNED NOT NULL,

    model_name VARCHAR(100) NOT NULL,
    version_name VARCHAR(100) DEFAULT NULL COMMENT 'Car variant/version',

    km_numeric INT UNSIGNED DEFAULT NULL COMMENT 'Kilometers driven',

    fuel TINYINT UNSIGNED NOT NULL COMMENT '1:Petrol, 2:Diesel, 3:CNG, etc',

    make_year YEAR NOT NULL COMMENT 'Manufacturing year',

    price_numeric INT UNSIGNED NOT NULL,

    emi_price INT UNSIGNED DEFAULT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_make_id (make_id),
    INDEX idx_city_id (city_id),
    INDEX idx_model_name (model_name),
    INDEX idx_fuel (fuel),
    INDEX idx_price_numeric (price_numeric),
    INDEX idx_make_year (make_year),
    INDEX idx_active (is_active),

    INDEX idx_active_make (is_active, make_id),
    INDEX idx_active_city (is_active, city_id),
    INDEX idx_active_price (is_active, price_numeric),
    INDEX idx_active_fuel (is_active, fuel),

    INDEX idx_make_fuel (make_id, fuel),
    INDEX idx_fuel_price (fuel, price_numeric)
);




CREATE TABLE make (
    make_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    make_name VARCHAR(100) NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_make_name (make_name)
);


CREATE TABLE city (
    city_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    city_name VARCHAR(100) NOT NULL UNIQUE,
    
    is_popular BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_city_name (city_name),
    INDEX idx_is_popular (is_popular)
);


CREATE TABLE stock_images (
    image_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    profile_id BIGINT UNSIGNED NOT NULL,
    
    image_url VARCHAR(500) NOT NULL,
    
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_profile_id (profile_id),
    INDEX idx_is_active (is_active),
    INDEX idx_profile_active (profile_id, is_active)
);

