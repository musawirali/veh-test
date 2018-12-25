import each from 'lodash/each';
import keys from 'lodash/keys';
import find from 'lodash/find';
import { assignVehicles } from './index';

describe('Principal vehicle assignment', () => {

  // Test 1
  it('Assigns one vehicle to one driver', () => {
    const vehicles = [{
      id: '1',
      year: 2011,
    }];
    const drivers = [{
      id: '101',
      age: 35,
      principalVehicleID: null,
    }];

    expect(assignVehicles(vehicles, drivers)).toEqual({
      vehicles: { '1': '101' },
      drivers: { '101': '1' },
    });
  });

  // Test 2
  it('Assigns three vehicles to three drivers', () => {
    const vehicles = [{
      id: '1',
      year: 2011,
    }, {
      id: '2',
      year: 2011,
    }, {
      id: '3',
      year: 2011,
    }];

    const drivers = [{
      id: '101',
      principalVehicleID: null,
      age: 35,
    }, {
      id: '102',
      principalVehicleID: null,
      age: 35,
    }, {
      id: '103',
      principalVehicleID: null,
      age: 35,
    }];

    const res = assignVehicles(vehicles, drivers);

    // Check output
    expect(keys(res.vehicles).length).toEqual(vehicles.length);
    expect(keys(res.drivers).length).toEqual(drivers.length);

    each(keys(res.vehicles), (vehID) => {
      // Vehicle must exist in input list
      expect(find(vehicles, veh => veh.id === vehID)).toBeTruthy();

      // Driver must exist in input list
      const drvID = res.vehicles[vehID];
      expect(drvID).toBeTruthy();
      expect(find(drivers, drv => drv.id === drvID)).toBeTruthy();

      // Mapping of driver -> vehicle should match
      expect(res.drivers[drvID]).toEqual(vehID);
    });
  });

  // Test 3
  it('Assigns three vehicles to two drivers', () => {
    const vehicles = [{
      id: '1',
      year: 2011,
    }, {
      id: '2',
      year: 2011,
    }, {
      id: '3',
      year: 2011,
    }];

    const drivers = [{
      id: '101',
      principalVehicleID: null,
      age: 35,
    }, {
      id: '102',
      principalVehicleID: null,
      age: 35,
    }];

    const res = assignVehicles(vehicles, drivers);

    // Check output
    expect(keys(res.vehicles).length).toEqual(vehicles.length);
    expect(keys(res.drivers).length).toEqual(drivers.length);

    let matchCnt = 0;
    each(keys(res.vehicles), (vehID) => {
      // Vehicle must exist in input list
      expect(find(vehicles, veh => veh.id === vehID)).toBeTruthy();

      // Driver must exist in input list
      const drvID = res.vehicles[vehID];
      expect(drvID).toBeTruthy();
      expect(find(drivers, drv => drv.id === drvID)).toBeTruthy();

      // Mapping of driver -> vehicle should match, except once.
      if (res.drivers[drvID] === vehID) {
        matchCnt += 1;
      }
    });
    expect(matchCnt).toEqual(2);
  });

  // Test 4
  it('Assigns two vehicles to three drivers', () => {
    const vehicles = [{
      id: '1',
      year: 2011,
    }, {
      id: '2',
      year: 2011,
    }];

    const drivers = [{
      id: '101',
      principalVehicleID: null,
      age: 35,
    }, {
      id: '102',
      principalVehicleID: null,
      age: 35,
    }, {
      id: '103',
      principalVehicleID: null,
      age: 35,
    }];

    const res = assignVehicles(vehicles, drivers);

    // Check output
    expect(keys(res.vehicles).length).toEqual(vehicles.length);
    expect(keys(res.drivers).length).toEqual(drivers.length);

    let matchCnt = 0;
    each(keys(res.drivers), (drvID) => {
      // Driver must exist in input list
      expect(find(drivers, drv => drv.id === drvID)).toBeTruthy();

      // Vehicle must exist in input list
      const vehID = res.drivers[drvID];
      expect(vehID).toBeTruthy();
      expect(find(vehicles, veh => veh.id === vehID)).toBeTruthy();

      // Mapping of vehicle -> driver should match, except once.
      if (res.vehicles[vehID] === drvID) {
        matchCnt += 1;
      }
    });
    expect(matchCnt).toEqual(2);
  });

  // Test 5
  it('Assigns three vehicles to three drivers, respecting prior assignment via principalVehicleID', () => {
    const vehicles = [{
      id: '1',
      year: 2011,
    }, {
      id: '2',
      year: 2011,
    }, {
      id: '3',
      year: 2011,
    }];

    const drivers = [{
      id: '101',
      principalVehicleID: '3',
      age: 35,
    }, {
      id: '102',
      principalVehicleID: '1',
      age: 35,
    }, {
      id: '103',
      principalVehicleID: null,
      age: 35,
    }];

    expect(assignVehicles(vehicles, drivers)).toEqual({
      vehicles: { '1': '102', '2': '103', '3': '101'},
      drivers: { '101': '3', '102': '1', '103': '2' },
    });
  });

  // Test 6
  it('Assigns three vehicles to three drivers, respecting prior assignment via principalVehicleID and assigning oldest car to youngest driver', () => {
    const vehicles = [{
      id: '1',
      year: 2015,
    }, {
      id: '2',
      year: 2001,
    }, {
      id: '3',
      year: 2011,
    }];

    const drivers = [{
      id: '101',
      principalVehicleID: '2',
      age: 38,
    }, {
      id: '102',
      principalVehicleID: null,
      age: 19,
    }, {
      id: '103',
      principalVehicleID: null,
      age: 35,
    }];

    expect(assignVehicles(vehicles, drivers)).toEqual({
      vehicles: { '1': '103', '2': '101', '3': '102'},
      drivers: { '101': '2', '102': '3', '103': '1' },
    });
  });

  // Test 7
  it('Assigns two vehicles to three drivers, respecting prior assignment via principalVehicleID and assigning oldest car to youngest driver', () => {
    const vehicles = [{
      id: '1',
      year: 2015,
    }, {
      id: '2',
      year: 2001,
    }];

    const drivers = [{
      id: '101',
      principalVehicleID: '2',
      age: 38,
    }, {
      id: '102',
      principalVehicleID: null,
      age: 19,
    }, {
      id: '103',
      principalVehicleID: null,
      age: 35,
    }];

    expect(assignVehicles(vehicles, drivers)).toEqual({
      vehicles: { '1': '103', '2': '101' },
      drivers: { '101': '2', '102': '2', '103': '1' },
    });
  });
});