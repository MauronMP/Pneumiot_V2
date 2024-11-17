BEGIN;

-- Insertar un board con el board_id 1
INSERT INTO pneumiot.board (board_code)
VALUES ('Board_1');



-- Insert for PM2.5 Sensor (PSM5003)
INSERT INTO pneumiot.units (unit_abbreviation, unit_description) 
VALUES 
('PM2.5', 'PM2.5 Sensor (PSM5003): The concentration of fine particles, with levels categorized as Very Good (0 - 10 μg/m³), Normal (10 - 25 μg/m³), and Risky (> 25 μg/m³).');

-- Insert for Ozone Sensor (MQ-131)
INSERT INTO pneumiot.units (unit_abbreviation, unit_description) 
VALUES 
('O3', 'Ozone Sensor (MQ-131): Indoor ozone levels categorized as Very Good (0 - 0.02 ppm), Normal (0.02 - 0.05 ppm), and Risky (> 0.05 ppm).');

-- Insert for Temperature Sensor (DHT11)
INSERT INTO pneumiot.units (unit_abbreviation, unit_description) 
VALUES 
('Temp', 'Temperature Sensor (DHT11): Indoor temperature levels categorized as Very Good (20°C - 24°C), Normal (24°C - 27°C), and Risky (< 18°C or > 27°C).');

-- Insert for Humidity Sensor (DHT11)
INSERT INTO pneumiot.units (unit_abbreviation, unit_description) 
VALUES 
('Hum', 'Humidity Sensor (DHT11): Indoor relative humidity categorized as Very Good (40% - 60%), Normal (30% - 40% or 60% - 70%), and Risky (< 30% or > 70%).');


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
VALUES(1, 'b76375d2-3b39-4714-b27c-0e7b26a3eac3', 'Temperature', 3, -99.0, 99.0);
INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(2, '2e687bfc-4714-4970-8d18-0e7b26a3eac3', 'Humidity', 4, 0.0, 99.9);
INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(3, '7cef5fc0-c621-4970-8d18-87f474e67020', 'PM2.5', 1, 0.0, 99.9);
INSERT INTO pneumiot.sensor
(sensor_id, sensor_code, sensor_type, unit_id, min_value, max_value)
VALUES(4, '7cef5fc0-17c2-4eb8-9d8b-11b08841f0e6', 'PPM', 2, 0.0, 99.999);


-- Asociar los sensores con board_id 1 en la tabla board_sensor
INSERT INTO pneumiot.board_sensor (board_id, sensor_id)
VALUES 
(1, 1), -- Sensor 1 asociado al board 1
(1, 2), -- Sensor 2 asociado al board 1
(1, 3), -- Sensor 3 asociado al board 1
(1, 4); -- Sensor 4 asociado al board 1


-- Insertar un paciente con board_id 1
INSERT INTO pneumiot.patient (patient_dni, board_id, admission_date)
VALUES 
('1234567890', 1, CURRENT_TIMESTAMP); -- Aquí se coloca un DNI ficticio y la fecha actual de ingreso

-- Insertar información adicional del paciente con patient_id 1
INSERT INTO pneumiot.patient_aditional_info (
    patient_id, 
    patient_name, 
    patient_surname, 
    date_birth, 
    genre, 
    telephone_number, 
    direction, 
    alergies, 
    medical_condition, 
    blood_type, 
    emergency_contact, 
    emergency_phone_number, 
    admission_date
)
VALUES 
(
    1,  -- Asignar el patient_id 1 al paciente que ya existe
    'John',  -- Nombre ficticio del paciente
    'Doe',  -- Apellido ficticio del paciente
    '1990-05-15',  -- Fecha de nacimiento ficticia (YYYY-MM-DD)
    'M',  -- Género masculino
    '555-1234567',  -- Número de teléfono ficticio
    '1234 Elm Street, Springfield, USA',  -- Dirección ficticia
    'None',  -- Alergias ficticias (ninguna)
    'Hypertension',  -- Condición médica ficticia
    'O+',  -- Tipo de sangre ficticio
    'Jane Doe',  -- Contacto de emergencia ficticio
    '555-7654321',  -- Teléfono de contacto de emergencia ficticio
    CURRENT_TIMESTAMP  -- Fecha de ingreso (actual)
);


COMMIT;