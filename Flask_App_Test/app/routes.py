from app import app
from flask import Flask, render_template

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/leaflet')
def leaflet_map():

    return render_template("index.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
