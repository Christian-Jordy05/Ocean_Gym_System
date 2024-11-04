# Imagen base de Python
FROM python:3.12.5

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de requerimientos
COPY requirements.txt ./

# Instala las dependencias sin almacenar en caché
RUN pip install -r requirements.txt --no-cache-dir

# Descarga el script 'wait-for-it.sh' y le da permisos de ejecución
RUN apt-get update && \
    apt-get install -y curl && \
    curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh && \
    rm -rf /var/lib/apt/lists/*

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 8000 para el servidor Django
EXPOSE 8000

# Comando por defecto para ejecutar el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
