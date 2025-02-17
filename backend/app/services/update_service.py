# Fichero que actualiza repositorios de github que ya estan en la base de datos.
# Hace una petición a la API de GitHub (GET /repos/{owner}/{repo}) para obtener los datos actualizados.
# backend/app/services/update_service.py
import os
from dotenv import load_dotenv

import requests
from datetime import datetime
from app.db import get_connection



# Cargar el .env
load_dotenv()
# Define tu token aquí (mejor si lo sacas de una variable de entorno)
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")

def update_repository_data():
    """
    Recorre todos los repositorios en la base de datos y para cada uno consulta la API
    de GitHub para actualizar los datos (por ejemplo, descripción, estrellas, updated_at, visibilidad).
    """
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            # Obtener todos los repositorios
            cursor.execute("SELECT * FROM repositorio")
            repos = cursor.fetchall()
            for repo in repos:
                # Suponemos que repo['html_url'] tiene el formato:
                # "https://github.com/usuario/nombre_repositorio"
                parts = repo['html_url'].split('/')
                if len(parts) >= 5:
                    owner = parts[3]
                    repo_name = parts[4]
                    # Construir la URL de la API de GitHub para obtener los datos actualizados
                    url = f"https://api.github.com/repos/{owner}/{repo_name}"

                    # Agregar headers para autenticación
                    headers = {
                        "Authorization": f"token {GITHUB_TOKEN}",
                        "Accept": "application/vnd.github.v3+json"
                    }
                    
                    response = requests.get(url, headers=headers)
                    if response.status_code != 200:
                        print(f"Error al consultar {owner}/{repo_name}: {response.status_code}", flush=True)
                    try:
                        print("Detalles:", response.json(), flush=True)
                    except Exception as ex:
                        print("No se pudo parsear la respuesta JSON:", response.text, flush=True)
                    response = requests.get("https://api.github.com/repos/Sabrina-MM/Dictionary-web-with-React", headers=headers)
                    print(response.headers)
                    response = requests.get(url)
                    if response.status_code == 200:
                        data = response.json()
                        # Extraer los datos a actualizar
                        new_description = data.get('description')
                        new_stars = data.get('stargazers_count')
                        new_updated_at = data.get('updated_at')  # Ejemplo: "2021-12-17T17:00:36Z"
                        new_visibility = data.get('visibility', 'public')
                        
                        # Convertir new_updated_at a un formato que acepte MySQL
                        dt_obj = datetime.strptime(new_updated_at, '%Y-%m-%dT%H:%M:%SZ')
                        formatted_updated_at = dt_obj.strftime('%Y-%m-%d %H:%M:%S')
                        # Obtener la fecha y hora actual para el campo sync_date_from_github
                        sync_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                        
                        # Actualizar el registro en la base de datos
                        update_query = """
                            UPDATE repositorio 
                            SET description = %s, stargazers_count = %s, updated_at = %s, 
                                visibility = %s, sync_date_from_github = %s
                            WHERE repo_id = %s
                        """
                        cursor.execute(update_query, (
                            new_description,
                            new_stars,
                            formatted_updated_at,
                            new_visibility,
                            sync_date,
                            repo['repo_id']
                        ))
                        print(f"Actualizado repo_id {repo['repo_id']}: {owner}/{repo_name}", flush=True)
                    else:
                        print(f"Error al consultar {owner}/{repo_name}: {response.status_code}", flush=True)
        connection.commit()
    except Exception as e:
        print("Error en update_repository_data:", str(e), flush=True)
    finally:
        connection.close()
