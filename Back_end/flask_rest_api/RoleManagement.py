from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from UserManagment import db, SQLAlchemy, request
from datetime import datetime
from SetUpManagement import Role
from sqlalchemy import text

# class Modules(db.Model):
#     __tablename__ = "modules"
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(256), nullable=True)
#     icon = db.Column(db.String(256), nullable=True)
#     created_by = db.Column(db.String(256), nullable=True)
#     created_at = db.Column(db.DateTime, default=datetime.now())
#     updated_by = db.Column(db.String(256), nullable=True)
#     updated_at = db.Column(db.DateTime, onupdate=datetime.now())

#     # Adding the roleId column
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

#     # Relationship to the Roles table
#     role = relationship("Roles", back_populates="modules")

#     def __repr__(self):
#         return f'<Module {self.title}>'
    
def get_all_Modules():
    roles=db.session.execute(text("select * from modules"))
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
    roleId=data.get("roleId")
    module = text("""
        INSERT INTO modules(title, icon, created_by, created_at, roleId) 
        VALUES(:title, :icon, :created_by, :created_at, :roleId)
    """)
    db.session.execute(module, {"title":title, "icon":icon, "created_by":created_by, "roleId":roleId, "created_at":datetime.now()})
    db.session.commit()
    return{"message":"Module created Successfully"}

def edit_module(id):
    data=request.get_json()
    title=data.get("title")
    icon=data.get("icon")
    updated_by=data.get("updated_by")
    updated_at=datetime.now()
    module=text("update modules set title=:title, icon=:icon, updated_at=:updated_at, updated_by=:updated_by where id=:id")
    db.session.execute(module,{"id":id,"title":title, "icon":icon, "updated_at":updated_at, "updated_by":updated_by})
    db.session.commit()
    return{"message":"Module updated Successfully"}


def get_all_submodules():
    roles=db.session.execute(text("select * from submodules"))
    output=[]
    for u in roles:
        moduledata={
            "id": u.id,
            "title":u.title,
            "icon":u.icon,
            "link":u.link
        }
        output.append(moduledata)

    return {"data":output}


def create_all_submodules():
    data=request.get_json()
    title=data.get("title")
    icon=data.get("icon")
    created_by=data.get("created_by")
    moduleId=data.get("roleId")
    link=data.get("link")
    module = text("""
        INSERT INTO submodules(title, icon, created_by, created_at, ModuleId, link) 
        VALUES(:title, :icon, :created_by, :created_at, :moduleId, :link)
    """)
    db.session.execute(module, {"title":title, "icon":icon, "created_by":created_by, "moduleId":moduleId, "created_at":datetime.now(), "link":link})
    db.session.commit()
    return{"message":"subModule created Successfully"}

def edit_submodule(id):
    data=request.get_json()
    title=data.get("title")
    icon=data.get("icon")
    link=data.get("link")
    updated_by=data.get("updated_by")
    updated_at=datetime.now()
    module=text("update submodules set title=:title, icon=:icon, updated_at=:updated_at, updated_by=:updated_by, link=:link where id=:id")
    db.session.execute(module,{"id":id,"title":title, "icon":icon, "updated_at":updated_at, "updated_by":updated_by, "link":link})
    db.session.commit()
    return{"message":"SubModule updated Successfully"}