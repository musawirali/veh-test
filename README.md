Implement the function `assignVehicles` in `index.js`. Test your solution by running the included tests.

You are given an array of `vehicles` and an array of `drivers` in a household.
 For car insurance, we need to assign each driver a `principal vehicle`. This information
 is sometimes missing. We need to come up with an algorithm to do principal vehicle
 assignment such that every driver has a principal vehicle and every vehicle has a principal
 driver, while respecting the principal driver assignment info if it is available.

 Note that there can be different number of drivers and vehicles: If the number of
 drivers is less than number of vehicles, there will be multiple drivers who have the
 same principal vehicle. On the other hand, if there are more vehicles than drivers,
 there will be multiple vehicles who have the same principal driver.
 
 One additional requirement of the principal vehicle assignment is that the YOUNGEST driver
 should be assigned the OLDEST car whenever possible. The age of each driver and the year of
 each car are provided in the input.
 
 The output of the function should be an object with two items: `vehicles` and `drivers`:
 ```
 {
   vehicles: { vehID1: drvID1, ... }, // Maps each vehicle ID to corresponding principal driver ID
   drivers: { drvID1: vehID1, ... }, // Maps each driver ID to corresponding principal vehicle ID
 }
 ```
 
 The input objects have the following shape:
 
 ```
 type Vehicle = {
   id: string,
   year: number,
 };

 type Driver = {
   id: string,
   principalVehicleID: ?string, // This maybe null if data is not available.
   age: number,
 };
 ```
