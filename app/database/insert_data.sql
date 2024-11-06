BEGIN;

-- Insert data from table units
INSERT INTO pneumiot.units (unit_abbreviation, unit_description) VALUES
    ('C', 'Celsius'),
    ('%', 'Porcentaje'),
    ('PPM', 'Partes por millón'),
    ('LPM', 'Litros por minuto'),
    ('mg/dL', 'Miligramo por decilitro');

-- Insert data from table permissions
INSERT INTO pneumiot.permissions (permission_name, permission_description) VALUES
    ('READ_SENSOR_DATA', 'Permiso para leer datos de sensores'),
    ('WRITE_SENSOR_DATA', 'Permiso para escribir datos de sensores'),
    ('MANAGE_USERS', 'Permiso para gestionar usuarios'),
    ('VIEW_PATIENT_INFO', 'Permiso para ver información de pacientes'),
    ('MODIFY_PATIENT_INFO', 'Permiso para modificar información de pacientes');

-- Insert data from table worker_role
INSERT INTO pneumiot.worker_role (worker_role_name, worker_role_description) VALUES
    ('admin', 'Administrador del sistema'),
    ('doctor', 'Doctor con acceso a información de pacientes'),
    ('nurse', 'Enfermero con acceso limitado'),
    ('technician', 'Técnico responsable de los dispositivos');

-- Insert data from table worker
DO $$
DECLARE
    nombres TEXT[] := ARRAY['Carlos', 'Ana', 'Luis', 'Maria', 'Juan', 'Laura', 'Pedro', 'Carmen', 'Jose', 'Marta'];
    apellidos TEXT[] := ARRAY['Gomez', 'Perez', 'Lopez', 'Martinez', 'Sanchez', 'Rodriguez', 'Fernandez', 'Garcia', 'Martinez', 'Hernandez'];
    letras TEXT[] := ARRAY['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    worker_counter INT := 1;
    random_number TEXT;
    random_letter TEXT;
BEGIN
    FOR worker_counter IN 1..10 LOOP
        random_number := LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0');
        random_letter := letras[(FLOOR(RANDOM() * array_length(letras, 1))) + 1];
        
        IF random_letter IS NULL THEN
            random_letter := 'A';
        END IF;
        
        -- Insertar los datos en la tabla worker
        INSERT INTO pneumiot.worker (worker_dni, worker_email, worker_name, worker_surname, worker_role_id)
        VALUES (
            random_number || random_letter,
            nombres[worker_counter] || '@hospital.com',
            nombres[worker_counter],
            apellidos[worker_counter],
            (worker_counter % 4) + 1
        );
    END LOOP;
END $$;

-- Insert data from table worker_auth
INSERT INTO pneumiot.worker_auth (worker_id, passwd_auth)
SELECT worker_id, md5(worker_dni || 'password')::CHAR(128)
FROM pneumiot.worker;

-- Insert data from table board con códigos UUID
DO $$
DECLARE
    board_counter INT := 1;
BEGIN
    FOR board_counter IN 1..5 LOOP
        INSERT INTO pneumiot.board (board_code) VALUES (gen_random_uuid()::text);
    END LOOP;
END $$;


-- Insert data from table sensor
DO $$
DECLARE
    sensor_counter INT := 1;
    unit_count INT := (SELECT COUNT(*) FROM pneumiot.units);
BEGIN
    FOR sensor_counter IN 1..10 LOOP
        INSERT INTO pneumiot.sensor (sensor_code, sensor_type, unit_id, min_value, max_value)
        VALUES (
            gen_random_uuid()::text,
            CASE
                WHEN sensor_counter % 3 = 0 THEN 'Temperatura'
                WHEN sensor_counter % 3 = 1 THEN 'Humedad'
                ELSE 'CO2'
            END,
            (sensor_counter % unit_count) + 1,
            -99.99, 99.99
        );
    END LOOP;
END $$;

-- Insert data from table board_sensor
INSERT INTO pneumiot.board_sensor (board_id, sensor_id)
SELECT b.board_id, s.sensor_id
FROM pneumiot.board b, pneumiot.sensor s
WHERE b.board_id <= 5 AND s.sensor_id <= 10
ORDER BY random()
LIMIT 40;
-- Insert data from table patient con nombres reales
DO $$
DECLARE
    nombres TEXT[] := ARRAY['Jose', 'Manuel', 'Luis', 'Javier', 'Miguel', 'Antonio', 'Raul', 'David', 'Carlos', 'Pablo'];
    apellidos TEXT[] := ARRAY['Martinez', 'Lopez', 'Gonzalez', 'Rodriguez', 'Fernandez', 'Perez', 'Sanchez', 'Ramirez', 'Torres', 'Dominguez'];
    letras TEXT[] := ARRAY['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    patient_counter INT := 1;
    random_number TEXT;
    random_letter TEXT;
    board_id_count INT := (SELECT COUNT(*) FROM pneumiot.board);
BEGIN
    FOR patient_counter IN 1..10 LOOP
        random_number := LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0');
        random_letter := letras[(FLOOR(RANDOM() * array_length(letras, 1))) + 1];
        
        IF random_letter IS NULL THEN
            random_letter := 'A';
        END IF;
        
        INSERT INTO pneumiot.patient (patient_dni, board_id, discharge_date)
        VALUES (
            random_number || random_letter,
            (FLOOR(RANDOM() * board_id_count) + 1),
            CURRENT_TIMESTAMP + (patient_counter || ' days')::interval
        );
    END LOOP;
END $$;

-- Insert data from table measurements
DO $$
DECLARE
    measurement_counter INT := 1;
    patient_id INT;
    board_id INT;
    sensor_id INT;
BEGIN
    FOR measurement_counter IN 1..500 LOOP
        patient_id := (measurement_counter % 10) + 1;
        board_id := (measurement_counter % 5) + 1;
        sensor_id := (measurement_counter % 10) + 1;
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id, sensor_value)
        VALUES (
            patient_id,
            board_id,
            sensor_id,
            round((random() * 99.99)::numeric, 2)
        );
    END LOOP;
END $$;

-- Insert data from table sensor_log
DO $$
DECLARE
    log_counter INT := 1;
BEGIN
    FOR log_counter IN 1..200 LOOP
        INSERT INTO pneumiot.sensor_log (board_id, sensor_id, log_message)
        VALUES (
            (FLOOR(RANDOM() * 5) + 1),
            (FLOOR(RANDOM() * 10) + 1),
            'Log de ejemplo ' || log_counter
        );
    END LOOP;
END $$;

-- Insert data from table role_permissions
INSERT INTO pneumiot.role_permissions (worker_role_id, permission_id)
SELECT worker_role_id, permission_id
FROM pneumiot.worker_role, pneumiot.permissions
WHERE worker_role_id <= 4 AND permission_id <= 5;

-- Insert data from table doctor
DO $$
DECLARE
    doctor_counter INT := 1;
BEGIN
    FOR doctor_counter IN 1..10 LOOP
        INSERT INTO pneumiot.doctor (patient_id, worker_id)
        VALUES (
            doctor_counter,
            doctor_counter
        );
    END LOOP;
END $$;

-- Insert data from table index_rate
INSERT INTO pneumiot.index_rate (rate, rate_description) VALUES
    ('NORMAL', 'Valores dentro de los rangos normales'),
    ('ALERTA', 'Valores cercanos a los límites permitidos'),
    ('PELIGRO', 'Valores peligrosos, requieren acción inmediata');

-- Insert data from table monthly_average
DO $$
DECLARE
    start_date DATE := '2024-01-01';
    end_date DATE := '2024-12-31';
    patient_id INT;
    board_id INT;
    sensor_id INT;
    avg_measure NUMERIC;
    index_rate_id INT;
    month_number INT;
    year_date INT;
BEGIN
    FOR year_date IN 2023..2024 LOOP
        FOR month_number IN 1..12 LOOP
            FOR patient_id IN 1..10 LOOP
                FOR board_id IN 1..5 LOOP
                    FOR sensor_id IN 1..10 LOOP
                        avg_measure := round((random() * 99.99)::numeric, 2);
                        index_rate_id := (random() * 2)::INT + 1;
                        
                        INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date)
                        VALUES (
                            patient_id,
                            board_id,
                            sensor_id,
                            avg_measure,
                            index_rate_id,
                            month_number,
                            year_date
                        );
                    END LOOP;
                END LOOP;
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

