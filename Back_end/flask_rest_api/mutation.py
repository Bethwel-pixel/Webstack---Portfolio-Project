from flask import jsonify, request
from UserManagment import db, Users
from CasseManagement import Cases
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from werkzeug.security import generate_password_hash
from clientManagement import IndividualClients, CorporateClients

def create_user():
    data = request.get_json()
    Username = data.get('username')
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    User_Email = data.get('email')
    Phone_number = data.get('phone')
    created_by = data.get('created_by')
    created_at = datetime.now()
    genderId = data.get('gender')
    password=generate_password_hash(data.get('password'))

    if Username == Users.Username:
        return jsonify({'error': f'{username} already exists'}), 500
    elif User_Email == Users.User_Email:
        return jsonify({'error':f'{User_Email} already Exists'}), 500
    elif Phone_number == Users.Phone_number:
        return jsonify({'error':f'{Phone_number} already Exists'}), 500 


    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = Users(Username=Username, First_name=First_name, Last_name=Last_name, User_Email=User_Email, Phone_number=Phone_number, created_by= created_by, created_at=created_at, genderId=genderId, password=password, Status=1)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': f'{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500  
    
def Create_Case():
    data = request.get_json()
    description = data.get('Description')
    case_category_Id = data.get('Category')
    case_subcategory_Id = data.get('Subcategory')
    clientType = data.get('clientType')
    created_by = data.get('created_by')
    created_at = datetime.now()
    IndividualclientId = data.get('clients_first_name')

        

    # Determine client ID based on client type
    # Assuming 'email' holds the ID value

    if not description:
        return jsonify({'error': 'Missing required parameters'}), 400

    query = text("""
        INSERT INTO cases (description, case_category_Id, clientType, IndividualclientId, created_by, created_at)
        VALUES (:description, :case_category_Id,  :clientType, :IndividualclientId,:created_by, :created_at)
    """)

    try:
        db.session.execute(query, {
            'description': description,
            'case_category_Id': case_category_Id,
            'clientType': clientType,
            'IndividualclientId': IndividualclientId,
            # 'corporateclientId': corporateclientId,
            'created_by': created_by,
            'created_at': created_at
        })
        db.session.commit()
        return jsonify({'message': f'{description} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
#  *** Client Management ***

def create_IndividualClient():
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone')
    created_by = data.get('created_by')
    created_at = datetime.now()
    genderId = data.get('gender')


    if not First_name or not Last_name or not email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = IndividualClients(First_name=First_name, Last_name=Last_name, email=email, phone_number=phone_number, created_by= created_by, created_at=created_at, genderId=genderId)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': f'{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500  


def create_CorporateClient():
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone')
    created_by = data.get('created_by')
    created_at = datetime.now()


    if not First_name or not Last_name or not email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = CorporateClients(First_name=First_name, Last_name=Last_name, email=email, phone_number=phone_number, created_by= created_by, created_at=created_at, genderId=genderId)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': f'{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500  