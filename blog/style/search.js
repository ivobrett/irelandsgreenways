'use strict';
/* global instantsearch */


var search = instantsearch({
  appId: 'latency',
  apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  indexName: 'airbnb'
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    placeholder: 'Where are you going?'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate =
  '<div class="hit col-sm-4">' +
  '<div class="pictures-wrapper">' +
    '<div class="{{featured_flag}}"><span>FEATURED</span></div>' +
    '<a href="{{medium_url}}"><img class="picture" src="{{picture_url}}" /></a>' +
    '<img class="profile" src="{{user.user.thumbnail_url}}" />' +
  '</div>' +
  '<div class="infos">' +
  '<a href="{{medium_url}}"><h4 class="media-heading">{{hit_number}} . {{{_highlightResult.name.value}}}</h4></a>' +
//  '<p>{{room_type}} - {{{_highlightResult.city.value}}}, {{{_highlightResult.country.value}}}</p>' +
  '<p>{{room_type}}</p>' +
  '</div>' +
  '</div>';

var noResultsTemplate = '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 15,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    scrollTo: '#results',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#room_types',
    attributeName: 'room_type',
    operator: 'or',
    cssClasses: {item: ['col-sm-3']},
    limit: 10
  })
);

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price',
    attributeName: 'price',
    pips: false,
    tooltips: {format: function(formattedValue, rawValue) {return '$' + parseInt(formattedValue)}}
  })
  );

function prepareMarkerData(hit, index, hits) {
  var newindex = "";
  if (index<10) newindex = (index+1).toString();
  return {
    label: newindex,
    title: hit.room_type + "\r\n" + hit.address
  }
}

search.addWidget(
  instantsearch.widgets.googleMaps({
    container: document.querySelector('#map'),
    refineOnMapInteraction: true,
    prepareMarkerData: prepareMarkerData
  })
);

//search.addWidget(
//  instantsearch.widgets.googleMaps({
//    container: document.querySelector('#map')
//  })
//);

search.addWidget(
  instantsearch.widgets.numericSelector({
    container: '#guests',
    attributeName: 'greenway',
    operator: '>=',
    options: [
      { label: 'All Counties', value: 1 },
      { label: 'Dublin', value: 2 },
      { label: 'Kildare/Meath', value: 3 },
      { label: 'Westmeath', value: 4 },
      { label: 'Longford', value: 5 },
      { label: 'Roscommon', value: 6 },
      { label: 'Galway', value: 7 }
    ]
  })
);

search.client._useCache = false;
search.start();
