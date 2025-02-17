# Lógica para guardar repositorios

from app.db import get_connection
from datetime import datetime


def parse_datetime(dt_str):
    """
    Convierte una cadena de fecha en formato ISO8601 (con "Z") a un objeto datetime.
    Ejemplo: "2021-04-06T17:27:10Z" -> datetime(2021, 4, 6, 17, 27, 10)
    """
    return datetime.strptime(dt_str, '%Y-%m-%dT%H:%M:%SZ')
def save_repositories(repos_data):
    saved_count = 0
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            for repo in repos_data:
                # Depuración: mostrar el repo que se va a insertar
                print("Procesando repo_id: ", repo['id'], flush=True)
                # Verifica si ya existe el repositorio usando repo['id']
                query = "SELECT id FROM repositorio WHERE repo_id = %s"
                cursor.execute(query, (repo['id'],))
                result = cursor.fetchone()
                if result is None:
                    insert_query = """
                        INSERT INTO repositorio 
                        (repo_id, name, description, stargazers_count, created_at, html_url, updated_at, visibility)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """
                    # Convertir los valores de fecha a objetos datetime
                    created_at_parsed = parse_datetime(repo['created_at'])
                    updated_at_parsed = parse_datetime(repo['updated_at'])

                    cursor.execute(insert_query, (
                        repo['id'],
                        repo['name'],
                        repo.get('description'),
                        repo['stargazers_count'],
                        created_at_parsed,
                        repo['html_url'],
                        updated_at_parsed,
                        repo.get('visibility', 'public')  # Asume 'public' si no se especifica
                    ))
                    saved_count += 1
                    print("Guardado repo_id: ", repo['id'], flush=True)

        connection.commit()
    except Exception as e:
        print("Error al guardar repositorios: ", str(e), flush=True)
    finally:
        connection.close()
    return saved_count

def get_all_repositories():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM repositorio"
            cursor.execute(query)
            results = cursor.fetchall()
            print(results,flush=True)
    finally:
        connection.close()
    return results