-- Insert data from table daily_average
DO $$
DECLARE
    start_date DATE := '2024-01-01';
    end_date DATE := '2024-12-31';
    day_date DATE;
    patient_id INT;
    board_id INT;
    sensor_id INT;
    avg_measure NUMERIC;
    index_rate_id INT;
BEGIN
    day_date := start_date;
    
    WHILE day_date <= end_date LOOP
        FOR patient_id IN 1..10 LOOP
            FOR board_id IN 1..5 LOOP
                FOR sensor_id IN 1..10 LOOP
                    avg_measure := round((random() * 99.99)::numeric, 2);
                    index_rate_id := (random() * 2)::INT + 1;
                    
                    INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id, year)
                    VALUES (
                        patient_id,
                        board_id,
                        sensor_id,
                        avg_measure,
                        index_rate_id,
                        EXTRACT(DAY FROM day_date)::INT,
                        EXTRACT(MONTH FROM day_date)::INT,
                        2024  -- Añadimos el año 2024 aquí
                    );
                END LOOP;
            END LOOP;
        END LOOP;
        day_date := day_date + INTERVAL '1 day';
    END LOOP;
END $$;

-- Insert data from table hourly_average
DO $$
DECLARE
    start_date DATE := '2024-01-01';
    end_date DATE := '2024-12-31';
    day_date DATE;
    hour_time INT;
    patient_id INT;
    board_id INT;
    sensor_id INT;
    avg_measure NUMERIC;
    index_rate_id INT;
BEGIN
    day_date := start_date;
    
    WHILE day_date <= end_date LOOP
        FOR hour_time IN 0..23 LOOP
            FOR patient_id IN 1..10 LOOP
                FOR board_id IN 1..5 LOOP
                    FOR sensor_id IN 1..10 LOOP
                        avg_measure := round((random() * 99.99)::numeric, 2);
                        index_rate_id := (random() * 2)::INT + 1;
                        
                        INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date)
                        VALUES (
                            patient_id,
                            board_id,
                            sensor_id,
                            avg_measure,
                            index_rate_id,
                            hour_time,
                            day_date
                        );
                    END LOOP;
                END LOOP;
            END LOOP;
        END LOOP;
        day_date := day_date + INTERVAL '1 day';
    END LOOP;
END $$;

-- Insert data from table error_log
INSERT INTO pneumiot.error_log (log_message)
SELECT 'Sample error ' || g
FROM generate_series(1, 50) AS g;

-- Insert data from table worker_log
DO $$
DECLARE
    log_counter INT := 1;
    worker_id INT;
BEGIN
    FOR log_counter IN 1..100 LOOP 
        worker_id := (FLOOR(RANDOM() * 10) + 1); 
        INSERT INTO pneumiot.worker_log (worker_id, log_message)
        VALUES (
            worker_id,
            'Activity log for worker ' || worker_id || ' - Message ' || log_counter
        );
    END LOOP;
END $$;

COMMIT;