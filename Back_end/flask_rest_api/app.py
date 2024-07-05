from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash
from UserManagment import Users, db
from clientManagement import Client
from CasseManagement import Cases, CaseCategory, SubCategory
from CompanyManagment import Company, IndustrySector
from AccountManagement import Banks, BankAccounts, BankBranches
from query import get_all_Users, get_all_Company_Region_View, get_all_cases, get_all_ClientManagementView, get_all_notifications, get_all_gender,get_all_IndividualClients, get_all_CorporateClients, get_all_category, get_all_casesubcategory, get_all_clientType, get_all_recentCases
from delete import delete_user
from companyRegionBranches import CompanyRegionBranchView
from mutation import create_user, Create_Case, create_IndividualClient, create_CorporateClient, Create_Gender, change_password
from update import update_user, update_caes, update_IndividualClient, update_CorporateClient, update_isPassword
from signin import SignIn
from flask_login import LoginManager, login_required, current_user
from Signup import SignUp
from query import text

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://bethwel:kk@localhost/BETH'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
db.init_app(app)

@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'

@app.route('/login', methods=['POST'])
def login():
    return SignIn()


@app.route('/signup', methods=['POST'])
def Sign_Up():
    return SignUp()

@app.route('/user')
@login_required
def get_user_data():
    user_data = {
        "username": current_user.username,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "status": current_user.status
    }
    return jsonify(user_data)


# Method Get

@app.route('/crb', methods=['GET'])
def get_company_region_branches():
    return get_all_Users()

@app.route('/data')
def getdata():
    return get_all_Users()

@app.route('/notifications/<username>')
def getNotifications(username):
    return get_all_notifications(username)

@app.route('/data/<Name>')
def get_data_by_name(Name):
    # Corrected the variable and parameter names to be consistent
    sql = text("SELECT * FROM Users WHERE Username = :name")
    user = db.session.execute(sql, {'name': Name}).fetchone()  # Fetch one result

    # Ensure that the user exists
    if user:
        user_data = {
            'User_name':user.Username,
            'First_name': user.First_name,
            'Last_name': user.Last_name,
            'User_email': user.User_Email
        }
        return jsonify(user_data)
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/company')
def getCompanyRegionView():
    return get_all_Company_Region_View()

# *** Cases Management ***

@app.route('/cases', methods =['GET'])
def get_all_Cases():
    return get_all_cases()

@app.route('/recentcases', methods =['GET'])
def all_recentCases():
    return get_all_recentCases()

@app.route('/caseManagment', methods =['POST'])
def CaseCreation():
    return Create_Case()

@app.route('/cases/<case_id>', methods=['PUT'])
def update_case(case_id):
    return update_caes(case_id)

#  ** Client Management**
@app.route('/clientManagement')
def all_ClientManagementView():
    return get_all_cases()
    # return get_all_ClientManagementView()

@app.route('/individualclients', methods=['GET'])
def all_IndividualClients():
    return get_all_IndividualClients()

@app.route('/individualclients', methods=['POST'])
def create_IndividualClients():
    return create_IndividualClient()

@app.route('/individualclients/<id>', methods=['PUT'])
def update_IndividualClients(id):
    return update_IndividualClient(id)


@app.route('/corporateclients', methods=['GET'])
def all_corporateclients():
    return get_all_CorporateClients()

@app.route('/corporateclients', methods=['PUT'])
def create_corporateclients():
    return create_CorporateClient()

@app.route('/corporateclients/<id>', methods=['PUT'])
def update_corporateclients(id):
    return update_CorporateClient(id)

@app.route('/gender')
def all_gender():
    return get_all_gender()

@app.route('/gender', methods=['POST'])
def create_gender():
    return Create_Gender()
## Method POST

@app.route('/data', methods=['POST'])
def Create_user():
    return create_user()
    

# Method Put
@app.route('/update/<user_id>', methods=['PUT'])
def Update_User(user_id):
    return update_user(user_id)

@app.route('/delete/<id>', methods=['PUT'])
def delete(id):
    return delete_user(id)


#  ** Setup Management

@app.route('/Category', methods=['GET'])
def all_Categories():
    return get_all_category()

@app.route('/Casesubcategory/<int:id>', methods=['GET'])
def caseSubcategoryByCategory(id):
    return get_all_casesubcategory(id)

@app.route('/clienttype', methods=['GET'])
def all_clientType():
    return get_all_clientType()



# *** Forgot Password Logic ***
@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    return update_isPassword()

@app.route('/change_password/<int:id>', methods=['POST'])
def change_Password(id):
    return change_password(id)
if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)