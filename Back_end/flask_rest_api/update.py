from UserManagment import db, jsonify, request
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

def update_user(user_id):
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    Username = data.get('Username')
    User_Email = data.get('email')
    Phone_number = data.get('phone')
    genderId = data.get('gender')
    updated_by = data.get('updated_by')
    updated_at = datetime.now()


    #  ***  Handling Username
    Kainat = text('select Username from users;')
    userName = db.session.execute(Kainat)

    if Username == userName:
        return jsonify({'error':f'{Username} already exists'}), 500
    # Check if all required parameters are present
    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    genderId = data.get('gender')
    upuser = text("UPDATE users SET First_name=:first_name, Last_name=:last_name, Phone_number=:phone_number, User_Email=:User_Email, updated_by=:updated_by,  updated_at=:updated_at, Username=:Username, genderId=:genderId WHERE User_Id=:user_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(upuser, {'first_name': First_name, 'last_name': Last_name, 'phone_number': Phone_number, 'User_Email':User_Email ,'user_id': user_id, 'updated_by':updated_by,  'updated_at':updated_at, 'Username':Username, 'genderId':genderId})
        db.session.commit()
        return jsonify({'message': f'{Username} updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

def update_caes(case_id):
    data = request.get_json()
    description = data.get('Description')
    case_category_Id = data.get('Category')
    # case_subcategory_Id = data.get('Subcategory')
    clientType = data.get('clientType')
    updated_by = data.get('updated_by')
    updated_at = datetime.now()
    IndividualclientId = data.get('clients_first_name')

    # Check if all required parameters are present
    if not description:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    UpdateCases = text("UPDATE cases SET description=:description,case_category_Id=:case_category_Id,clientType=:clientType,updated_by=:updated_by, updated_at=:updated_at,IndividualclientId=:IndividualclientId WHERE Id=:case_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(UpdateCases, {'description':description,'case_category_Id':case_category_Id,'clientType':clientType,'updated_by':updated_by, 'updated_at':updated_at,'IndividualclientId':IndividualclientId, "case_id":case_id})
        db.session.commit()
        return jsonify({'message': f'{description}  Case updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

def update_IndividualClient(case_id):
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    email = data.get('email')
    Phone_number = data.get('phone')
    genderId = data.get('gender')
    updated_by = data.get('updated_by')
    updated_at = datetime.now()

    # Check if all required parameters are present
    if not First_name or not Last_name or not email or not Phone_number:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    UpdateCases = text("UPDATE Individualclients SET First_name=:First_name, Last_name=:Last_name , email=:email , Phone_number=:Phone_number , updated_by=:updated_by , updated_at=:updated_at,  genderId=:genderId WHERE Id=:case_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(UpdateCases, {'First_name':First_name, 'Last_name':Last_name , 'email':email , 'Phone_number':Phone_number , 'updated_by':updated_by , 'updated_at':updated_at,'genderId':genderId, "case_id":case_id})
        db.session.commit()
        return jsonify({'message': f'{First_name}  Case updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
def update_CorporateClient(case_id):
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    email = data.get('email')
    Phone_number = data.get('phone')
    updated_by = data.get('updated_by')
    updated_at = datetime.now()

    # Check if all required parameters are present
    if not First_name or not Last_name or not email or not Phone_number:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    UpdateCases = text("UPDATE CorporateClients SET First_name=:First_name, Last_name=:Last_name , email=:email , Phone_number=:Phone_number , updated_by=:updated_by , updated_at=:updated_at WHERE Id=:case_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(UpdateCases, {'First_name':First_name, 'Last_name':Last_name , 'email':email , 'Phone_number':Phone_number , 'updated_by':updated_by , 'updated_at':updated_at, "case_id":case_id})
        db.session.commit()
        return jsonify({'message': f'{First_name}  Case updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500