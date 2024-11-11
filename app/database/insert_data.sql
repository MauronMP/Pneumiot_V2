BEGIN;


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

-- Insertar un usuario por cada rol
DO $$
DECLARE
    worker_roles TEXT[] := ARRAY['admin', 'doctor', 'nurse', 'technician'];
    worker_counter INT := 1;
BEGIN
    FOR worker_counter IN 1..4 LOOP
        -- Insertar el usuario con el rol correspondiente
        INSERT INTO pneumiot.worker (worker_dni, worker_email, worker_name, worker_surname, worker_role_id)
        VALUES (
            LPAD((FLOOR(RANDOM() * 10000000))::TEXT, 7, '0') || 'A',  -- DNI aleatorio
            worker_roles[worker_counter] || '@pneumiot.com',  -- Correo según el rol
            worker_roles[worker_counter],  -- Nombre basado en el rol
            worker_roles[worker_counter] || 'Surname',  -- Apellido basado en el rol
            worker_counter  -- Asignación de rol (1 = admin, 2 = doctor, etc.)
        );
    END LOOP;
END $$;

-- Insertar credenciales de autenticación para cada usuario
INSERT INTO pneumiot.worker_auth (worker_id, passwd_auth)
SELECT worker_id, md5(worker_dni || 'password')::CHAR(128)
FROM pneumiot.worker;

-- Insert data from table index_rate
INSERT INTO pneumiot.index_rate (rate, rate_description) VALUES
    ('NORMAL', 'Valores dentro de los rangos normales'),
    ('ALERTA', 'Valores cercanos a los límites permitidos'),
    ('PELIGRO', 'Valores peligrosos, requieren acción inmediata');

INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(1, 'b76375d2-3b39-4714-b27c-0e7b26a3eac3', 'Temperature', 1, -99.0, 99.0);
INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(2, '2e687bfc-4714-4970-8d18-0e7b26a3eac3', 'Humidity', 2, 0.0, 99.9);
INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(3, '7cef5fc0-c621-4970-8d18-87f474e67020', 'PM2.5', 3, 0.0, 99.9);
INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(4, '7cef5fc0-17c2-4eb8-9d8b-11b08841f0e6', 'PPM', 4, 0.0, 99.999);

INSERT INTO pneumiot.units
(unit_id, unit_abbreviation, unit_description)
VALUES(1, 'C       ', 'Celsius');
INSERT INTO pneumiot.units
(unit_id, unit_abbreviation, unit_description)
VALUES(2, '%       ', 'Porcentaje');
INSERT INTO pneumiot.units
(unit_id, unit_abbreviation, unit_description)
VALUES(3, 'μg/m³   ', 'Air particles');
INSERT INTO pneumiot.units
(unit_id, unit_abbreviation, unit_description)
VALUES(4, 'ppm     ', 'Parts per million');

-- Procedure para generar datos de mediciones
CREATE OR REPLACE PROCEDURE pneumiot.generate_measurements()
LANGUAGE plpgsql
AS $$
DECLARE
    v_log_time TIMESTAMP := '2024-10-01 00:00:00';
    v_end_time TIMESTAMP := '2024-11-30 23:59:00';
    v_patient_id INT;
    v_board_id INT;
    v_sensor_id INT;
    v_sensor_value FLOAT;
BEGIN
    -- Loop para cada minuto entre el rango de fechas
    WHILE v_log_time <= v_end_time LOOP
        -- Loop para cada combinación de patient_id y board_id
        FOR v_patient_id IN 1..2 LOOP
            FOR v_board_id IN 1..2 LOOP
                -- Loop para cada sensor_id (1 a 4)
                FOR v_sensor_id IN 1..4 LOOP
                    -- Asignar el valor de sensor_value basado en el rango del sensor_id
                    CASE v_sensor_id
                        WHEN 1 THEN
                            -- Temperature: Rango [15.0, 27.0]
                            v_sensor_value := 15 + RANDOM() * (27 - 15);
                        WHEN 2 THEN
                            -- Humidity: Rango [30.0, 80.0]
                            v_sensor_value := 30 + RANDOM() * (80 - 30);
                        WHEN 3 THEN
                            -- PM2.5: Rango [0.0, 28.0]
                            v_sensor_value := RANDOM() * 28;
                        WHEN 4 THEN
                            -- PPM: Rango [0.0, 0.09]
                            v_sensor_value := RANDOM() * 0.09;
                        ELSE
                            v_sensor_value := 0.0;  -- Valor por defecto en caso de error (no debería ocurrir)
                    END CASE;

                    -- Insertar registro
                    INSERT INTO pneumiot.measurements (
                        patient_id, 
                        board_id, 
                        sensor_id, 
                        sensor_value, 
                        log_time_utc, 
                        log_time_local
                    ) VALUES (
                        v_patient_id,
                        v_board_id,
                        v_sensor_id,
                        v_sensor_value,
                        v_log_time AT TIME ZONE 'UTC',
                        v_log_time
                    );
                END LOOP;
            END LOOP;
        END LOOP;

        -- Incrementar el tiempo en 1 minuto
        v_log_time := v_log_time + INTERVAL '1 minute';
    END LOOP;
END;
$$;

-- Ejecutar el procedimiento para generar datos de mediciones
CALL pneumiot.generate_measurements();

COMMIT;