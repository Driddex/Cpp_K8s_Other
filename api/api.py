from pydantic import BaseModel
from fastapi import Depends, FastAPI
from sqlalchemy import Integer, VARCHAR, create_engine, Column
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import os

DATABASE_URL = os.environ["DATABASE_URL"]
engine = create_engine(DATABASE_URL)
sessionlocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)
base = declarative_base

class cc_users(base):
    __tablename__ = "users"
    id = Column(Integer, nullable=False, primary_key=True)
    name = Column(VARCHAR(20), nullable=False, primary_key=False)

class checker(BaseModel):
    id : int
    name : str

app = FastAPI()

def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/p')
async def Post(data: checker, db : Session = Depends(get_db)):
    id = data.id
    name = data.name

    if_user_exists = db.query(cc_users).filter(cc_users.id==id, cc_users.name==name).first()

    if if_user_exists:
        return {"status": "user already exists"}
    else:
        user = cc_users(id=id,name=name)
        db.add(user)
        db.commit()

        return {"status": "created a user"}