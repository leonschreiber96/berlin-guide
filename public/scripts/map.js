
async function createMap(pois)
{
   var map = L.map('map', { scrollWheelZoom: true, zoomControl: false, attributionControl: false }).setView([52.5306, 13.383], 10);
	
   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
   
   var barIcon = L.icon({ iconUrl: 'assets/icons/bar.png', iconSize: [18, 18], iconAnchor: [9, 30], popupAnchor: [0, -20], className: 'map-icon' });
   var restaurantIcon = L.icon({ iconUrl: 'assets/icons/restaurant.png', iconSize: [18, 18], iconAnchor: [9, 30], popupAnchor: [0, -20], className: 'map-icon' });
   var locationIcon = L.icon({ iconUrl: 'assets/icons/location.png', iconSize: [18, 18], iconAnchor: [9, 30], popupAnchor: [0, -20], className: 'map-icon' });

   for (const poi of pois) {
      const {lat, lon} = await getAddressDetails(poi.location);
      const icon = {
         bar: barIcon,
         restaurant: restaurantIcon,
      }[poi.category.toLowerCase()] || locationIcon;
      const marker = L.marker([lat, lon], { icon: icon, keyboard:false, riseOnHover:true }).addTo(map);
      marker.bindPopup(`<b>${poi.name}</b><br>${poi.category}<br><a href="/poi/${poi.id}">Trail Page</a>`);
   }
   
   return map;
	

   /* Example code for a polygon on the map */
	// var zone1 = L.polygon([
	// [51.947688, 1.285374],
	// [51.946912, 1.286758],
	// [51.947585, 1.288088],
	// [51.948474, 1.287192] ],
	// { color: 'purple', fillColor: '#ff0000', fillOpacity: 0.15}).addTo(map);
	
	var RedMarkerIcon = L.icon({ iconUrl: 'redmarkericon.png', iconSize: [18, 30], iconAnchor: [9, 30], popupAnchor: [0, -20] });
	var GreenMarkerIcon = L.icon({ iconUrl: 'greenmarkericon.png', iconSize: [18, 30], iconAnchor: [9, 30], popupAnchor: [0, -20], });
	var BlueMarkerIcon = L.icon({ iconUrl: 'bluemarkericon.png', iconSize: [18, 30], iconAnchor: [9, 30], popupAnchor: [0, -20], });
	var YellowMarkerIcon = L.icon({ iconUrl: 'yellowmarkericon.png', iconSize: [18, 30], iconAnchor: [9, 30], popupAnchor: [0, -20], });	
	var PurpleMarkerIcon = L.icon({ iconUrl: 'purplemarkericon.png', iconSize: [18, 30], iconAnchor: [9, 30], popupAnchor: [0, -20]	});
	
	/* mark the Red Zone pubs */
	var Almamarker = L.marker([51.94749, 1.28633], { icon: RedMarkerIcon }).addTo(map);
	Almamarker.bindPopup("<b>The Alma</b><br>Pub (open)<br><a href='alma.html'>Trail Page</a>");
	var Globemarker = L.marker([51.94797, 1.28734], { icon: RedMarkerIcon }).addTo(map);
	Globemarker.bindPopup("<b>The Globe</b><br>Pub (open)<br><a href='globe.html'>Trail Page</a>");
	var Angelmarker = L.marker([51.94819, 1.28709], { icon: RedMarkerIcon }).addTo(map);
	Angelmarker.bindPopup("<b>The Angel</b><br>Pub (closed)<br><a href='angel.html'>Trail Page</a>");
	var Halfmoonmarker = L.marker([51.94731, 1.28725], { icon: RedMarkerIcon }).addTo(map);
	Halfmoonmarker.bindPopup("<b>The Half Moon</b><br>Pub (closed)<br><a href='halfmoon.html'>Trail Page</a>");
	var Swanmarker = L.marker([51.94715, 1.28667], { icon: RedMarkerIcon }).addTo(map);
	Swanmarker.bindPopup("<b>The New Swan</b><br>Pub (closed)<br><a href='swan.html'>Trail Page</a>");
	/* mark the Green Zone pubs */
	var Dukesheadmarker = L.marker([51.94636, 1.28731], { icon: GreenMarkerIcon }).addTo(map);
	Dukesheadmarker.bindPopup("<b>The Duke's Head</b><br>Pub (closed)<br><a href='dukeshead.html'>Trail Page</a>");
	var Pepysmarker = L.marker([51.94684, 1.28629], { icon: GreenMarkerIcon }).addTo(map);
	Pepysmarker.bindPopup("<b>Sam's Wine Bar</b><br>Wine Bar & Restaurant (open)<br><a href='pepys.html'>Trail Page</a>");
	var Stingraymarker = L.marker([51.94631, 1.28774], { icon: GreenMarkerIcon }).addTo(map);
	Stingraymarker.bindPopup("<b>The Stingray</b><br>Pub (open)<br><a href='stingray.html'>Trail Page</a>");
	var Threecupsmarker = L.marker([51.94596, 1.28823], { icon: GreenMarkerIcon }).addTo(map);
	Threecupsmarker.bindPopup("<b>The Three Cups</b><br>Pub (closed)<br><a href='threecups.html'>Trail Page</a>");	
	/* mark the Blue Zone Pubs */
	var Britishflagmarker = L.marker([51.94606, 1.28694], { icon: BlueMarkerIcon }).addTo(map);
	Britishflagmarker.bindPopup("<b>The British Flag</b><br>Pub (open)<br><a href='britishflag.html'>Trail Page</a>");
	var Packetmarker = L.marker([51.94662, 1.28599], { icon: BlueMarkerIcon }).addTo(map);
	Packetmarker.bindPopup("<b>The Packet Inn</b><br>Pub (closed)<br><a href='packet.html'>Trail Page</a>");
	var Shakersmarker = L.marker([51.9453, 1.28766], { icon: BlueMarkerIcon }).addTo(map);
	Shakersmarker.bindPopup("<b>Shakers Bar</b><br>Pub (open)<br><a href='shakers.html'>Trail Page</a>");
	var Billymarker = L.marker([51.94559, 1.28767], { icon: BlueMarkerIcon }).addTo(map);
	Billymarker.bindPopup("<b>The Billy</b><br>Pub (closed)<br><a href='billy.html'>Trail Page</a>");
	/* mark the Yellow Zone Pubs */
	var Coachandhorsesmarker = L.marker([51.94516, 1.28874], { icon: YellowMarkerIcon }).addTo(map);
	Coachandhorsesmarker.bindPopup("<b>The Coach &amp; Horses</b><br>Pub (closed)<br><a href='coachandhorses.html'>Trail Page</a>");
	var Forestersmarker = L.marker([51.94548, 1.28855], { icon: YellowMarkerIcon }).addTo(map);
	Forestersmarker.bindPopup("<b>The Foresters Arms</b><br>Pub (closed)<br><a href='foresters.html'>Trail Page</a>");
	var Hanovermarker = L.marker([51.94551, 1.28874], { icon: YellowMarkerIcon }).addTo(map);
	Hanovermarker.bindPopup("<b>The Hanover Inn</b><br>Pub (open)<br><a href='hanover.html'>Trail Page</a>");	
	var Spreadeaglemarker = L.marker([51.94518, 1.28827], { icon: YellowMarkerIcon }).addTo(map);
	Spreadeaglemarker.bindPopup("<b>The Spread Eagle</b><br>Pub (closed)<br><a href='spreadeagle.html'>Trail Page</a>");		
		
	/* mark the Purple Zone Pubs */
	var Kingsheadmarker = L.marker([51.94687, 1.28804], { icon: PurpleMarkerIcon }).addTo(map);
	Kingsheadmarker.bindPopup("<b>The King's Head</b><br>Pub (closed)<br><a href='kingshead.html'>Trail Page</a>");
	var Newbellmarker = L.marker([51.94716, 1.28879], { icon: PurpleMarkerIcon }).addTo(map);
	Newbellmarker.bindPopup("<b>The New Bell</b><br>Pub (open)<br><a href='newbell.html'>Trail Page</a>");
	var Wellingtonmarker = L.marker([51.94711, 1.28812], { icon: PurpleMarkerIcon }).addTo(map);
	Wellingtonmarker.bindPopup("<b>The Wellington</b><br>Pub (closed)<br><a href='wellington.html'>Trail Page</a>");
	
	map.on('click', zoomToggle);
	function zoomToggle()
	{	if (map.scrollWheelZoom.enabled())
		{	map.scrollWheelZoom.disable();
		}
		else
		{   map.scrollWheelZoom.enable();
		}
	}
	/* var popup = L.popup();
	function onMapClick(e) {
		popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
	}
	map.on('click', onMapClick); */	
	
}