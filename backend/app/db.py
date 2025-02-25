# Conexión a MySQL

import pymysql
import os
from pymysql.cursors import DictCursor

def get_connection():
    connection = pymysql.connect(
        host=os.getenv("DB_HOST"),      # Cambiar según configuración
        user=os.getenv("DB_USER"),     # Usuario de MySQL
        password=os.getenv("DB_PASSWORD"),# Contraseña de MySQL
        db=os.getenv("DB_NAME"),  # Base de datos a utilizar
        port=int(os.getenv("DB_PORT")),  # Puerto MySQL
        charset='utf8mb4',
        cursorclass=DictCursor
    )
    return connection
