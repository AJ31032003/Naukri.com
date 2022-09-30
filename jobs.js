var filter = JSON.parse(localStorage.getItem("filter"));
var jobCardsContainer = document.getElementById("jobCardsContainer");
var locationFilter = document.getElementById("locationsFilter");
renderData(Jobs);

if(filter){
  processFilter(filter);
  localStorage.removeItem('filter');
}




var featured_companies = [
  { image_url: "https://img.naukri.com/fc_images/v2/18166.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/24468.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/4250870.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/74756.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/647395.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/158869.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/838417.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/574.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/1384.gif" },
  { image_url: "https://img.naukri.com/fc_images/v2/27117.gif" },
];

var comp_container = document.getElementById('company-container');
console.log(comp_container);
featured_companies.forEach(function(el){
  var img = document.createElement('img');
  img.setAttribute('src',el.image_url);

  comp_container.append(img);
})
