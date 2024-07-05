from UserManagment import Users, db, jsonify, request
from companyRegionBranches import CompanyRegionBranchView
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

def get_all_Users():
        userAll=text('select * from users')
        user = db.session.execute(userAll)
        output = []
        for u in user:
                user_data = {
                        'id':u.User_Id,
                        'Username':u.Username,
                        'First_name': u.First_name,
                        'Last_name': u.Last_name,
                        'User_email': u.User_Email,
                        'Phone_number':u.Phone_number,
                        'status':u.status,
                        'created_by':u.created_by,
                        'updated_by':u.updated_by,
                        'gender':u.genderId

                }
                output.append(user_data)
        return {"data": output}

def get_all_Company_Region_View():
        user = CompanyRegionBranchView.query.all()
        output = []
        for u in user:
                user_data = {
                        'id':u.Id,
                        'CompanyName':u.CompanyName,
                        'BranchName': u.BranchName,
                        # 'Last_name': u.Last_name,
                        # 'User_email': u.User_Email,
                        # 'Phone_number':u.Phone_number,
                        # 'status':u.Status
                }

                output.append(user_data)
        return {"data": output}

def get_all_cases():
        sql=text('select * from casemanagementview;')
        allcases=db.session.execute(sql)
        output = []
        for u in allcases:
                Cases_data = {
                        'id':u.case_id,
                        'CompanyName':u.company_name,
                        'description': u.description,
                        'created_at': u.created_at,
                        'created_by': u.created_by,
                        'updated_by': u.updated_by,
                        'individual_first_name': u.individual_first_name,
                        'individual_last_name': u.individual_last_name,
                        'corporate_first_name': u.corporate_first_name,
                        'corporate_last_name': u.corporate_last_name,
                        'case_category': u.case_category,
                        'case_subcategory': u.case_subcategory,
                        'updated_at':u.updated_at,
                        'CaseCategory':u.case_category,
                }

                output.append(Cases_data)
        return {"data": output}

def get_all_recentCases():
        sql=text('select * from casemanagementview order by updated_at limit 10;')
        allcases=db.session.execute(sql)
        output = []
        for u in allcases:
                Cases_data = {
                        'id':u.case_id,
                        'CompanyName':u.company_name,
                        'description': u.description,
                        'created_at': u.created_at,
                        'created_by': u.created_by,
                        'updated_by': u.updated_by,
                        'individual_first_name': u.individual_first_name,
                        'individual_last_name': u.individual_last_name,
                        'corporate_first_name': u.corporate_first_name,
                        'corporate_last_name': u.corporate_last_name,
                        'case_category': u.case_category,
                        'case_subcategory': u.case_subcategory,
                        'updated_at':u.updated_at,
                        'CaseCategory':u.case_category,
                }

                output.append(Cases_data)
        return {"data": output}

# **** client Management ***
def get_all_ClientManagementView():
        sql=text('select * from ClientManagementView;')
        allClientManagementView=db.session.execute(sql)
        output = []
        for u in allClientManagementView:
                ClientManagementViewdata = {
                        'id':u.Id,
                        # 'CompanyName':u.CompanyName,
                        'IndustrySector': u.IndustrySector,
                        'Client_Type': u.Client_Type,
                        'CompanyName': u.CompanyName,
                        'Address':u.Address,
                        'Email':u.Email
                }

                output.append(ClientManagementViewdata)
        return {"data": output}

def get_all_IndividualClients():
        userAll=text('select * from Individualclients')
        user = db.session.execute(userAll)
        output = []
        for u in user:
                user_data = {
                        'id':u.id,
                        'First_name': u.First_name,
                        'Last_name': u.Last_name,
                        'email': u.email,
                        'Phone_number':u.phone_number,
                        'status':u.status,
                        'created_by':u.created_by,
                        'updated_by':u.updated_by,
                        'gender':u.genderId

                }
                output.append(user_data)
        return {"data": output}

def get_all_CorporateClients():
        userAll=text('select * from CorporateClients')
        user = db.session.execute(userAll)
        output = []
        for u in user:
                user_data = {
                        'id':u.id,
                        'First_name': u.First_name,
                        'Last_name': u.Last_name,
                        'email': u.email,
                        'Phone_number':u.phone_number,
                        'status':u.status,
                        'created_by':u.created_by,
                        'updated_by':u.updated_by,

                }
                output.append(user_data)
        return {"data": output}


def get_all_notifications(username):
    # Query to get all notifications
    sql = text('SELECT * FROM notifications where UserId=(select User_id from users where Username=:username);')
    all_notifications = db.session.execute(sql,{"username":username}).fetchall()

    # Query to get the count of notifications
#     sql_count = text('SELECT COUNT(*) FROM notifications;')
#     count_result = db.session.execute(sql_count).fetchone()
#     count = count_result[0]  # Accessing the count using integer index

    # Prepare the output
    output = []
    for u in all_notifications:
        notification_data = {
            'id': u[0],  # Assuming the first column is 'id'
            'description': u[1]  # Assuming the second column is 'description'
        }
        output.append(notification_data)

    return jsonify({
        "data": output,
    })

def get_all_gender():
    # Query to get all notifications
    sql = text('SELECT * from gender;')
    all_notifications = db.session.execute(sql).fetchall()


    # Prepare the output
    output = []
    for u in all_notifications:
        notification_data = {
            'id': u[0],  # Assuming the first column is 'id'
            'gender': u[1]  # Assuming the second column is 'description'
        }
        output.append(notification_data)

    return jsonify({
        "data": output,
    })


def get_all_category():
    # Query to get all notifications
    sql = text('SELECT * from CaseCategory;')
    all_notifications = db.session.execute(sql).fetchall()


    # Prepare the output
    output = []
    for u in all_notifications:
        notification_data = {
            'id': u[0],  # Assuming the first column is 'id'
            'Category': u[1]  # Assuming the second column is 'description'
        }
        output.append(notification_data)

    return jsonify({
        "data": output,
    })

def get_all_casesubcategory(id):
    # Query to get all notifications
    sql = text('SELECT * from casesubcategory where categoryId=:id;')
    all_notifications = db.session.execute(sql,{"id":id}).fetchall()


    # Prepare the output
    output = []
    for u in all_notifications:
        notification_data = {
            'id': u[0],  # Assuming the first column is 'id'
            'Category': u[1]  # Assuming the second column is 'description'
        }
        output.append(notification_data)

    return jsonify({
        "data": output,
    })

def get_all_clientType():
    # Query to get all notifications
    sql = text('SELECT * from clients;')
    all_notifications = db.session.execute(sql).fetchall()


    # Prepare the output
    output = []
    for u in all_notifications:
        notification_data = {
            'id': u[0],  # Assuming the first column is 'id'
            'Client_Type': u[1]  # Assuming the second column is 'description'
        }
        output.append(notification_data)

    return jsonify({
        "data": output,
    })

def get_User_Id():
      data=request.get_json()
      username = data.get('username')
      sql = text('SELECT User_id FROM Users WHERE Username = :username')
      user = db.session.execute(sql, {'username': username}).fetchone()
      return jsonify({'User_id': user[0]})