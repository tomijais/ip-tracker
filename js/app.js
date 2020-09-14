window.addEventListener("load", function () {
  const $ip_li = document.querySelector(".ip");
  const $location_li = document.querySelector(".location");
  const $tz_li = document.querySelector(".tz");
  const $isp_li = document.querySelector(".isp");





  fetch('https://api.ipify.org?format=json')
  .then(function(response){
     return response.json()
 })
 .then(function(info){
   console.log(info);
  let $input = document.querySelector("input.search")

  $input.value = info.ip
 })





  var mymap = L.map("mapid").setView([-34.61315, -58.37723], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoidG9taWphaXMiLCJhIjoiY2tmMXVteG5uMHZ2MzJ2cGtnNmo2YTBmdyJ9.JoaiSQeAWWeAiU9Xhz07aQ",
    }
  ).addTo(mymap);






  document.querySelector("#btn").addEventListener("click", function (e) {
    e.preventDefault();

    $input = document.querySelector("input.search").value


    var api_key = 'at_234bVnXbdCOQL0aFq2igPyzRsjOZq';
    var api_url = 'https://geo.ipify.org/api/v1?';
    var domain = ($input.includes(".com") ? $input : "")
    
    if(domain != ""){
        var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + $input + domain;
    }else {
        var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + $input;
    }




fetch(url)
.then(function(response){
    return response.json()
})
.then(function(info){
  console.log(info);


  $ip_li.innerText = info.ip
  $location_li.innerText = `${info.location.city}, ${info.location.country}`
  $tz_li.innerText = `UTC ${info.location.timezone}`;
  $isp_li.innerText = info.isp

  mymap.setView([info.location.lat, info.location.lng], 13);

})



  });
});
