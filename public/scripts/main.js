/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
console.log(params);

/*
 * Contoh penggunaan DOM di dalam class
 * */

class App {
    constructor() {
        this.form = document.querySelector('#search-form')
        this.result = document.querySelector('search-result-div')
    }

    init() {
        this.form.addEventListener('submit',(e) => this.filterCars(e))
    }

    populateCars(cars) {
        return cars.map(car => {
            return {
                ...car,
                availableAt: new Date(car.availableAt).getTime()
            }
          })
    }

    async filterCars(e){
        e.preventDefault()
        const response = await fetch(
            "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
          );
          const body = this.populateCars(await response.json())
          const formData = new FormData(e.target)
          const tanggal = new Date(formData.get('tanggal')).getTime()

          const availableCars = body.filter(car => car.availableAt > tanggal)
          console.log(availableCars)
            this.viewSearchResult(availableCars)
    }


   viewSearchResult(cars) {
    let html = ''
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        html += `<p> ${car.type} - ${car.year} - ${car.capacity} - ${car.image} </p>`
    }
    this.result.innerHTML = html
   }
   
}

const app = new App();
app.init()


