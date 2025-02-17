# Endpoints de la API
# backend/app/routes/api.py

from flask import Blueprint, request, jsonify
import requests
from app.services.repository_service import save_repositories, get_all_repositories

api_bp = Blueprint('api', __name__)

@api_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Bienvenido a la API"})


@api_bp.route('/search_repositories', methods=['GET'])
def search_repositories():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Se requiere el parámetro "query"'}), 400

    # Consulta la API de GitHub
    github_response = requests.get(f'https://api.github.com/search/repositories?q={query}')
    if github_response.status_code != 200:
        return jsonify({'error': 'Error al consultar la API de GitHub'}), 500

    data = github_response.json()
    repos = data.get('items', [])
    print('repos: '+ str(repos),flush=True)
    
    # Guarda los repositorios en la base de datos, evitando duplicados
    saved_count = save_repositories(repos)
    print('repos_count: '+ str(saved_count), flush=True)
    
    return jsonify({
        'message': 'Búsqueda completada y repositorios guardados',
        'saved_count': saved_count,
        'total_found': len(repos),
        'items': repos
    }), 200
@api_bp.route('/repositories', methods=['GET'])
def list_repositories():
    return jsonify(get_all_repositories()), 200
