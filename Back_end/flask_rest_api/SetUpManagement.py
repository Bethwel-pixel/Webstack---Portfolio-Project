from UserManagment import db, SQLAlchemy, request
from datetime import datetime
from sqlalchemy import text
class Gender(db.Model):
    __tablename__ = "Gender"
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(256), nullable=True)
    created_by = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_by = db.Column(db.String(256), nullable=True)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    def __repr__(self):
        return f'{self.gender}'
    
class Role(db.Model):
    __tablename__ = "Roles"
    id = db.Column(db.Integer, primary_key=True)
    roleName = db.Column(db.String(256), nullable=True)
    created_by = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_by = db.Column(db.String(256), nullable=True)
    status = db.Column(db.Integer, default=1)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    def __repr__(self):
        return f'{self.roles}'
    

def get_all_Roles():
    roles=db.session.query(Role).all()
    output=[]
    for u in roles:
        roleData={
            "id": u.id,
            "role":u.roleName,
            "status":u.status
        }
        output.append(roleData)

    return {"data":output}

def create_Role():
    data = request.get_json()
    created_at = datetime.now()
    role = Role(roleName=data['Role'], created_at=created_at, created_by = data['created_by'])
    db.session.add(role)
    db.session.commit()
    return {"message":"Role created Successfully"}, 201

def Edit_Role(id):
    data = request.get_json()
    Role=data.get("Role")
    updated_at = datetime.now()
    role = text("update Roles set roleName=:Role, updated_at=:updated_at where id=:id")
    db.session.execute(role,{'id':id,"Role":Role, 'updated_at':updated_at})
    db.session.commit()
    return {"message":"Role created Successfully"}, 201