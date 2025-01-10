import { Car } from '../interface/i_cars.ts';

export class CarsService {
  static private cars: Car[] = [];

  setCars(cars: Car[]) {
    this.cars = cars;
  } 

  getCars() {
    return this.cars;
  }

  updateCar(car: Car) {
    const index = this.cars.findIndex(c => c.id === car.id);
    this.cars[index] = car;
  }

  async rentCar(id: number) {
    const car = this.cars.find(car => car.id === id);
    if (!car) return;
    var res = await fetch(`https://retoolapi.dev/m2pZDD/data/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isRented: !car.isRented
      })
    });
    const data : Car = await res.json();
    if (!data) return;
    this.updateCar(data);
  }
  async fetchCars() {
    const response : Car[] = await fetch('https://retoolapi.dev/m2pZDD/data');
    const cars = await response.json();
    if (!cars) return;
    this.setCars(cars); 
  }
}
