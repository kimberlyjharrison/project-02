from flask import Flask, render_template, jsonify, redirect
import pymongo
import json
from bson import json_util
from flask_pymongo import PyMongo
import os
import requests
import bs4
from bs4 import BeautifulSoup as bs
import pandas as pd
import time
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist
from selenium import webdriver
from pymongo import MongoClient

conn = os.environ.get('MONGODB_URI')
if not conn:
   	conn = "mongodb://localhost:27017/job_search_db"

app = Flask(__name__)

app.config["MONGO_URI"] = conn
mongo = PyMongo(app)

@app.route('/')
def index():
	jobs = mongo.db.search_results.find()
	return render_template('index.html', jobs=jobs)

@app.route('/api')
def json_api():
	data = []
	for x in mongo.db.search_results.find():
		x.pop('_id')
		data.append(x)
	return jsonify(data)

@app.route('/filter/<queryString>')
def filter(queryString):
	data = []
	query = {'Search_Term': queryString}
	for x in mongo.db.search_results.find(query):
		x.pop('_id')
		data.append(x)
	return jsonify(data)

@app.route('/jobs')
def list_of_jobs():
	jlist = [
	{'title': 'accountant', 'label': 'Accountant'},
	{'title': 'cartographer','label': 'Cartographer'},
	{'title': 'chef','label': 'Chef'},
	{'title': 'data scientist','label': 'Data Scientist'},
	{'title': 'dentist','label': 'Dentist'},
	{'title': 'financial analyst','label': 'Financial Analyst'},
	{'title': 'it support','label': 'IT Support'},
	{'title': 'mechanical engineer','label': 'Mechanical Engineer'},
	{'title': 'midwife','label': 'Midwife'},
	{'title': 'nurse','label': 'Nurse'},
	{'title': 'obgyn','label': 'OBGYN'},
	{'title': 'occupational therapist','label': 'Occupational Therapist'},
	{'title': 'pediatrician','label': 'Pediatrician'},
	{'title': 'physical therapist','label': 'Physical Therapist'},
	{'title': 'physician','label': 'Physician'},
	{'title': 'physician assistant','label': 'Physician Assistant'},
	{'title': 'sales manager','label': 'Sales Manager'},
	{'title': 'software developer','label': 'Software Developer'},
	{'title': 'statistician','label': 'Statistician'},
	{'title': 'surgeon','label': 'Surgeon'}]
	return jsonify(jlist)
	

if __name__ == '__main__':
	app.run(debug=True)