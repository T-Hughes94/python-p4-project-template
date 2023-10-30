from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

#table name
class User(db.Model, SerializerMixin):
    __tablename__ = 'user_table'
    #table columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, nullable = False)
    profile_img = db.Column(db.String)
    #relationships
    food_truck =db.relationship('FoodTruck', back_populates = 'user')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    
    @validates('name')
    def set_price(self, key, name):
        if isinstance(name, str) and 1 <= len(name) <= 20:
            return name
        else:
            raise ValueError('Not a valid name')
        
    @validates('email')
    def set_price(self, key, email):
        if isinstance(email, str) and 1 <= len(email) <= 50:
            return email
        else:
            raise ValueError('Not a valid email')


#Table name
class FoodTruck(db.Model, SerializerMixin):
    __tablename__ = 'food_truck_table'
    #Table Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    food_type = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    # foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    #relationships to other tables
    user = db.relationship('User', back_populates = 'food_truck')
    food_truck_event = db.relationship('FoodTruckEvent', back_populates = 'food_truck')

    @validates('name')
    def set_price(self, key, name):
        if isinstance(name, str) and 1 <= name <= 20:
            return name
        else:
            raise ValueError('Not a valid name')
    
    @validates('location')
    def set_price(self, key, location):
        if isinstance(location, str) and 1 <= location <= 50:
            return location
        else:
            raise ValueError('Not a valid location')

#table name
class Event(db.Model, SerializerMixin):
    __tablename__ = 'event_table'
    #table columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    location = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)

    #relationships
    food_truck_event = db.relationship('FoodTruckEvent', back_populates = 'event')

    @validates('name')
    def set_price(self, key, name):
        if isinstance(name, str) and 1 <= name <= 20:
            return name
        else:
            raise ValueError('Not a valid name')
        
    @validates('location')
    def set_price(self, key, location):
        if isinstance(location, str) and 1 <= location <= 50:
            return location
        else:
            raise ValueError('Not a valid location')


#table name
class FoodTruckEvent(db.Model, SerializerMixin):
    __tablename__ = 'food_truck_event_table'
    #table columns
    id = db.Column(db.Integer, primary_key = True)
    food_sales = db.Column(db.Float)
    beverage_sales = db.Column(db.Float)
    food_cost = db.Column(db.Float)
    beverage_cost = db.Column(db.Float)
    fuel_cost = db.Column(db.Float)

    # foreign keys
    food_truck_id = db.Column(db.Integer, db.ForeignKey("food_truck_table.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("event_table.id"))

    #relationships
    food_truck = db.relationship('FoodTruck', back_populates ='food_truck_event')
    event = db.relationship('Event', back_populates = 'food_truck_event')

    #serialization
    serialize_rules = ('-food_truck.food_truck_event', '-event.food_truck_event', 'profit')


    #calculate total profit
    def profit(self):
        total_food = self.food_sales - self.food_cost
        total_beverage = self.beverage_sales - self.beverage_cost
        profit = (total_beverage + total_food) -self.fuel_cost
        return "S{:,.2f}".format(profit)
    #profit from food
    def food_profit(self):
        return "${:,.2f}".format(self.food_sales - self.food_cost)
    #profit from beverages
    def bev_profit(self):
        return "${:,.2f}".format(self.beverage_sales - self.beverage_cost)
    #total costs
    def cost(self):
        return "${:,.2f}".format(self.food_cost + self.beverage_cost)

    
    
    
