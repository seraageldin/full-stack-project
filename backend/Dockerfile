# Use a Python base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Update package manager and ensure pip is installed
RUN apt-get update && apt-get install -y \
    python3-pip \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
