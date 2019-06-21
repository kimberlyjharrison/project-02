from flask import Flask, render_template, jsonify
import pymongo
import json
from bson import json_util
from flask_pymongo import PyMongo
import scrape_jobs

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.job_search_db
collection = db.search_results


@app.route('/')
def index():
	jobs = list(collection.find())

	return render_template('index.html', jobs=jobs)

@app.route('/api')
def json():
	data = []
	for x in collection.find():
		x.pop('_id')
		data.append(x)
	return jsonify(data)

@app.route('/<job_input>')
def scraper(job_input):
	jobs_data = scrape_jobs.scrapeIndeed(job_input)

	for i in jobs_data:
		i.pop('_id')
	return jsonify(jobs_data)

if __name__ == '__main__':
	app.run(debug=True)