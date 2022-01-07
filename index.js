
const { leerInput, inquireMenu, pausa } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async () => {

    const search = new Search();
    let opt;

    do {

        opt = await inquireMenu()

        switch (opt) {
            case 1:
                //Show message
                const place =  await leerInput('Ciudad: ');
                console.log(place);
                //Select place

                //Weather

                //Show results
                console.log('\nInformacion de la ciudad'.green)
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');

                break;
            default:
                break;
        }

        await pausa();

    } while (opt != 0);



}


main();