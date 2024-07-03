from UserManagment import request, jsonify, db, Users, SQLAlchemy
from flask import Flask
from mutation import create_user
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash

def SignUp():

    return create_user()
    # data = request.get_json()
    # username = data.get('username')
    # First_name = data.get('first_name')
    # Last_name = data.get('last_name')
    # User_Email = data.get('email')
    # Phone_number = data.get('phone')
    # created_at = datetime.now()
    # genderId = data.get('gender')
    # password = generate_password_hash(data.get('password'))

    # if username == Users.Username:
    #     return jsonify({'error': f'{username} already exists'}), 500
    # elif User_Email == Users.User_Email:
    #     return jsonify({'error':f'{User_Email} already Exists'}), 500
    # elif Phone_number == Users.Phone_number:
    #     return jsonify({'error':f'{Phone_number} already Exists'}), 500    

    
    # user = Users(Username=username, First_name=First_name, Last_name=Last_name, User_Email=User_Email, Phone_number=Phone_number, created_at=created_at, genderId=genderId,password=password, Status=1)

    # try:
    #     db.session.add(user)
    #     db.session.commit()
    #     return jsonify({'message': f'{First_name} created successfully'}), 201
    # except Exception as e:
    #     db.session.rollback()
    #     return jsonify({'error': str(e)}), 500