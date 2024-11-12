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
    discharge_date TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    admission_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(patient_id),
    FOREIGN KEY (board_id) REFERENCES pneumiot.board(board_id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS pneumiot.patient_aditional_info (
    patient_info_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    patient_surname VARCHAR(100) NOT NULL,
    date_birth DATE NOT NULL,
    genre VARCHAR(10) CHECK (genre IN ('M', 'F', 'Otro')),
    telephone_number VARCHAR(20),
    direction VARCHAR(150),
    alergies TEXT,
    medical_condition TEXT,
    blood_type VARCHAR(5),
    emergency_contact VARCHAR(100),
    emergency_phone_number VARCHAR(20),
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient_id FOREIGN KEY (patient_id) REFERENCES patient (patient_id) ON DELETE CASCADE
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
    year int not null,
    day_date DATE not null,
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

-- Creation of the log table -- 
CREATE TABLE IF NOT EXISTS pneumiot.log (
	log_id serial4 NOT NULL,
	log_message varchar(264) NULL,
	PRIMARY KEY(log_id)
);

-- Procedure to calculate daily averages for measurements
CREATE OR REPLACE PROCEDURE pneumiot.calculate_daily_average()
LANGUAGE plpgsql
AS $$
DECLARE
    v_patient_id INT;  -- Variable to store patient_id
    v_board_id INT;    -- Variable to store board_id
    v_sensor_id INT;   -- Variable to store sensor_id
    v_avg_value NUMERIC(4, 2);  -- Variable to store the average sensor value
    v_index_rate_id INT;  -- Variable to store the index rate ID based on the average
    v_day_date DATE := CURRENT_DATE - INTERVAL '1 day';  -- Previous day for daily calculation
    v_year INT := EXTRACT(YEAR FROM v_day_date);  -- Extract the year from the previous day
    v_month INT := EXTRACT(MONTH FROM v_day_date);  -- Extract the month from the previous day
    v_daily_day INT := EXTRACT(DAY FROM v_day_date);  -- Extract the day of the month

    -- Variables para validaciones de existencia
    v_patient_exists BOOLEAN;
    v_board_exists BOOLEAN;
    v_sensor_exists BOOLEAN;
BEGIN
    -- Loop through each combination of patient_id, board_id, and sensor_id
    FOR v_patient_id IN (SELECT DISTINCT patient_id FROM pneumiot.measurements) LOOP
        -- Validar existencia de patient_id
        SELECT EXISTS(SELECT 1 FROM pneumiot.patient WHERE patient_id = v_patient_id)
        INTO v_patient_exists;

        IF NOT v_patient_exists THEN
            CONTINUE;  -- Saltar si el paciente no existe
        END IF;

        FOR v_board_id IN (SELECT DISTINCT board_id FROM pneumiot.measurements WHERE patient_id = v_patient_id) LOOP
            -- Validar existencia de board_id
            SELECT EXISTS(SELECT 1 FROM pneumiot.board WHERE board_id = v_board_id)
            INTO v_board_exists;

            IF NOT v_board_exists THEN
                CONTINUE;  -- Saltar si el board no existe
            END IF;

            FOR v_sensor_id IN (SELECT DISTINCT sensor_id FROM pneumiot.measurements WHERE patient_id = v_patient_id AND board_id = v_board_id) LOOP
                -- Validar existencia de sensor_id
                SELECT EXISTS(SELECT 1 FROM pneumiot.sensor WHERE sensor_id = v_sensor_id)
                INTO v_sensor_exists;

                IF NOT v_sensor_exists THEN
                    CONTINUE;  -- Saltar si el sensor no existe
                END IF;

                -- Calcular el valor promedio del sensor para el día anterior
                SELECT AVG(sensor_value)::NUMERIC(4, 2)
                INTO v_avg_value
                FROM pneumiot.measurements
                WHERE patient_id = v_patient_id
                  AND board_id = v_board_id
                  AND sensor_id = v_sensor_id
                  AND log_time_local >= v_day_date
                  AND log_time_local < CURRENT_DATE;

                -- Asignar index_rate_id basado en el promedio y sensor_id
                CASE v_sensor_id
                    WHEN 1 THEN  -- Temperatura (sensor_id = 1)
                        IF v_avg_value < 18 OR v_avg_value > 27 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF v_avg_value >= 20 AND v_avg_value <= 24 THEN
                            v_index_rate_id := 1;  -- Muy Bueno
                        ELSE
                            v_index_rate_id := 2;  -- Normal
                        END IF;
                    WHEN 2 THEN  -- Humedad (sensor_id = 2)
                        IF v_avg_value < 30 OR v_avg_value > 70 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF (v_avg_value >= 30 AND v_avg_value < 40) OR (v_avg_value >= 60 AND v_avg_value < 70) THEN
                            v_index_rate_id := 2;  -- Normal
                        ELSE
                            v_index_rate_id := 1;  -- Muy Bueno
                        END IF;
                    WHEN 3 THEN  -- PM2.5 (sensor_id = 3)
                        IF v_avg_value > 25 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF v_avg_value >= 0 AND v_avg_value <= 10 THEN
                            v_index_rate_id := 1;  -- Muy Bueno
                        ELSE
                            v_index_rate_id := 2;  -- Normal
                        END IF;
                    WHEN 4 THEN  -- PPM (sensor_id = 4)
                        IF v_avg_value > 0.05 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF v_avg_value >= 0 AND v_avg_value <= 0.02 THEN
                            v_index_rate_id := 1;  -- Muy Bueno
                        ELSE
                            v_index_rate_id := 2;  -- Normal
                        END IF;
                    ELSE
                        v_index_rate_id := 2;  -- Normal por defecto si el sensor_id no es válido
                END CASE;

                -- Insertar los resultados en la tabla daily_average
                INSERT INTO pneumiot.daily_average (
                    patient_id, 
                    board_id, 
                    sensor_id, 
                    average_measure, 
                    index_rate_id, 
                    daily_day, 
                    month_id, 
                    year, 
                    day_date
                ) VALUES (
                    v_patient_id, 
                    v_board_id, 
                    v_sensor_id, 
                    v_avg_value, 
                    v_index_rate_id, 
                    v_daily_day, 
                    v_month, 
                    v_year, 
                    v_day_date
                );
            END LOOP;
        END LOOP;
    END LOOP;
END;
$$;

-- Procedure to calculate monthly averages for measurements
CREATE OR REPLACE PROCEDURE pneumiot.calculate_monthly_average()
LANGUAGE plpgsql
AS $$
DECLARE
    v_patient_id INT;  -- Variable to store patient_id
    v_board_id INT;    -- Variable to store board_id
    v_sensor_id INT;   -- Variable to store sensor_id
    v_avg_value NUMERIC(4, 2);  -- Variable to store the average sensor value
    v_index_rate_id INT;  -- Variable to store the index rate ID based on the average
    v_first_day_of_last_month DATE := (CURRENT_DATE - INTERVAL '1 month')::DATE;  -- First day of the last month
    v_last_day_of_last_month DATE := (CURRENT_DATE - INTERVAL '1 day')::DATE;  -- Last day of the last month
    v_month_number INT := EXTRACT(MONTH FROM v_first_day_of_last_month);  -- Extract the month of last month
    v_year INT := EXTRACT(YEAR FROM v_first_day_of_last_month);  -- Extract the year of last month

    -- Variables para validaciones de existencia
    v_patient_exists BOOLEAN;
    v_board_exists BOOLEAN;
    v_sensor_exists BOOLEAN;
BEGIN
    -- Loop through each combination of patient_id, board_id, and sensor_id
    FOR v_patient_id IN (SELECT DISTINCT patient_id FROM pneumiot.measurements) LOOP
        -- Validar existencia de patient_id
        SELECT EXISTS(SELECT 1 FROM pneumiot.patient WHERE patient_id = v_patient_id)
        INTO v_patient_exists;
        
        IF NOT v_patient_exists THEN
            CONTINUE;  -- Saltar si el paciente no existe
        END IF;

        FOR v_board_id IN (SELECT DISTINCT board_id FROM pneumiot.measurements WHERE patient_id = v_patient_id) LOOP
            -- Validar existencia de board_id
            SELECT EXISTS(SELECT 1 FROM pneumiot.board WHERE board_id = v_board_id)
            INTO v_board_exists;

            IF NOT v_board_exists THEN
                CONTINUE;  -- Saltar si el board no existe
            END IF;

            FOR v_sensor_id IN (SELECT DISTINCT sensor_id FROM pneumiot.measurements WHERE patient_id = v_patient_id AND board_id = v_board_id) LOOP
                -- Validar existencia de sensor_id
                SELECT EXISTS(SELECT 1 FROM pneumiot.sensor WHERE sensor_id = v_sensor_id)
                INTO v_sensor_exists;

                IF NOT v_sensor_exists THEN
                    CONTINUE;  -- Saltar si el sensor no existe
                END IF;

                -- Calcular el valor promedio del sensor para el mes anterior
                SELECT AVG(sensor_value)::NUMERIC(4, 2)
                INTO v_avg_value
                FROM pneumiot.measurements
                WHERE patient_id = v_patient_id
                  AND board_id = v_board_id
                  AND sensor_id = v_sensor_id
                  AND log_time_local >= v_first_day_of_last_month
                  AND log_time_local <= v_last_day_of_last_month;

                -- Asignar index_rate_id basado en el valor promedio y sensor_id
                CASE v_sensor_id
                    WHEN 1 THEN  -- Temperatura (sensor_id = 1)
                        IF v_avg_value < 18 OR v_avg_value > 27 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF v_avg_value >= 20 AND v_avg_value <= 24 THEN
                            v_index_rate_id := 1;  -- Muy Bueno
                        ELSE
                            v_index_rate_id := 2;  -- Normal
                        END IF;
                    WHEN 2 THEN  -- Humedad (sensor_id = 2)
                        IF v_avg_value < 30 OR v_avg_value > 70 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF (v_avg_value >= 30 AND v_avg_value < 40) OR (v_avg_value >= 60 AND v_avg_value < 70) THEN
                            v_index_rate_id := 2;  -- Normal
                        ELSE
                            v_index_rate_id := 1;  -- Muy Bueno
                        END IF;
                    WHEN 3 THEN  -- PM2.5 (sensor_id = 3)
                        IF v_avg_value > 25 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF v_avg_value >= 0 AND v_avg_value <= 10 THEN
                            v_index_rate_id := 1;  -- Muy Bueno
                        ELSE
                            v_index_rate_id := 2;  -- Normal
                        END IF;
                    WHEN 4 THEN  -- PPM (sensor_id = 4)
                        IF v_avg_value > 0.05 THEN
                            v_index_rate_id := 3;  -- Riesgoso
                        ELSIF v_avg_value >= 0 AND v_avg_value <= 0.02 THEN
                            v_index_rate_id := 1;  -- Muy Bueno
                        ELSE
                            v_index_rate_id := 2;  -- Normal
                        END IF;
                    ELSE
                        v_index_rate_id := 2;  -- Default a Normal si sensor_id no es válido
                END CASE;

                -- Insertar los resultados en la tabla monthly_average
                INSERT INTO pneumiot.monthly_average (
                    patient_id, 
                    board_id, 
                    sensor_id, 
                    average_measure, 
                    index_rate_id, 
                    month_number, 
                    year_date
                ) VALUES (
                    v_patient_id, 
                    v_board_id, 
                    v_sensor_id, 
                    v_avg_value, 
                    v_index_rate_id, 
                    v_month_number, 
                    v_year
                );
            END LOOP;
        END LOOP;
    END LOOP;
END;
$$;

-- Procedure to calculate hourly averages for measurements
CREATE OR REPLACE PROCEDURE pneumiot.calculate_hourly_average()
LANGUAGE plpgsql
AS $$
DECLARE
    v_patient_id INT;  -- Variable to store patient_id
    v_board_id INT;    -- Variable to store board_id
    v_sensor_id INT;   -- Variable to store sensor_id
    v_avg_value NUMERIC(8, 5);  -- Variable to store the average sensor value with 5 decimals
    v_index_rate_id INT;  -- Variable to store the index rate ID based on the average
    v_hour_time INT;  -- Variable to store the hour (0 to 23)
    v_day_date DATE := CURRENT_DATE - INTERVAL '1 day';  -- Previous day for hourly calculation
    v_start_hour TIMESTAMP;  -- Variable to store the start time of the hour
    v_end_hour TIMESTAMP;  -- Variable to store the end time of the hour

    -- Variables para validaciones de existencia
    v_patient_exists BOOLEAN;
    v_board_exists BOOLEAN;
    v_sensor_exists BOOLEAN;
BEGIN
    -- Loop through each combination of patient_id, board_id, and sensor_id
    FOR v_patient_id IN (SELECT DISTINCT patient_id FROM pneumiot.measurements) LOOP
        -- Validar existencia de patient_id
        SELECT EXISTS(SELECT 1 FROM pneumiot.patient WHERE patient_id = v_patient_id)
        INTO v_patient_exists;

        IF NOT v_patient_exists THEN
            CONTINUE;  -- Saltar si el paciente no existe
        END IF;

        FOR v_board_id IN (SELECT DISTINCT board_id FROM pneumiot.measurements WHERE patient_id = v_patient_id) LOOP
            -- Validar existencia de board_id
            SELECT EXISTS(SELECT 1 FROM pneumiot.board WHERE board_id = v_board_id)
            INTO v_board_exists;

            IF NOT v_board_exists THEN
                CONTINUE;  -- Saltar si el board no existe
            END IF;

            FOR v_sensor_id IN (SELECT DISTINCT sensor_id FROM pneumiot.measurements WHERE patient_id = v_patient_id AND board_id = v_board_id) LOOP
                -- Validar existencia de sensor_id
                SELECT EXISTS(SELECT 1 FROM pneumiot.sensor WHERE sensor_id = v_sensor_id)
                INTO v_sensor_exists;

                IF NOT v_sensor_exists THEN
                    CONTINUE;  -- Saltar si el sensor no existe
                END IF;

                -- Loop through each hour of the previous day (from 0 to 23)
                FOR v_hour_time IN 0..23 LOOP
                    -- Define the time range for the hour
                    v_start_hour := (v_day_date + INTERVAL '1 hour' * v_hour_time)::TIMESTAMP;
                    v_end_hour := (v_day_date + INTERVAL '1 hour' * (v_hour_time + 1))::TIMESTAMP;

                    -- Calculate the average sensor_value for that specific hour
                    SELECT AVG(sensor_value)::NUMERIC(8, 5)
                    INTO v_avg_value
                    FROM pneumiot.measurements
                    WHERE patient_id = v_patient_id
                      AND board_id = v_board_id
                      AND sensor_id = v_sensor_id
                      AND log_time_local >= v_start_hour
                      AND log_time_local < v_end_hour;

                    -- If v_avg_value is NULL, skip the insertion
                    IF v_avg_value IS NOT NULL THEN
                        -- Assign index_rate_id based on the average value and sensor_id
                        CASE v_sensor_id
                            WHEN 1 THEN  -- Temperature (sensor_id = 1)
                                IF v_avg_value < 18 OR v_avg_value > 27 THEN
                                    v_index_rate_id := 3;  -- Risky
                                ELSIF v_avg_value >= 20 AND v_avg_value <= 24 THEN
                                    v_index_rate_id := 1;  -- Very Good
                                ELSE
                                    v_index_rate_id := 2;  -- Normal
                                END IF;
                            WHEN 2 THEN  -- Humidity (sensor_id = 2)
                                IF v_avg_value < 30 OR v_avg_value > 70 THEN
                                    v_index_rate_id := 3;  -- Risky
                                ELSIF (v_avg_value >= 30 AND v_avg_value < 40) OR (v_avg_value >= 60 AND v_avg_value < 70) THEN
                                    v_index_rate_id := 2;  -- Normal
                                ELSE
                                    v_index_rate_id := 1;  -- Very Good
                                END IF;
                            WHEN 3 THEN  -- PM2.5 (sensor_id = 3)
                                IF v_avg_value > 25 THEN
                                    v_index_rate_id := 3;  -- Risky
                                ELSIF v_avg_value >= 0 AND v_avg_value <= 10 THEN
                                    v_index_rate_id := 1;  -- Very Good
                                ELSE
                                    v_index_rate_id := 2;  -- Normal
                                END IF;
                            WHEN 4 THEN  -- PPM (sensor_id = 4)
                                IF v_avg_value > 0.05 THEN
                                    v_index_rate_id := 3;  -- Risky
                                ELSIF v_avg_value >= 0 AND v_avg_value <= 0.02 THEN
                                    v_index_rate_id := 1;  -- Very Good
                                ELSE
                                    v_index_rate_id := 2;  -- Normal
                                END IF;
                            ELSE
                                v_index_rate_id := 2;  -- Default to Normal if no valid sensor_id
                        END CASE;

                        -- Insert the results into the hourly_average table for each hour
                        INSERT INTO pneumiot.hourly_average (
                            patient_id, 
                            board_id, 
                            sensor_id, 
                            average_measure, 
                            index_rate_id, 
                            hour_time, 
                            day_date
                        ) VALUES (
                            v_patient_id, 
                            v_board_id, 
                            v_sensor_id, 
                            v_avg_value, 
                            v_index_rate_id, 
                            v_hour_time, 
                            v_day_date
                        );
                    END IF;
                END LOOP;
            END LOOP;
        END LOOP;
    END LOOP;
END;
$$;