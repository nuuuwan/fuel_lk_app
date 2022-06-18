const DEFAULT_CENTER = [6.91, 79.86]; // Town Hall

export default class Geo {
  async getGeoLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (position, error) {
        if (error) {
          resolve(DEFAULT_CENTER);
        } else {
          resolve([position.coords.latitude, position.coords.longitude]);
        }
      });
    });
  }
}
