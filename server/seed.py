#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
# Remote library imports

# Local imports
from app import app
from models import db, User, FoodTruck, Event, FoodTruckEvent

if __name__ == '__main__':
   
    with app.app_context():
        print("Starting seed...")
                # Drop and recreate all tables (optional, use with caution)
        db.drop_all()
        db.create_all()

        #create some users
        user1 = User(name="Terence Hughes", _password_hash = '123', email="terencehughes@example.com", profile_img="img1.jpg")
        user2 = User(name="Sam Waters", _password_hash = "123", email="samwaters@example.com", profile_img="img2.jpg")

        db.session.add_all([user1, user2])
        db.session.commit()

        # Create some food trucks
        food_truck1 = FoodTruck(name="Eazy T's", food_type="Mexican, American Fusion", description="American classics smothered with green chili", user_id=user1.id)
        food_truck2 = FoodTruck(name="Sams Juan-Tons", food_type="Mexican, American Fusion", description="Tasty fried treats filled with beef and cheese dipped in green chili", user_id=user2.id)

        db.session.add_all([food_truck1, food_truck2])
        db.session.commit()

        # Create some events
        event1 = Event(name="event_1", location="Red Rocks", description="Iron Maiden plays Red Rocks")
        event2 = Event(name="event_2", location="Mishawaka", description="The Bosstones rock the Mish")

        db.session.add_all([event1,event2])
        db.session.commit()

        # Create some food truck events
        food_truck_event1 = FoodTruckEvent(food_sales= 7500.00, beverage_sales=1000.00, food_cost=3000.00, beverage_cost=750.00, fuel_cost=100.00, food_truck_id=food_truck1.id, event_id=event1.id)
        food_truck_event2 = FoodTruckEvent(food_sales=5000.00, beverage_sales=500.00, food_cost=2000.00, beverage_cost=250.00, fuel_cost=50.00, food_truck_id=food_truck2.id, event_id=event2.id)

        db.session.add_all([food_truck_event1,food_truck_event2])
        db.session.commit()


        print("Seed completed.")
        
