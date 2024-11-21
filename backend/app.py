from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

db_config = {
    'host': 'db',  # Docker Compose service name
    'user': 'user',
    'password': 'userpassword',
    'database': 'client_data'
}

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    hobby = data.get('hobby')
    email = data.get('email')

    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("INSERT INTO clients (hobby, email) VALUES (%s, %s)", (hobby, email))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"status": "success"}), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
