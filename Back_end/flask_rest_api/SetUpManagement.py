from UserManagment import db, SQLAlchemy, request
from datetime import datetime
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