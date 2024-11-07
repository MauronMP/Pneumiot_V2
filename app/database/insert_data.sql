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

INSERT INTO pneumiot.worker_auth (worker_id, passwd_auth)
SELECT worker_id, md5(worker_dni || 'password')::CHAR(128)
FROM pneumiot.worker;

-- Insert data from table index_rate
INSERT INTO pneumiot.index_rate (rate, rate_description) VALUES
    ('NORMAL', 'Valores dentro de los rangos normales'),
    ('ALERTA', 'Valores cercanos a los límites permitidos'),
    ('PELIGRO', 'Valores peligrosos, requieren acción inmediata');

COMMIT;