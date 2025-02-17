
# Inicializa la app Flask 
# backend/app/_init_.py

from flask import Flask
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

def create_app():
    app = Flask(__name__)
    CORS(app)  # Habilita CORS para todas las rutas

    # Registrar blueprints
    from app.routes.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Definimos una ruta para '/'
    @app.route('/')
    def index():
        return "Bienvenido a la aplicación Flask"
    
    # Configurar el scheduler para actualizar repositorios cada 2 semanas (14 días)
    from app.services.update_service import update_repository_data
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=update_repository_data, trigger="interval", days=14)
    scheduler.start()

    # Asegurarse de que el scheduler se cierre cuando la app se apaga
    atexit.register(lambda: scheduler.shutdown())


    return app

