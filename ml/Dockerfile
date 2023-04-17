FROM python:3.11-slim

# Make working directories
RUN mkdir -p  /ml
WORKDIR /ml

# Copy application requirements file to the created working directory
COPY requirements.txt .

# Install application dependencies from the requirements file
RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN pip install --upgrade tensorflow-hub
RUN pip install pillow

COPY . .

# Run the python application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]