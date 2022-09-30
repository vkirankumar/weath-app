import React, { SyntheticEvent, useState } from 'react';
import './App.css';
import { ApiMethods, DataSourceType, Location, Theme } from './common/types';
import { getLocalStorage, MyAppContext, setLocalStorage, translateSearchLocationData } from './common/utils';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import Widget from './components/Widget';
import { getData, getConfig } from './service/data-services';


const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

const App = () => {

  useConstructor(async () => {
    await getConfig();
    const {theme, locations, dataSourceType} = getLocalStorage();
     setTheme(theme);
     setLocations(locations);
     setDataSourceType(dataSourceType);
  });

  const [theme, setTheme] = useState<Theme>(Theme.light);

  const [locations, setLocations] = useState<Location[]>([]);

  const [options, setOptions] = useState<Location[]>([]);

  const [dataSourceType, setDataSourceType] = useState<DataSourceType>(DataSourceType.WEATHER_API);
 
  const removeLocation = (location: Location): void => {
    const filteredLocations:Location[] = locations.filter((loc : Location) => {
      return (location.id !== loc.id);
    });
    setLocations([...filteredLocations]);
    setLocalStorage({theme, dataSourceType, locations: filteredLocations});
  }

  const onChangeLocation = (event: SyntheticEvent, value: any) => {
    value && value.hasOwnProperty("name") ?
      setLocations([{...value}, ...locations ]) :
        setOptions([]);
    setLocalStorage({theme, dataSourceType, locations: [{...value}, ...locations ]});
  }

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (searchString.length > 2 && dataSourceType) {
      getData(dataSourceType, searchString, ApiMethods.SEARCH)
      .then(response => {
        if(response.status === 200) {
          const loc = translateSearchLocationData(response.data);
          setOptions([...loc]);
        } else {
          throw new Error("Invalid location");
        }
      })
      .catch(error => {
        throw error;
      });  
    }    
  } 

  return (
    <MyAppContext.Provider value={{theme, locations, dataSourceType, removeLocation}}>
      <div data-testid="app-widget-root" className={`root-container ${theme === Theme.light ? "root-light"
                  : "root-dark"}`}>
        { /* Header container */ }
          <div className="header-container">
            <div className="title-container">
              <span className={`title-text title-text-light`}>Weath-APP</span>
            </div>
            <div className="help-container">
              <Switch data-testid="mode-switch" checked={theme === Theme.dark} 
                color="warning" onChange={() => {
                  setTheme((theme === Theme.light) ? Theme.dark : Theme.light);
                  const newTheme: Theme = (theme === Theme.light) ? Theme.dark : Theme.light;                  
                  setLocalStorage({theme: newTheme, dataSourceType, locations});
                }}/>
                <Autocomplete
                    freeSolo
                    onChange={onChangeLocation}
                    options= {options}
                    sx= {{ width: 280 }}
                    renderInput= {
                      (params) => 
                      <TextField data-testid="location-search-field" 
                        {...params} variant="standard"
                        label="Search by city or place"
                        onChange={onTextChange}/>}
                  />
            </div>
          </div>
        { /* Widget container */ }
        <div data-testid="widget-container" className="widget-container">
          {
            locations.map((location: Location) => {
              return <Widget key={location.id} widgetLocation={location}></Widget>
            })
          }
        </div>
      </div>
    </MyAppContext.Provider>
  );
}

export default App;
