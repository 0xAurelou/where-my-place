/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import utils from './utils';

function Map({ origin, destination, lon, lat }) {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [zoom, setZoom] = useState(12);

  //You should get your API key at https://opentripmap.io
  let apiKey = '5ae2e3f221c38a28845f05b66447f16fc3298981969822996d987309';

  function apiGet(method, query) {
    return new Promise(function (resolve, reject) {
      var otmAPI =
        'https://api.opentripmap.com/0.1/en/places/' +
        method +
        '?apikey=' +
        apiKey;
      if (query !== undefined) {
        otmAPI += '&' + query;
      }
      fetch(otmAPI)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    });
  }

  //You should get your access token at https://www.mapbox.com
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXVyZWxyIiwiYSI6ImNrczBnMjhyZjA5eTUydnBlcHl5b2oyNXoifQ.g2Ap5DmNHltIErjH5YPjww';

  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: [lon, lat],
        zoom: zoom,
      });
      return; // initialize map only once
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('load', function () {
      //Stylization

      //Add pois layer to the map
      map.current.addSource('opentripmap.pois', {
        type: 'vector',
        attribution:
          '<a href="https://opentripmap.io" target="_blank">© OpenTripMap</a>',
        bounds: [-180, -85.0511, 180, 85.0511],
        minzoom: 8,
        maxzoom: 14,
        scheme: 'xyz',
        tiles: [
          'https://api.opentripmap.com/0.1/en/tiles/pois/{z}/{x}/{y}.pbf?kinds=museums&rate=2&apikey=' +
            apiKey,
        ],
      });
      map.current.addLayer(
        {
          id: 'opentripmap-pois',
          type: 'circle',
          source: 'opentripmap.pois',
          'source-layer': 'pois',
          minzoom: 8,
          paint: {
            'circle-color': 'rgb(55,144,144)',
            'circle-radius': 5,
            'circle-stroke-color': 'rgba(102,193,201, 0.6)',
            'circle-stroke-width': 0.6,
          },
        },
        'airport-label',
      );

      //Add heat layer to the map
      map.current.addSource('opentripmap.heat', {
        type: 'vector',
        bounds: [-180, -85.0511, 180, 85.0511],
        minzoom: 1,
        maxzoom: 8,
        scheme: 'xyz',
        tiles: [
          'https://api.opentripmap.com/0.1/en/tiles/heat/{z}/{x}/{y}.pbf?kinds=museums&rate=2&apikey=' +
            apiKey,
        ],
      });
      map.current.addLayer(
        {
          id: 'opentripmap-heat',
          type: 'heatmap',
          source: 'opentripmap.heat',
          'source-layer': 'heat',
          minzoom: 1,
          maxzoom: 10,
          filter: ['all'],
          paint: {
            'heatmap-radius': {
              stops: [
                [1, 4],
                [10, 20],
              ],
            },
            'heatmap-weight': ['get', 'n'],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              0.1,
              'rgb(210,180,160)',
              0.2,
              'rgb(255,221,149)',
              0.6,
              'rgb(253,104,96)',
            ],
            'heatmap-intensity': {
              stops: [
                [3, 0.1],
                [8, 0.8],
              ],
            },
            'heatmap-opacity': {
              stops: [
                [1, 0.9],
                [8, 0.3],
              ],
            },
          },
        },
        'opentripmap-pois',
      );

      let language = 'fr';

      map.current.getStyle().layers.forEach((layer) => {
        if (layer.id.endsWith('-label')) {
          map.current.setLayoutProperty(layer.id, 'text-field', [
            'coalesce',
            ['get', 'name_' + language],
            ['get', 'name'],
          ]);
        }
      });
    });

    //Show information by click

    function onShowPOI(data, lngLat) {
      let poi = document.createElement('div');
      poi.innerHTML = '<h2>' + data.name + '<h2>';
      poi.innerHTML +=
        '<p><i>' + utils.getCategoryName(data.kinds) + '</i></p>';
      if (data.preview) {
        poi.innerHTML += "<img src='" + data.preview.source + "'>";
      }
      poi.innerHTML += data.wikipedia_extracts
        ? '<div id="translated">Loading...</div>'
        : data.info
        ? data.info.descr
        : 'No description';
      if (data.wikipedia_extracts) {
        utils.translateToFr(data.wikipedia_extracts.html);
      }

      poi.innerHTML +=
        "<p><a target='_blank' href='" +
        data.otm +
        "'>Show more at OpenTripMap</a></p>";

      new mapboxgl.Popup()
        .setLngLat(lngLat)
        .setDOMContent(poi)
        .addTo(map.current);
    }

    map.current.on('click', 'opentripmap-pois', function (e) {
      let coordinates = e.features[0].geometry.coordinates.slice();
      let id = e.features[0].properties.id;
      let name = e.features[0].properties.name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      apiGet('xid/' + id).then((data) => onShowPOI(data, e.lngLat));
    });

    //Show popup by mousemove

    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.current.on('mouseenter', 'opentripmap-pois', function (e) {
      map.current.getCanvas().style.cursor = 'pointer';

      let coordinates = e.features[0].geometry.coordinates.slice();
      let id = e.features[0].properties.id;
      let name = e.features[0].properties.name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup
        .setLngLat(coordinates)
        .setHTML('<strong>' + name + '</strong>')
        .addTo(map.current);
    });

    map.current.on('mouseleave', 'opentripmap-pois', function () {
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    });
  });

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default Map;
