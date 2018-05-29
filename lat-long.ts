import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
selector: 'app-school-dashboard',
templateUrl: './school.component.html',
styleUrls: ['./school.component.css'],
})
export class SchoolComponent {

debugger;
msg = 'welcome School';
mapdistance: any;
byroaddistance: any;
byroadtime: any;
withoutroaddistance: any;
location: any;
fromaddress: any;
toaddress: any;
_lat1= 15.2993265; // Goa
_lon1= 74.12399599999999;
_lat2= 28.5355161; // Delhi
_lon2= 77.3910265;
constructor( private http: HttpClient) {
this._getDistanceFromLatLonInKm();
}
_getDistanceFromLatLonInKm() {
const lat1 = this._lat1;
const lon1 = this._lon1;
const lat2 = this._lat2;
const lon2 = this._lon2;

/*This is count by Radius of the earth*/
const R = 6371; // Radius of the earth in kilometers
const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
const dLon = this.deg2rad(lon2 - lon1);
const a =
Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
Math.sin(dLon / 2) * Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
const d = R * c; // Distance in KM
this.withoutroaddistance = d;
const googlekey = 'googleapikey';
const origins = lat1 + ',' + lon1;
const destinations = lat2 + ',' + lon2;
/*End here*/

/*This is count by road map of the earth*/
this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='
+ origins + '&destinations=' + destinations + '&key=' + googlekey +'').
subscribe(res => {
this.mapdistance = res;
this.byroaddistance =this.mapdistance.rows[0].elements[0].distance.text;
this.byroadtime =this.mapdistance.rows[0].elements[0].duration.text;
});
/*End here*/

}

deg2rad(deg) {
return deg * (Math.PI / 180);
}

getlatlng(address, type) {
 this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
address).subscribe(res => {
this.location = res;
const addres = this.location.results[0].formatted_address;
const lat = this.location.results[0].geometry.location.lat;
const lng = this.location.results[0].geometry.location.lng;
this.setlocationOnMap(addres, lat, lng, type);
}, err => {
console.log(err);
});
}

setlocationOnMap(address, lat , lng, type) {
if (type === 'frm') {
this.fromaddress = address;
this._lat1 = lat;
this._lon1 = lng;
} else {
this.toaddress = address;
this._lat2 = lat;
this._lon2 = lng;
}
}


}
