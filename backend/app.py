from flask import Flask, render_template, request, redirect, flash, jsonify
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired
from bson import ObjectId
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure secret key

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['todo_db']

class TodoForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    completed = SelectField('Completed', choices=[("False", "False"), ("True", "True")], validators=[DataRequired()])
    submit = SubmitField("Add todo")

@app.route("/get_todo")
def get_todos():
    todos = []
    for todo in db.todos_flask.find().sort("date_created", -1):
        todo["_id"] = str(todo["_id"])
        todo["date_created"] = todo["date_created"].strftime("%b %d %Y %H:%M:%S")
        todos.append(todo)

    return jsonify(todos)

@app.route("/add_todo", methods=['POST'])
def add_todo():
    data = request.get_json()
    todo_name = data.get("name")
    todo_description = data.get("description")
    completed = data.get("completed")

    db.todos_flask.insert_one({
        "name": todo_name,
        "description": todo_description,
        "completed": completed,
        "date_created": datetime.utcnow()
    })
    return jsonify({"message": "Todo successfully added"})

@app.route("/delete_todo/<id>", methods=['DELETE'])
def delete_todo(id):
    db.todos_flask.find_one_and_delete({"_id": ObjectId(id)})
    return jsonify({"message": "Todo successfully deleted"})

@app.route("/update_todo/<id>", methods=['PUT'])
def update_todo(id):
    data = request.get_json()
    todo_name = data.get("name")
    todo_description = data.get("description")
    completed = data.get("completed")

    db.todos_flask.find_one_and_update({"_id": ObjectId(id)}, {"$set": {
        "name": todo_name,
        "description": todo_description,
        "completed": completed,
        "date_created": datetime.utcnow()
    }})
    return jsonify({"message": "Todo successfully updated"})

@app.route("/get_todo/<id>")
def get_todo_by_id(id):
    todo = db.todos_flask.find_one({"_id": ObjectId(id)})
    if todo:
        todo["_id"] = str(todo["_id"])
        todo["date_created"] = todo["date_created"].strftime("%b %d %Y %H:%M:%S")
        return jsonify(todo)
    else:
        return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)


