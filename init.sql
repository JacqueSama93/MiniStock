CREATE TABLE IF NOT EXISTS productos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	categoria VARCHAR(50),
	stock INT DEFAULT 0,
	precio DECIMAL(10, 2),
	creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, categoria, stock, precio) 
VALUES ('Producto Inicial', 'Electrónica', 10, 150.00);