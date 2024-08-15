from UserManagment import request, jsonify, db, Users, SQLAlchemy
from werkzeug.security import check_password_hash

def SignIn():
    data = request.get_json()
    Username = data.get('Username')
    Password = data.get('password')

    if not Username or not Password:
        return jsonify({"message": "Missing Username or password"}), 401

    user = Users.query.filter_by(Username=Username).first()

    if not user:
        return jsonify({"message": "Invalid Credentials"}), 401

    if user.Status != 1:
        return jsonify({"message": "You are Inactive, Kindly contact Admin"}), 401

    if not check_password_hash(user.password, Password):
        return jsonify({"message": "Invalid Credentials"}), 401

    return jsonify({"message": "Login successful"}), 200