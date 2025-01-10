import { CarsService } from '../services/s_cars.ts';
import { Car } from '../interface/i_cars.ts';

export async function buildCarList(element: HTMLDivElement){
  let carsS : CarsService = new CarsService();

  const buildList = () => { 
    element.innerHTML = '';
    buildCardListHeader(element);
    let cars = carsS.getCars();
    cars.forEach(car => {
      buildCarListElement(car, element);
    });
  }
 
  const showLoading = () =>{
    element.innerHTML = ''; 
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading');
    loadingDiv.textContent = 'Loading...';
    element.appendChild(loadingDiv);
  };

  const hideLoading = () => {
    const loadingDiv = element.querySelector('.loading');
    if (loadingDiv) {
      element.removeChild(loadingDiv);
    }
  };

  const buildCardListHeader = () => {
    const header = document.createElement('div');
    const name = document.createElement('h2');
    const price = document.createElement('h2');
    const isRented = document.createElement('h2');
    const img = document.createElement('h2');
    const button = document.createElement('h2');

    name.textContent = 'Kocsi neve';
    price.textContent = 'Ár';
    isRented.textContent = 'Szabad?';
    img.textContent = 'Kép';
    button.textContent = 'Bérlés';

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

  
  const buildCarListElement = (car: Car) => {
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

    carIsRented.classList.add(car.isRented ? 'rented' : 'not-rented');

    carName.textContent = car.name;
    carPrice.textContent = car.price;
    carIsRented.textContent = car.isRented ? 'Nem' : 'Igen';
    carImg.src = "https://picsum.photos/200/300";
    carButton.textContent = car.isRented ? 'Lemondás' : 'Bérlés';

    carButton.addEventListener('click', async () => {  
      showLoading();
      await carsS.rentCar(car.id);
      hideLoading();
      buildList(carsS);
    }); 

    carElement.appendChild(carName);
    carElement.appendChild(carPrice);
    carElement.appendChild(carIsRented);
    carElement.appendChild(carImg);
    carElement.appendChild(carButton);

    element.appendChild(carElement);
  }
  
  showLoading();
  await carsS.fetchCars(); 
  hideLoading();
  buildList(carsS);
}
