require('dotenv').config()



const { leerInput, inquireMenu, pausa, listPlaces, } = require('./helpers/inquirer');
const Search = require('./models/search');




const main = async () => {

    const search = new Search();
    let opt;

    do {

        opt = await inquireMenu()

        switch (opt) {
            case 1:
                //Show message
                const term =  await leerInput('Ciudad: ');

                //Search places
                const places = await search.city( term );
                
                // Select place
                const idSelected = await listPlaces(places);
                const placeSelected = places.find( place => place.id === idSelected )

                //Weather
                const weather = await search.placeWeather(placeSelected.lat, placeSelected.lng);

                //Show results
                console.clear();
                console.log('\nInformacion de la ciudad'.green)
                console.log('Ciudad:', placeSelected.name.green );
                console.log('Lat:', placeSelected.lat);
                console.log('Lng:',placeSelected.lng);
                console.log('Temperatura:',weather.temp);
                console.log('Minima:', weather.min);
                console.log('Maxima:', weather.max);
                console.log('Clima actual:', weather.desc.green);

                break;

            default:
                break;
        }

        await pausa();

    } while (opt != 0);



}


main();