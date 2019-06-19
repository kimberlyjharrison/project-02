from flask import Flask, render_template, jsonify
import pymongo
import json
from bson import json_util

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.job_search_db
collection = db.search_results

@app.route('/')
def index():
	jobs = list(collection.find())
	print(jobs)
	return render_template('index.html', jobs=jobs)

@app.route('/jsonified')
def json():
	data = []
	for x in collection.find():
		x.pop('_id')
		data.append(x)
	return jsonify(data)

if __name__ == '__main__':
	app.run(debug=True)