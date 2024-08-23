-- Active: 1688058642640@@127.0.0.1@5432@PneumlOT@public

DROP SCHEMA if EXISTS pneumiot CASCADE;

CREATE SCHEMA IF NOT EXISTS pneumiot;


Create table if not exists pneumiot.units(
    unit_id Serial not null,
    unit_abbreviation char(8) not null,
    unit_description CHARACTER VARYING(64),
    PRIMARY KEY(unit_id)
);

-- Creation of the sensor board --
CREATE TABLE IF NOT EXISTS pneumiot.sensor(
    sensor_id SERIAL not null,
    sensor_code CHARACTER VARYING(64) NOT NULL,
    sensor_type CHARACTER VARYING(64) NOT NULL,
    unit_id int NOT NULL,
    min_value numeric(4,2) NOT NULL,
    max_value numeric(4,2) NOT NULL,
    PRIMARY KEY(sensor_id),
    FOREIGN KEY(unit_id) REFERENCES pneumiot.units(unit_id) ON DELETE RESTRICT
);


-- Creation of the board table --
CREATE TABLE IF NOT EXISTS pneumiot.board(
    board_id SERIAL NOT NULL,
    board_code CHARACTER VARYING(64) NOT null,
    PRIMARY KEY(board_id)
);



create table if not exists pneumiot.board_sensor (
	board_id INT NOT NULL,
    sensor_id INT NOT NULL,
    PRIMARY KEY (board_id, sensor_id),
    FOREIGN KEY (board_id) REFERENCES pneumiot.board (board_id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES pneumiot.sensor (sensor_id) ON DELETE CASCADE
);


-- Creation of the patient table --
CREATE TABLE IF NOT EXISTS pneumiot.patient (
    patient_id SERIAL NOT NULL,
    patient_dni VARCHAR(10) NOT NULL,
    board_id INT NOT NULL,
    discharge_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(patient_id),
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE RESTRICT
);

-- Creation of the measurements table --
CREATE TABLE IF NOT EXISTS pneumiot.measurements(
    measurement_id SERIAL NOT NULL,
    patient_id INT not null,
    board_id INT NOT NULL,
    sensor_id INT NOT NULL,
    sensor_value numeric(4,2) NOT NULL,
    log_time_utc TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    log_time_local TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(measurement_id),
    FOREIGN KEY (patient_id) REFERENCES pneumiot.patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES pneumiot.sensor(sensor_id) ON DELETE RESTRICT
);

-- Creation of the sensor_log table -- 
CREATE TABLE IF NOT EXISTS pneumiot.sensor_log (
    log_id SERIAL NOT NULL,
    board_id int not null,
    sensor_id int NOT NULL,
    log_message CHARACTER VARYING(264),
    PRIMARY KEY(log_id),
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES pneumiot.sensor(sensor_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pneumiot.permissions (
    permission_id SERIAL NOT NULL,
    permission_name VARCHAR(64) UNIQUE NOT NULL,
    permission_description VARCHAR(128),
    PRIMARY KEY(permission_id)
);

create table if not exists pneumiot.worker_role(
	worker_role_id SERIAL not null,
	worker_role_name VARCHAR(24),
	worker_role_description VARCHAR(64),
	primary key(worker_role_id)
);

CREATE TABLE IF NOT EXISTS pneumiot.role_permissions (
    role_permission_id SERIAL NOT NULL,
    worker_role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY(role_permission_id),
    FOREIGN KEY(worker_role_id) REFERENCES pneumiot.worker_role(worker_role_id) ON DELETE CASCADE,
    FOREIGN KEY(permission_id) REFERENCES pneumiot.permissions(permission_id) ON DELETE CASCADE
);

-- Creation of the worker table --
CREATE TABLE IF NOT EXISTS pneumiot.worker(
	worker_id SERIAL not null,
    worker_dni VARCHAR(64) UNIQUE NOT NULL,
    worker_email VARCHAR(64) NOT NULL,
    worker_name VARCHAR(20) NOT NULL,
    worker_surname VARCHAR(20) NOT NULL,
    worker_role_id int NOT NULL,
    PRIMARY KEY(worker_id),
    FOREIGN KEY(worker_role_id) REFERENCES pneumiot.worker_role(worker_role_id) 
);


-- Creation of the worker_auth table --
CREATE TABLE IF NOT EXISTS pneumiot.worker_auth(
    worker_auth_id SERIAL NOT NULL,
    worker_id INT not NULL,
    passwd_auth CHARACTER (128) NOT NULL,
    FOREIGN KEY (worker_id) REFERENCES pneumiot.worker(worker_id) ON DELETE CASCADE
);

-- Creation of the worker_log table --
CREATE TABLE IF NOT EXISTS pneumiot.worker_log(
    log_id Serial UNIQUE NOT NULL,
    worker_id INT NOT NULL,
    log_message VARCHAR(264) NOT NULL,
    PRIMARY KEY(log_id),
    FOREIGN KEY (worker_id) REFERENCES pneumiot.worker(worker_id) ON DELETE CASCADE
);

-- Creation of the doctor table --
CREATE TABLE IF NOT EXISTS pneumiot.doctor (
    doctor_patient_id serial,
    patient_id INT NOT NULL,
    worker_id INT NOT NULL,
    PRIMARY KEY (doctor_patient_id),
    FOREIGN KEY (worker_id) REFERENCES pneumiot.worker(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES pneumiot.patient(patient_id) ON DELETE CASCADE
);

create table if not exists pneumiot.index_rate(
    index_rate_id SERIAL NOT NULL,
    rate CHARACTER VARYING(32) NOT NULL,
    rate_description CHARACTER VARYING(128) NOT NULL,
    PRIMARY KEY(index_rate_id)
);

-- Creation of the hourly_average table --
CREATE TABLE IF NOT EXISTS pneumiot.hourly_average(
    hourly_average_id SERIAL NOT NULL,
    patient_id int not null,
    board_id int not null,
    sensor_id int NOT NULL,
    average_measure numeric(4,2) NOT NULL,
    index_rate_id int not null,
    hour_time int NOT NULL,
    day_date date NOT NULL,
    PRIMARY KEY(hourly_average_id),
    FOREIGN KEY (patient_id) REFERENCES pneumiot.patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES pneumiot.sensor(sensor_id) ON DELETE CASCADE,
    FOREIGN KEY (index_rate_id) REFERENCES pneumiot.index_rate(index_rate_id) ON DELETE RESTRICT
);
-- Creation of the daily_average table --
CREATE TABLE IF NOT EXISTS pneumiot.daily_average(
    daily_average_id SERIAL NOT NULL,
    patient_id int not null,
    board_id int not null,
    sensor_id int not null,
    average_measure numeric(4,2) NOT NULL,
    index_rate_id int not null,
    daily_day int NOT NULL,
    month_id int NOT NULL,
    PRIMARY KEY(daily_average_id),
    FOREIGN KEY (patient_id) REFERENCES pneumiot.patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES pneumiot.sensor(sensor_id) ON DELETE CASCADE,
    FOREIGN KEY (index_rate_id) REFERENCES pneumiot.index_rate(index_rate_id) ON DELETE RESTRICT
);


-- Creation of the monthly_average table --
CREATE TABLE IF NOT EXISTS pneumiot.monthly_average(
    monthly_average_id SERIAL NOT NULL,
    patient_id int not null,
    board_id int not null,
    sensor_id int not null,
    average_measure numeric(4,2) NOT NULL,
    index_rate_id int not null,
    month_number int NOT NULL,
    year_date int NOT NULL,
    PRIMARY KEY(monthly_average_id),
    FOREIGN KEY (patient_id) REFERENCES pneumiot.patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES pneumiot.sensor(sensor_id) ON DELETE CASCADE,
    FOREIGN KEY (index_rate_id) REFERENCES pneumiot.index_rate(index_rate_id) ON DELETE RESTRICT
);


-- Creation of the error_log table -- 
CREATE TABLE IF NOT EXISTS pneumiot.error_log (
    log_id SERIAL NOT NULL,
    log_message CHARACTER VARYING(264),
    PRIMARY KEY(log_id)
);