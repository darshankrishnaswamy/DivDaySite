import logging
import os
import time

import mysql.connector
from flask import Flask, request, session
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder="../build", static_url_path='/')
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

app.secret_key = "super secret key"
from flask_cors import CORS, cross_origin
CORS(app)

@app.route('/data', methods=['GET', 'POST'])
def data():
    if request.method == 'GET':
        mydb = mysql.connector.connect(host="localhost", user="USERNAME", password="PASSWORD", database="divday")
        mycursor = mydb.cursor()
        mycursor.execute("SELECT * FROM data")
        _data = []
        for x in mycursor:
            _data.append(x)
        return {'data': _data}
    else:
        print("JSON")
        d = request.json
        # print("Starting")
        # print("FORM: "+str(request.form))
        # print("DATA: ")
        # print("DATA2: "+str(request.json))
        mydb = mysql.connector.connect(host="localhost", user="USERNAME", password="PASSWORD", database="divday")
        mycursor = mydb.cursor()
        sql = "INSERT INTO data (phrase, paragraph, image) VALUES (%s, %s, %s)"
        val = (d["phrase"], d["paragraph"], d["image"])
        mycursor.execute(sql, val)

        mydb.commit()
        print(mycursor.rowcount, "record inserted.")
        return "SUCCESS"


@app.route('/image', methods=["POST"])
def image():
    print("IMAGE BEING UPLOADED")
    # target = os.path.join("Images", 'test_docs')
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    target = "../build/images"
    logger.info("welcome to upload")
    print("Welcome to upload")
    file = request.files['file']
    filename = secure_filename(file.filename)
    print("FILENAME IS "+str(filename))
    destination = "/".join([target, filename])
    file.save(destination)
    session['uploadFilePath'] = destination
    response = destination
    return response
