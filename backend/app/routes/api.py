# Archivo donde se definen las rutas API, for example, /api/hello
# backend/app/routes/api.py

from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/hello', methods=['GET'])

def hello():
    return jsonify({"message":"¡Hola desde el back-Flask!"})

