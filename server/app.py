#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from models import User, FoodTruck, FoodTruckEvent, Event

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

############################ full crud User routes ########################################
class User_Route(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return users, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                name = data['name'],
                password_hash = data['password'],
                email = data['email'],
                profile_img=data['profile_img']
            )
        except ValueError as e:
            return{"errors": str(e)}, 400
            

        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return new_user.to_dict(), 200

api.add_resource(User_Route, '/users')

class Login_Route(Resource):
    def post(self):
        data = request.get_json()
        name = data["username"]
        password_hash = data["password"]
        user = User.query.filter_by(name=name).first()
        if user and user.authenticate(password_hash):
            session["user_id"] = user.id
            response = user.to_dict(), 200 
            # response.set_cookie("session_id", session.sid, httponly=True)
            return response
        else:
            return {"errors"}

api.add_resource(Login_Route, "/signin" )

# check session 
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

# logout
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')
        
        
class UserById_Route(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        return {"error": "Name not found"}, 404
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(user, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(user)
                db.session.commit()
                return user.to_dict(), 202
        
        return {"error": "User not found"}, 404
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                return '', 204
            except Exception:
                return '', 400
        else:
            return {"error": "User not found"}, 404

api.add_resource(UserById_Route, '/users/<int:id>')

############################ full crud FoodTruck routes ########################################
class FoodTruck_Route(Resource):
    def get(self):
        food_trucks = [f.to_dict() for f in FoodTruck.query.all()]
        return food_trucks, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_food_truck = FoodTruck(
                name = data['name'],
                food_type = data['food_type'],
                description = data['description'],
                user_id = session.get('user_id')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_food_truck)
        db.session.commit()

        return new_food_truck.to_dict(), 200

api.add_resource(FoodTruck_Route, '/foodtrucks')
        
class FoodTruckById_Route(Resource):
    def get(self, id):
        food_truck = FoodTruck.query.filter_by(id=id).first()
        if food_truck:
            return food_truck.to_dict(), 200
        return {"error": "Food Truck not found"}, 404
    
    def patch(self, id):
        food_truck = FoodTruck.query.filter_by(id=id).first()

        if food_truck:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(food_truck, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(food_truck)
                db.session.commit()
                return food_truck.to_dict(), 202
        
        return {"error": "Food Truck not found"}, 404
    
    def delete(self, id):
        food_truck = FoodTruck.query.filter_by(id=id).first()
        if food_truck:
            try:
                db.session.delete(food_truck)
                db.session.commit()
                return '', 204
            except Exception:
                return '', 400
        else:
            return {"error": "Food Truck not found"}, 404

api.add_resource(FoodTruckById_Route, '/foodtrucks/<int:id>')

############################ full crud Event routes ########################################

class Event_Route(Resource):
    def get(self):
        events = [e.to_dict() for e in Event.query.all()]
        return events, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_event = Event(
                name = data['name'],
                location= data['location'],
                description = data['description']
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_event)
        db.session.commit()

        return new_event.to_dict(), 200

api.add_resource(Event_Route, '/events')
        
class EventById_Route(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            return event.to_dict(), 200
        return {"error": "Event not found"}, 404
    
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()

        if event:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(event, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(event)
                db.session.commit()
                return event.to_dict(), 202
        
        return {"error": "Event not found"}, 404
    
    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            try:
                db.session.delete(event)
                db.session.commit()
                return '', 204
            except Exception:
                return '', 400
        else:
            return {"error": "Event not found"}, 404

api.add_resource(EventById_Route, '/events/<int:id>')

############################ full crud FoodTruckEvent routes ########################################
class FoodTruckEvent_Route(Resource):
    def get(self):
        food_truck_events = [t.to_dict() for t in FoodTruckEvent.query.all()]
        return food_truck_events, 200
    
    def post(self):
        data = request.get_json()
        print(data)
        try:
            new_food_truck_event = FoodTruckEvent(
             food_sales = data['food_sales'],
             beverage_sales = data['beverage_sales'],
             food_cost = data['food_cost'],
             beverage_cost = data['beverage_cost'],
             fuel_cost = data['fuel_cost'],
             hourly_wages = data['hourly_wages'],
             food_truck_id=data['food_truck_id'],
             event_id=data['event_id']
             )
            
            event = Event.query.filter_by(id = new_food_truck_event.event_id).first()
            print(event)

            new_event = Event(
                name = event.name,
                location = event.location,
                description = event.description,
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_food_truck_event)
        db.session.add(new_event)
        db.session.commit()

        return new_food_truck_event.to_dict(), 200

api.add_resource(FoodTruckEvent_Route, '/truckevents')
        
class FoodTruckEventById_Route(Resource):
    def get(self, id):
        food_truck_event = FoodTruckEvent.query.filter_by(id=id).first()
        if food_truck_event:
            return food_truck_event.to_dict(), 200
        return {"error": "Event not found"}, 404
    
    def patch(self, id):
        food_truck_event = FoodTruckEvent.query.filter_by(id=id).first()

        if food_truck_event:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(food_truck_event, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(food_truck_event)
                db.session.commit()
                return food_truck_event.to_dict(), 202
        
        return {"error": "Event not found"}, 404
    
    def delete(self, id):
        food_truck_event = FoodTruckEvent.query.filter_by(id=id).first()
        if food_truck_event:
            try:
                db.session.delete(food_truck_event)
                db.session.commit()
                return '', 204
            except Exception:
                return '', 400
        else:
            return {"error": "Event not found"}, 404

api.add_resource(FoodTruckEventById_Route, '/truckevents/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

