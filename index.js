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
                const term = await leerInput('Ciudad: ');

                //Search places
                const places = await search.city(term);

                // Select place
                const idSelected = await listPlaces(places);
                
                if(idSelected === '0') continue;
                
                const placeSelected = places.find(place => place.id === idSelected)

                //Save on db
                search.addHistory( placeSelected.name );


                //Weather
                const weather = await search.placeWeather(placeSelected.lat, placeSelected.lng);

                //Show results
                console.clear();
                console.log('\nInformacion de la ciudad'.green)
                console.log('Ciudad:', placeSelected.name.green);
                console.log('Lat:', placeSelected.lat);
                console.log('Lng:', placeSelected.lng);
                console.log('Temperatura:', weather.temp);
                console.log('Minima:', weather.min);
                console.log('Maxima:', weather.max);
                console.log('Clima actual:', weather.desc.green);

                break;

            case 2:
                search.capitalizeHistory.forEach( (place, i) => {
                    const idx = ` ${i + 1}.`.green;
                    console.log(`${idx} ${place}`)
                })
                break;


            default:
                break;
        }

        await pausa();

    } while (opt != 0);



}


main();