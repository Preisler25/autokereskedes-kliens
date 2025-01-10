import './style.css'
import { Car } from './interface/i_cars.ts';
import { CarsService } from './services/s_cars.ts';
import { buildCarList } from './elements/list_cars.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <div id="list"></div>    
  </div>
`

buildCarList(document.querySelector<HTMLDivElement>('#list')!);
