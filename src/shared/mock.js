class Mock {
  static getTrips() {
    return JSON.parse(
      '[{"id":"hklu9tnm0hkchcermi","destination":{"city":"München","zip":"81539","country":"Germany","lat":48.1102333333333,"lon":11.5898666666667},"date":"2020-07-24T22:00:00.000Z","photo":"https://pixabay.com/get/55e2d4454252a514f6da8c7dda793f791c39dae4514c704c7c2b7fd19449c651_1280.jpg","weather":{"moonrise_ts":1595668040,"wind_cdir":"W","rh":90,"pres":945.524,"high_temp":23.8,"sunset_ts":1595703185,"ozone":318.879,"moon_phase":0.319354,"wind_gust_spd":4.11096,"snow_depth":0,"clouds":56,"ts":1595628060,"sunrise_ts":1595648355,"app_min_temp":15.5,"wind_spd":1.85525,"pop":25,"wind_cdir_full":"west","slp":1016.82,"moon_phase_lunation":0.17,"valid_date":"2020-07-25","app_max_temp":17.6,"vis":24.1349,"dewpt":14.9,"snow":0,"uv":1.57406,"weather":{"icon":"c03d","code":803,"description":"Broken clouds"},"wind_dir":271,"max_dhi":null,"clouds_hi":0,"precip":1.0625,"low_temp":13,"max_temp":23.8,"moonset_ts":1595713475,"datetime":"2020-07-25","temp":16.5,"min_temp":13,"clouds_mid":5,"clouds_low":52}},{"id":"rmevp3a16nkchci8a4","destination":{"city":"München","zip":"81539","country":"Germany","lat":48.1102333333333,"lon":11.5898666666667},"date":"2020-07-17T22:00:00.000Z","photo":"https://pixabay.com/get/55e2d4454252a514f6da8c7dda793f791c39dae4514c704c7c2b7fd1944bc558_1280.jpg","weather":{"data":[{"rh":86.2183,"pod":"d","lon":11.59,"pres":955.528,"timezone":"Europe/Berlin","ob_time":"2020-07-11 07:41","country_code":"DE","clouds":100,"ts":1594453301,"solar_rad":92.2,"state_code":"02","city_name":"Munich","wind_spd":3.25542,"wind_cdir_full":"southwest","wind_cdir":"SW","slp":1020.65,"vis":0.5,"h_angle":-45,"sunset":"19:12","dni":783.28,"dewpt":11.5,"snow":0,"uv":1.76697,"precip":7.42105,"wind_dir":218,"sunrise":"03:26","ghi":512.34,"dhi":93.52,"aqi":40,"lat":48.11,"weather":{"icon":"r03d","code":"502","description":"Heavy rain"},"datetime":"2020-07-11:07","temp":13.7,"station":"D1024","elev_angle":32.85,"app_temp":13.7}],"count":1}}]'
    );
  }

  static getTripPost() {
    return JSON.parse(
      `{"destination":{"city":"München","zip":"81539","country":"Germany","lat":48.1102333333333,"lon":11.5898666666667},"date":"2020-07-23T22:00:00.000Z","photo":"https://pixabay.com/get/55e2d4454252a514f6da8c7dda793f791c39dae4514c704c7c2b7dd69745c050_1280.jpg","weather":{"moonrise_ts":1595572232,"wind_cdir":"WSW","rh":98,"pres":940.137,"high_temp":18.2,"sunset_ts":1595616856,"ozone":325.99,"moon_phase":0.215071,"wind_gust_spd":4.64384,"snow_depth":0,"clouds":100,"ts":1595541660,"sunrise_ts":1595561814,"app_min_temp":12.5,"wind_spd":1.64614,"pop":90,"wind_cdir_full":"west-southwest","slp":1011.39,"moon_phase_lunation":0.11,"valid_date":"2020-07-24","app_max_temp":14.3,"vis":19.2242,"dewpt":13.1,"snow":0,"uv":0.814411,"weather":{"icon":"r01d","code":500,"description":"Light rain"},"wind_dir":253,"max_dhi":null,"clouds_hi":100,"precip":8.8125,"low_temp":15.3,"max_temp":14.3,"moonset_ts":1595625668,"datetime":"2020-07-24","temp":13.4,"min_temp":10.9,"clouds_mid":99,"clouds_low":86}}`
    );
  }
}

module.exports = { Mock };