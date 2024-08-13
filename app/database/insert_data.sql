
/*
 *
 * This file contains initial data in order to demonstrate the project.
 * The data used are not real and are not used from patients/doctors.
 * The randomly generated values are to show how the application works.
 * But in reality the real data is what is inserted through the communication with the patient's board.
 *
*/


INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'PM25-2023',
    'Pm25',
    'µg/m³',    
    0,
    99
);

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'OZON-2023',
    'Ozone',
    'µg/m³',
    0,
    99
);

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'HUMI-2023',
    'Humidity',
    '%',
    0,
    99
);

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'TEMP-2023',
    'Temperature',
    'ºC',
    0,
    99
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'TEMP-2023'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '987-zxc-654-ytr',
    'TEMP-2023'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'HUMI-2023'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'OZON-2023'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'PM25-2023'
);


INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    'wdr-523-cxa-098',
    'HUMI-2023'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    'wdr-523-cxa-098',
    'OZON-2023'
);

INSERT INTO pneumiot.patient (patient_id, board_id, discharge_date, admission_date)
VALUES (
    '76438300D',
    '123-abc-456-def',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient (patient_id, board_id, discharge_date, admission_date)
VALUES (
    '95462380X',
    'wdr-523-cxa-098',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);


INSERT INTO pneumiot.patient (patient_id, board_id, discharge_date, admission_date)
VALUES (
    '76438300D',
    '987-zxc-654-ytr',
    CURRENT_TIMESTAMP - INTERVAL '9 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '95846502Y',
    '987-zxc-654-ytr',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '95846502Y',
    '123-abc-456-def',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '96587412H',
    '123-abc-456-def',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);


INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '96587412H',
    '987-zxc-654-ytr',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('95462380X','wdr-523-cxa-098', 'HUMI-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;

DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('95462380X','wdr-523-cxa-098', 'OZON-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','987-zxc-654-ytr', 'PM25-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','987-zxc-654-ytr', 'TEMP-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;

DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','987-zxc-654-ytr', 'PM25-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','123-abc-456-def', 'TEMP-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('96587412H','123-abc-456-def', 'PM25-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


Insert into pneumiot.worker (worker_id, worker_email, worker_name, worker_surname, worker_role)
VALUES ('24183920C', 'ramonMartin@vdln.es', 'Ramón', 'Martín', 'doctor'),
 ('76438302P', 'pabloMP@vdln.es', 'pablo', 'morenilla', 'admin'),
 ('95741208Y', 'camilaRodrigez@vdln.es', 'Camila', 'Rodrigez', 'doctor');

Insert into pneumiot.doctor(patient_id, worker_id)
Values ('76438300D', '24183920C');


Insert into pneumiot.doctor(patient_id, worker_id)
Values ('95462380X', '95741208Y');


INSERT INTO pneumiot.worker_auth (worker_id, passwd_auth)
VALUES ('24183920C', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),
    ('76438302P', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'),
    ('95741208Y', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');



DO $$ 
DECLARE 
    patient_id_val CHARACTER VARYING := '95462380X';
    board_id_val CHARACTER VARYING := 'wdr-523-cxa-098';
    sensor_ids CHARACTER VARYING[] := ARRAY['HUMI-2023', 'OZON-2023'];
    today_date DATE := '2023-07-01';
    start_hour INT := 0;
    end_hour INT := 23;
    start_day INT := 1;
    end_day INT := 31; 
    end_dayFebruary INT := 28; 
    start_month INT := 1; 
    end_month INT := 12; 
    i INT := 1;
BEGIN
    WHILE i <= array_length(sensor_ids, 1) LOOP
        -- Loop to insert data in the hourly_average table
       FOR current_day IN start_day..end_day LOOP
            FOR current_hour IN start_hour..end_hour LOOP
                -- Random value for average_measure between 20 and 45
                RAISE NOTICE 'Inserting data for day %, hour %, sensor_id %', current_day, current_hour, sensor_ids[i];
                INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, hour_time, day_date)
                VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), current_hour, today_date + INTERVAL '1 day' * (current_day - 1));
            END LOOP;
        END LOOP;

        -- Loop for inserting data into the daily_average table
        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 1);
        END LOOP;

        FOR daily_day_val IN start_day..end_dayFebruary
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 2);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 3);
        END LOOP;
        
        -- Loop to insert data into the monthly_average table
        FOR monthly_day_val IN start_month..end_month
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', monthly_day_val, sensor_ids[i];
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, month_number, year_date)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), monthly_day_val, 2023);
        END LOOP;
        
        i := i + 1; -- Increment the index to move to the next value of sensor_id
    END LOOP;
