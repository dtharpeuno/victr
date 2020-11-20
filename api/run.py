import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_cors import CORS
import json
from modules import DataInterface

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("SQLALCHEMY_DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)
db.create_all()
migrate = Migrate(app, db)


#models
class PyProjects(db.Model):
    __tablename__ = 'pyprojects'
    id = db.Column(db.Integer, primary_key=True)
    repo_id = db.Column(db.String(80))
    name = db.Column(db.String(80))
    url = db.Column(db.String(500))
    description = db.Column(db.String(5000))
    num_stars = db.Column(db.Integer)
    created_date = db.Column(db.DateTime())
    last_push_date = db.Column(db.DateTime())

    def __repr__(self):
        return "<PyProject {}>".format(self.name)

data = DataInterface(PyProjects, db)

#routes
@app.route('/')
def base():
    return {'success': True}

@app.route("/api/projects/all", methods = ['GET'])
def api_all():
    api_data = data.getApiData()
    return api_data


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)