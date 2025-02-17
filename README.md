# GitHub Monitor

GitHub Monitor es una aplicación web diseñada para analizar la actividad de repositorios alojados en GitHub. Permite verificar la vigencia de los repositorios (activos o inactivos) mediante consultas a la API de GitHub, almacenar y actualizar la información en una base de datos MySQL y ofrecer una interfaz de usuario moderna desarrollada con React.

---

## Características

### Búsqueda y Filtrado
- Busca repositorios por nombre o usuario.
- Filtra repositorios activos (actualizados en los últimos 4 meses) e inactivos (actualizados hace más de 4 meses).
- Pestañas temáticas (por ejemplo, "kubernetes", "UpCloudLtd", "react", etc.) que permiten realizar búsquedas predefinidas.

### Resumen y Estadísticas
- Dashboard que muestra el total de repositorios activos e inactivos.
- Las tarjetas de resumen se colorean: verde clarito para activos y rojo clarito para inactivos.
- Los repositorios listados en el buscador también se colorean según su estado.

### Top Repositorios
- Sección que muestra los 10 repositorios más populares y actualizados de GitHub, presentados en una tabla con íconos representativos.

### Actualización Automática
- Tarea programada (usando APScheduler) que, cada dos semanas, consulta la API de GitHub para actualizar la información de los repositorios ya almacenados.  
- Se registra la fecha de sincronización en el campo `sync_date_from_github`.

### Interfaz Moderna
- Frontend desarrollado en React, con navegación gestionada por React Router.
- Uso de Axios para las peticiones HTTP y react-icons para íconos representativos.
- Diseño responsivo y limpio, con un banner personalizado entre el Header y el Dashboard.

---

## Tecnologías Utilizadas

### Backend
- **Python** y **Flask**
- **PyMySQL** para la conexión a MySQL
- **APScheduler** para programar tareas periódicas
- **Requests** para consumir la API de GitHub

### Frontend
- **React** (creado con Create React App)
- **Axios** para peticiones HTTP
- **React Router** para la navegación entre rutas
- **react-icons** para la inclusión de íconos
- **CSS** para el estilizado (archivo global `App.css` y estilos específicos para componentes)

### Base de Datos
- **MySQL**

---

## Estructura del Proyecto

```
mi-proyecto/
├── backend/
│   ├── app/
│   │   ├── __init__.py         # Inicialización de la aplicación Flask y configuración del scheduler
│   │   ├── db.py               # Conexión a la base de datos MySQL (usando PyMySQL)
│   │   ├── routes/
│   │   │   └── api.py          # Endpoints: /api/search_repositories, /api/repositories, etc.
│   │   └── services/
│   │       ├── repository_service.py   # Funciones para guardar y obtener repositorios en MySQL
│   │       └── update_service.py       # Función para actualizar datos desde GitHub
│   └── requirements.txt        # Dependencias Python (Flask, PyMySQL, APScheduler, requests, etc.)
└── frontend/
    ├── public/
    │   └── (archivos estáticos, incluyendo la imagen del banner)
    ├── src/
    │   ├── assets/             # Imagenes y otros recursos
    │   ├── components/         # Componentes React (Dashboard, RepoSearch, RepoList, TopRepositories, RepoTabs, Banner, Estadisticas, Sidebar, Header, etc.)
    │   ├── services/
    │   │   └── githubApi.js    # Servicio para consultar la API de GitHub (o el backend)
    │   ├── App.jsx             # Integración de rutas y layout principal
    │   └── App.css             # Estilos globales
    ├── package.json            # Dependencias y scripts del frontend (React, axios, react-router-dom, react-icons, etc.)
    └── .env                    # Variables de entorno para el frontend (p.ej. API URL)
```

---

## Instalación y Ejecución

### Backend

**Instalar dependencias:**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scriptsctivate      # Windows
pip install -r requirements.txt
```

**Configurar la Base de Datos:**

1. Crea una base de datos en MySQL.
2. Ejecuta las instrucciones SQL para crear la tabla `repositorio`:

```sql
CREATE TABLE IF NOT EXISTS repositorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    repo_id INT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stargazers_count INT,
    created_at DATETIME,
    html_url VARCHAR(255) NOT NULL,
    updated_at DATETIME,
    visibility VARCHAR(50),
    sync_date_from_github DATETIME
);
```

**Ejecutar la aplicación Flask:**

```bash
flask run
```

La API se ejecutará por defecto en `http://localhost:5000`.

### Frontend

**Instalar dependencias:**

```bash
cd ../frontend
npm install
```

**Configurar variables de entorno:**

Crea un archivo `.env` si es necesario y define la URL de tu API:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Ejecutar la aplicación React:**

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`.

---

## Notas

### Límites de la API de GitHub
Si realizas muchas peticiones, recuerda que la API de GitHub tiene límites de uso. Considera utilizar autenticación con token si es necesario.

### Personalización
Puedes adaptar el diseño, los criterios de filtrado y la estructura del proyecto según tus necesidades.
