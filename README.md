## Overview

This project is a **FOOD DELIVERY REST API** built with express.js. It allows restaurants to create profiles for their businesses and add menus that are available in their restaurant. 

Customers can also use the API to order food from any restaurant of their choice and it will delivered to them. 

Delivery is done by riders who must have created an account and registered their profile on the platform. Riders are matched to orders near their current location.

## Database Models
The database models are the individual entities that make up the entire project. 

### User
The **User** model stores data about each registered user on the platform. Required data accepted form users include the following:

- Username: A preferred name that users will be referred to on the platform.
- Email: A valid user email
- Password: A strong password with more than 8 characters.
- Role: The user role on the platform such as Customer, Restaurant owner, and a rider


### Restaurant
The **Restaurant** model stores data about a registered restaurant on the platform. Restaurant data include the following:

- Name: The restaurant name
- Location: The restaurant Location
- Contact: The restaurant contact number
- Menu: A list of menu items available in the restaurant.
- User Id: An Id of the user that created the restaurant. The user must have a **Restaurant Owner** role

### Menu
The **Menu** model stores data about each menu. They include the following:

- Name: A unique name for the menu
- Description: A description for the menu
- Price: A price tag for the menu
- Availability: A boolean value for the menu's availability. 
- Restaurant ID: The iD of the restaurant that created the menu

### Rider
The **Rider** model stores data about each rider. A rider must have created a **User** profile with a **rider** role. Rider's data include the following:

- Contact: The rider's contact number
- Vehicle Details: Rider's vehicle details, e.g plate number.
- Status: A rider's availability status. Can either be available or unavailable.
- Current Location: The rider's current location. Useful when matching riders to orders around their location.
- User ID: The ID of the user that created a Rider profile.

### Orders
The **Orders** model stores data about each order. They include the following:

- UserId: The ID of the user that ordered the item
- RestaurantId: The ID of the restaurant that owns the menu item.
- MenuId: The ID of the menu item
- TotalCost: The total cost of the order (including delivery fee)
- Isdelivered: A boolean value for confirming order delivery status
- RiderId: The ID of the rider delivering the menu item
- Destination: The delivery destination.


## Technologies used
- **morgan:** For log monitoring
- **json-web-token:** For user authentication/session management.
- **nodemailer:** For sending mails.
- **mongoose:** To connect with the MongoDB database used by the API
- **bcryptjs:** For password hashing.
- **dotenv:** For configuring and using environment variables 