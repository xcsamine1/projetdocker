from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
app.config["MONGO_URI"] = os.getenv(
    "MONGO_URI",
    "mongodb://zh:test@localhost:27017/mongotask"
)
mongo = PyMongo(app)

# GET all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = mongo.db.tasks.find()
    return jsonify([
        {"_id": str(t["_id"]), "title": t["title"]}
        for t in tasks
    ])

# CREATE task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    mongo.db.tasks.insert_one({"title": data["title"]})
    return jsonify({"message": "Task added"})

# UPDATE task
@app.route("/tasks/<id>", methods=["PUT"])
def update_task(id):
    data = request.json
    mongo.db.tasks.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"title": data["title"]}}
    )
    return jsonify({"message": "Task updated"})

# DELETE task
@app.route("/tasks/<id>", methods=["DELETE"])
def delete_task(id):
    mongo.db.tasks.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
