// zoom to madrid ( Map.setCenter(lon, lat, zoom))
Map.setCenter(-3.7038, 40.4168, 11);

// load daytime surface temperature data 
var temp_day = 
  ee.ImageCollection("Oxford/MAP/LST_Day_5km_Monthly") // image collection ID 
  .filter(ee.Filter.calendarRange(6,8,'month')) // filter images in january, february and march
  .select('Mean') // select the band 'Mean'
  .mean(); // calculate the mean of all selected images
  
// add daytime surface temperature to map 
Map.addLayer(temp_day, // eeObject: object to add to the map 
            {
              // visualization parameters 
              min:30, 
              max:39, 
              opacity:.3, 
              palette:['00FF00','FFFF00','FF0000']
              
            }, 
            // name of layer 
            'Daytime Surface Temperature');
            
// load the image of the built-up area
var builtup = 
  ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1") // image collection 1D
    .select('cnfd') // select the band 'cnfd': confidence of builtup [0-255]
    .divide(255) // normalize the value 
    .focalMean(5000, 'circle', 'meters') // calculate mean value in 5km circle 

Map.addLayer(builtup, // eeObject
            {max:1, min:0, opacity:.5, palette:['CAF0F8','00B4D8','03045E']}, // visParams
            'Builtup'); // name
  
// mean values of the two layers within each shape 
var temp1 = temp_day.reduceRegion(ee.Reducer.mean(), zone1, 1000);
var temp2 = temp_day.reduceRegion(ee.Reducer.mean(), zone2, 1000);
var temp3 = temp_day.reduceRegion(ee.Reducer.mean(), zone3, 1000);
var temp4 = temp_day.reduceRegion(ee.Reducer.mean(), zone4, 1000);
var temp5 = temp_day.reduceRegion(ee.Reducer.mean(), zone5, 1000);
print('Temperature Zone 1:', temp1.get('Mean')); 
print('Temperature Zone 2:', temp2.get('Mean'));
print('Temperature Zone 3:', temp3.get('Mean'));
print('Temperature Zone 4:', temp4.get('Mean'));
print('Temperature Zone 5:', temp5.get('Mean'));

var builtup1 = builtup.reduceRegion(ee.Reducer.mean(), zone1, 1000);
var builtup2 = builtup.reduceRegion(ee.Reducer.mean(), zone2, 1000);
var builtup3 = builtup.reduceRegion(ee.Reducer.mean(), zone3, 1000);
var builtup4 = builtup.reduceRegion(ee.Reducer.mean(), zone4, 1000);
var builtup5 = builtup.reduceRegion(ee.Reducer.mean(), zone5, 1000);
print('Builtup Zone 1:', builtup1.get('cnfd'));
print('Builtup Zone 2:', builtup2.get('cnfd'));
print('Builtup Zone 3:', builtup3.get('cnfd'));
print('Builtup Zone 4:', builtup4.get('cnfd'));
print('Builtup Zone 5:', builtup5.get('cnfd'));
