# app/models.py

class Repository:
    def __init__(self, repo_id, name, full_name, description, html_url, stargazers_count):
        self.id = None  # ID interno generado automáticamente
        self.repo_id = repo_id  # ID único del repositorio en GitHub
        self.name = name
        self.full_name = full_name
        self.description = description
        self.html_url = html_url
        self.stargazers_count = stargazers_count

    def to_dict(self):
        return {
            "id": self.id,
            "repo_id": self.repo_id,
            "name": self.name,
            "full_name": self.full_name,
            "description": self.description,
            "html_url": self.html_url,
            "stargazers_count": self.stargazers_count
        }
