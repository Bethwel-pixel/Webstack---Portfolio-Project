from UserManagment import db, SQLAlchemy, request
from datetime import datetime
from SetUpManagement import Role

class modules(db.Model):
    __tablename__ = "Roles"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=True)
    icon = db.Column(db.String(256), nullable=True)
    created_by = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_by = db.Column(db.String(256), nullable=True)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    def __repr__(self):
        return f'{self.roles}'
    
def get_all_Modules():
    roles=db.session.execute("select * from modules")
    output=[]
    for u in roles:
        moduledata={
            "id": u.id,
            "title":u.title,
            "icon":u.icon
        }
        output.append(moduledata)

    return {"data":output}


def create_all_Modules():
    data=request.get_json()
    title=data.get("title")
    icon=data.get("icon")
    created_by=data.get("created_by")
    roleId=data.get(id)
    module=modules(title=title, icon=icon, created_by=created_by, roleId=roleId,created_at=datetime.now)
    db.session.add(module)
    db.session.commit()
    return{"message":"Module created Successfully"}