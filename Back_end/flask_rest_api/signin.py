from UserManagment import request, jsonify, db, Users, SQLAlchemy
def SignIn():       
    data = request.get_json()
    Username = data.get('Username')
    password = data.get('password')

    if not Username or not password:
        return jsonify({"message": "Missing Username or password"}), 401

    user = Users.query.filter_by(Username=Username).first()

    if user.Status != 1:
        return jsonify({"message":"You are Inactive, Kindly contact Admin"}), 401


    if user.Username != Username and user.password != password:
        if user.Username != Username:
            return jsonify({"message": "Invalid Username"}), 401
        else:
            return jsonify({"message": "Invalid Password"}), 401
    
    if password != user.password:
        return jsonify({"message": "Invalid Password"}), 401

    # if not user.password: #check_password_hash(user.password, password):
    #     return jsonify({"message": "Invalid password"}), 401
    print(f'{user.password}:pass={user.Username} fn:{user.First_name}')

    return jsonify({"message": "Login successful"}), 200