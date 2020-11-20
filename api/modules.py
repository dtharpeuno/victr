import requests
from flask import jsonify

class DataInterface:

    def __init__(self, dbCls, db):
        self.api_url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
        self.dbCls = dbCls
        self.db = db
        if not self.getData():
            self.writeData()
    
    def req(self):
        r = requests.get(self.api_url)
        if r.status_code == 200 and r.json()['items']:
            return r.json()['items']
        return []

    def writeData(self):
        insert_data = self.req()
        for data in insert_data:
            obj = self.dbCls(
                repo_id=data['id'],
                name=data['name'],
                url=data['html_url'],
                description=data['description'],
                num_stars=data['stargazers_count'],
                created_date=data['created_at'],
                last_push_date=data['pushed_at'],
            )
            self.db.session.add(obj)
            self.db.session.commit()

    def getData(self):
        return self.dbCls.query.all()

    def getApiData(self):
        project_list = []
        for proj in self.getData():
            obj = proj.__dict__
            del obj['_sa_instance_state']
            project_list.append(obj)
        return jsonify(project_list)
