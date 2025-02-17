
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
