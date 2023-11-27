# Jeux_arrival
# p5.js Vehicle Simulation

This project implements a simple vehicle simulation using the p5.js library. The simulation includes vehicles that follow a leader, avoid obstacles, and have interactive behavior based on mouse input.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
Open the index.html file in your web browser.
Usage
Mouse Interaction: Click on the canvas to add a new vehicle at the mouse position. The first vehicle (index 0) acts as the leader, and subsequent vehicles follow the leader.

Sliders: Two sliders control the simulation parameters:

Max Speed: Adjusts the maximum speed of the vehicles.
Avoidance Radius: Controls the radius within which vehicles slow down when approaching the leader.
Files
sketch.js: Main script that defines the simulation behavior.
vehicle.js: Contains the Vehicle and Target classes used in the simulation.
index.html: HTML file for displaying the simulation. Includes references to necessary scripts and libraries.
Classes
1. Enemy
Represents an enemy in the simulation.
Has a position (pos) and an indicator of whether it's alive (isAlive).
Method show() displays the enemy on the canvas.
2. Vehicle
Represents a vehicle in the simulation with various behaviors.
Methods include seek(), arrive(), avoidObstacles(), etc.
Sliders control parameters such as maximum speed and avoidance radius.
3. Target
Inherits from the Vehicle class and represents a target in the simulation.
Displays as a circle and has a random initial velocity.
Contributing
Feel free to contribute to the project by opening issues or pull requests. Bug reports and feature requests are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.
Usage
Mouse Interaction: Click on the canvas to add a new vehicle at the mouse position. The first vehicle (index 0) acts as the leader, and subsequent vehicles follow the leader.

Double Click: Double-click on the canvas to increase the number of vehicles.

Sliders:

Max Speed: Adjusts the maximum speed of the vehicles.
Avoidance Radius: Controls the radius within which vehicles slow down when approaching the leader.
Number of Vehicles: Use the slider to increase or decrease the number of vehicles in the simulation.
Files
sketch.js: Main script that defines the simulation behavior.
vehicle.js: Contains the Vehicle and Target classes used in the simulation.
index.html: HTML file for displaying the simulation. Includes references to necessary scripts and libraries.
Classes
1. Enemy
Represents an enemy in the simulation.
Has a position (pos) and an indicator of whether it's alive (isAlive).
Method show() displays the enemy on the canvas.
2. Vehicle
Represents a vehicle in the simulation with various behaviors.
Methods include seek(), arrive(), avoidObstacles(), etc.
Sliders control parameters such as maximum speed, avoidance radius, and number of vehicles.
3. Target
Inherits from the Vehicle class and represents a target in the simulation.
Displays as a circle and has a random initial velocity.
Additional Features
Double Click to Add Vehicles: Double-click on the canvas to add more vehicles to the simulation.

Number of Vehicles Slider: Adjust the slider to increase or decrease the number of vehicles dynamically.

Speed Slider: Change the speed slider to adjust the maximum speed of the vehicles.

Contributing
Feel free to contribute to the project by opening issues or pull requests. Bug reports and feature requests are welcome!