END $$;


DO $$ 
DECLARE 
    patient_id_val CHARACTER VARYING := '76438300D';
    board_id_val CHARACTER VARYING := '123-abc-456-def';
    sensor_ids CHARACTER VARYING[] := ARRAY['TEMP-2023', 'HUMI-2023', 'OZON-2023', 'PM25-2023'];
    today_date DATE := '2023-07-01';
    start_hour INT := 0;
    end_hour INT := 23;
    start_day INT := 1;
    end_day INT := 31; 
    start_month INT := 1; 
    end_month INT := 12; 
    i INT := 1;
BEGIN
    WHILE i <= array_length(sensor_ids, 1) LOOP
        -- Loop to insert data in the hourly_average table
       FOR current_day IN start_day..end_day LOOP
            FOR current_hour IN start_hour..end_hour LOOP
                -- Random value for average_measure between 20 and 45
                RAISE NOTICE 'Inserting data for day %, hour %, sensor_id %', current_day, current_hour, sensor_ids[i];
                INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, hour_time, day_date)
                VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), current_hour, today_date + INTERVAL '1 day' * (current_day - 1));
            END LOOP;
        END LOOP;

        -- Loop for inserting data into the daily_average table
        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 7);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 6);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 8);
        END LOOP;
        
        -- Loop to insert data into the monthly_average table
        FOR monthly_day_val IN start_month..end_month
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', monthly_day_val, sensor_ids[i];
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, month_number, year_date)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), monthly_day_val, 2023);
        END LOOP;
        
        i := i + 1; -- Increment the index to move to the next value of sensor_id
    END LOOP;
END $$;



DO $$ 
DECLARE 
    patient_id_val CHARACTER VARYING := '76438300D';
    board_id_val CHARACTER VARYING := '987-zxc-654-ytr';
    sensor_ids CHARACTER VARYING[] := ARRAY['TEMP-2023', 'PM25-2023'];
    today_date DATE := '2023-07-01';
    start_hour INT := 0;
    end_hour INT := 23;
    start_day INT := 1;
    end_day INT := 31; 
    start_month INT := 1; 
    end_month INT := 12; 
    i INT := 1;
BEGIN
    WHILE i <= array_length(sensor_ids, 1) LOOP
        -- Loop to insert data in the hourly_average table
       FOR current_day IN start_day..end_day LOOP
            FOR current_hour IN start_hour..end_hour LOOP
                -- Random value for average_measure between 20 and 45
                RAISE NOTICE 'Inserting data for day %, hour %, sensor_id %', current_day, current_hour, sensor_ids[i];
                INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, hour_time, day_date)
                VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), current_hour, today_date + INTERVAL '1 day' * (current_day - 1));
            END LOOP;
        END LOOP;

        -- Loop for inserting data into the daily_average table
        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 6);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 4);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 1);
        END LOOP;
        
        -- Loop to insert data into the monthly_average table
        FOR monthly_day_val IN start_month..end_month
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', monthly_day_val, sensor_ids[i];
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, month_number, year_date)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), monthly_day_val, 2023);
        END LOOP;
        
        i := i + 1; -- Increment the index to move to the next value of sensor_id
    END LOOP;
END $$;
