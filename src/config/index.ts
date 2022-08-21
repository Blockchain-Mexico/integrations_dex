// Use this on production
import configFileProduction from '/Users/astrixial/WebstormProjects/untitled1/src/config/mainnet/config.json';

let configFile: any;


if (process.env.NODE_ENV === 'production') {
    configFile = configFileProduction;
}
if (process.env.NODE_ENV === 'development') {
    configFile = configFileProduction;
}

export {
    configFile,
};
