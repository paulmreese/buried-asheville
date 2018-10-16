class SquareHelper {
  static baseUrl() {
    return 'https://api.foursquare.com/v2'
  }

  /*To automatically produce the right formatted date for Square API calls
  https://stackoverflow.com/a/23593099/10443170*/
  static formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  }

  static auth() {
    const keys = {
      client_id : '0LL3ATVAACO01CERHPAYO3CC3EGJVKHFM0LX42XT4VCIC0NS',
      client_secret : '2OV1BZZS4HMHQARQRPHU0PBEB4LUYM2I0TXZQKRS2NWMRLO1',
      v : SquareHelper.formatDate(Date.now())
    }
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join('&')
  }

  static urlBuilder(urlParams) {
    if (!urlParams) {
      return ''
    }

    return Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
  }

  static headers() {
    return {
      Accept : 'application/json'
    }
  }

  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method,
      headers : SquareHelper.headers()
    }

    return fetch(`${SquareHelper.baseUrl()}${endPoint}?${SquareHelper.auth()}&` +
    `${SquareHelper.urlBuilder(urlParams)}`, requestData)
    .then(res => res.json()).catch(
      SquareHelper.hasError = true
    )

  }
}

SquareHelper.hasError = false;

export default class SquareAPI {
  static search(urlParams) {
    return SquareHelper.simpleFetch('/venues/search', 'GET', urlParams)
  }
  static getVenuePhotos(VENUE_ID) {
    return SquareHelper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET')
  }
  static getErrorStatus() {
    return SquareHelper.hasError
  }
}
