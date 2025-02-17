# Conexión a MySQL

import pymysql
from pymysql.cursors import DictCursor

def get_connection():
    connection = pymysql.connect(
        host='127.0.0.1',      # Cambiar según configuración
        user='root',     # Usuario de MySQL
        password='root',# Contraseña de MySQL
        db='github_monitor',  # Base de datos a utilizar
        charset='utf8mb4',
        cursorclass=DictCursor
    )
    return connection
