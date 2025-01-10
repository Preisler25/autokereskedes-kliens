import { CarsService } from '../services/s_cars.ts';
import { Car } from '../interface/i_cars.ts';

export async function buildCarList(element: HTMLDivElement){
  let carsS : CarsService = new CarsService();
  await carsS.fetchCars(); 
  const buildList = (carS: CarsService) => { 
    element.innerHTML = '';
    buildCardListHeader(element);
    let cars = carS.getCars();
    cars.forEach(car => {
      buildCarListElement(car, element, carS);
    });
  }

  const buildCardListHeader = (element: HTMLDivElement) => {
    const header = document.createElement('div');
    const name = document.createElement('h2');
    const price = document.createElement('h2');
    const isRented = document.createElement('h2');
    const img = document.createElement('h2');
    const button = document.createElement('h2');

    name.textContent = 'Name';
    price.textContent = 'Price';
    isRented.textContent = 'Is Rented';
    img.textContent = 'Image';
    button.textContent = 'Rent';

    header.classList.add('car'); 
    name.classList.add('car-e');
    price.classList.add('car-e');
    isRented.classList.add('car-e');
    img.classList.add('car-e');
    button.classList.add('car-e');


    header.appendChild(name);
    header.appendChild(price);
    header.appendChild(isRented);
    header.appendChild(img);
    header.appendChild(button);

    element.appendChild(header);
  }

  
  const buildCarListElement = (car: Car, element: HTMLDivElement, carS: CarsService) => {
    const carElement = document.createElement('div');
    const carName = document.createElement('h2');
    const carPrice = document.createElement('p');
    const carIsRented = document.createElement('p');
    const carImg = document.createElement('img');
    const carButton = document.createElement('button');
  
    carElement.classList.add('car');
    carName.classList.add('car-e');
    carPrice.classList.add('car-e');
    carIsRented.classList.add('car-e');
    carImg.classList.add('car-e');
    carButton.classList.add('car-e');

    carName.textContent = car.name;
    carPrice.textContent = car.price;
    carIsRented.textContent = car.isRented;
    carImg.src = "https://picsum.photos/200/300";
    carButton.textContent = 'Rent';

    carButton.addEventListener('click', async () => {
      await carsS.rentCar(car.id);
      buildList(carS);
    }); 

    carElement.appendChild(carName);
    carElement.appendChild(carPrice);
    carElement.appendChild(carIsRented);
    carElement.appendChild(carImg);
    carElement.appendChild(carButton);

    element.appendChild(carElement);
  }
  buildList(carsS);
}
