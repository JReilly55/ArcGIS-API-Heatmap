require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {
  
  var url = "https://raw.githubusercontent.com/gbrunner/adv-programming-for-gis-and-rs/master/Web%20Development%20Module/Unit%202%20-%20ArcGIS%20JavaScript%20API/stl_crime_wgs_84.csv";

  esriConfig.request.corsEnabledServers.push('https://rawgit.com');

  const template = {
   title: "Crime committed at {ILEADSStreet}"
};      
  
 const csvLayer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Heatmap",
        copyright: "St. Louis Police Department",
		    latitudeField:"Latitude",
        longitudeField:"Longitude",
		popupTemplate: template,
});
  
          csvLayer.renderer = {
          type: "heatmap",
          colorStops: [
            { color: "rgba(168, 112, 0, 0)", ratio: 0 },
            { color: "#1AFF00", ratio: 0.2 },
            { color: "#D0E009", ratio: 0.4 },
            { color: "#F5C000", ratio: 0.6 },
            { color: "#E07600", ratio: 0.8 },
            { color: "#FF3001", ratio: 1 },
          ],
          maxPixelIntensity: 25,
          minPixelIntensity: 0
        };
  
        var map = new Map({
          basemap: "topo-vector",
          layers: [csvLayer]
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 11,
          center: [-90.1994, 38.6270] // longitude, latitude
        });
});  
