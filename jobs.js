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

// inflate freshness options
var options = [
  { value: 30, text: "Last 30 days" },
  { value: 15, text: "Last 15 days" },
  { value: 7, text: "Last 7 days" },
  { value: 3, text: "Last 3 days" },
  { value: 1, text: "Last 1 day" },
];

// get the select element for freshness
var freshness = document.getElementById("freshness");

options.forEach(function (el) {
  var option = document.createElement("option");
  option.value = el.value;
  option.textContent = el.text;

  freshness.append(option);
});


// processFilter({location:'Mumbai'});
function processFilter(filter) {
  let f_data = Jobs;
  console.log(filter)
  for(key in filter){
    if(key == 'location'){
      f_data = f_data.filter(function(el){return el.location == filter[key]})
      document.getElementById('filterKey').textContent = filter[key];
    }
    if(key=='freshness'){
      console.log('freshness');
    }
  }

  console.log(f_data);
  renderData(f_data);
}

function renderData(data) {
  // erase existing data
  jobCardsContainer.textContent = "";

  if(data.length>0){

    var today = new Date();
    data.map(function (job) {
      var card = document.createElement("div");
      card.classList.add("card");
  
      var desig = document.createElement("h4");
      desig.textContent = job.designation;
  
      var company_div = document.createElement("div");
      company_div.classList.add("med-font", "d-flex");
      var company_name = document.createElement("p");
      company_name.textContent = job.company;
  
      var rating = document.createElement("p");
      if (job.rating != undefined) {
        rating.textContent = `⭐ ${job.rating}`;
      }
  
      company_div.append(company_name, rating);
  
      var small_grey_text_div = document.createElement("div");
      small_grey_text_div.classList.add("small-grey-txt");
  
      var expsalloc = document.createElement("div");
      expsalloc.classList.add("d-flex");
  
      var experience = document.createElement("div");
      experience.style.textAlign = "";
  
      var workIcon = document.createElement("img");
      workIcon.setAttribute("src", "icons/work_icon.png");
      workIcon.style.height = "15px";
  
      experience.append(
        workIcon,
        document.createTextNode(
          ` ${job.experience.min} - ${job.experience.max} Yrs `
        )
      );
  
      var salary = document.createElement("p");
  
      if (typeof job.salary == "string") {
        salary.textContent = `₹ ${job.salary}`;
      } else {
        var max = job.salary.max.toLocaleString("en-in");
        var min = job.salary.min.toLocaleString("en-in");
  
        salary.textContent = `₹ ${min} - ${max} PA`;
      }
  
      // <span class="material-icons-outlined">location_on</span>;
      var locationIcon = document.createElement("img");
      locationIcon.setAttribute("src", "icons/location_icon.png");
      locationIcon.style.height = "14px";
  
      var location = document.createElement("div");
      var text = document.createTextNode(job.location);
      location.append(locationIcon, text);
    
  
      expsalloc.append(experience, salary, location);
      if (job.WFH) {
        var whf = document.createElement("p");
        whf.textContent = "(WFH during Covid)";
        whf.style.marginLeft = "-10px";
        whf.style.fontWeight = "700";
        expsalloc.append(whf);
      }
      small_grey_text_div.append(expsalloc);
  
      var description = document.createElement("p");
      description.innerHTML = `<i class="far fa-file-alt" aria-hidden="true"></i>  ${job.description}`;
  
      description.style.textOverflow = "elloipsis";
      small_grey_text_div.append(description);
  
      var skills = document.createElement("p");
  
      var skills_text = job.skills.join(" - ");
      skills.textContent = skills_text;
  
      small_grey_text_div.append(skills_text);
  
      // posted implementation remaining
      var div = document.createElement('div');
    
      var posted = document.createElement('p');
      var days = getNumberOfDays(
        new Date(job.postedOn),
        today
      );
      if(days == 0){
        posted.textContent = 'JUST NOW';
      }
      else if(days == 1){
        posted.innerHTML = `<i class="fa fa-history" aria-hidden="true"></i> ${days} DAY AGO`;
       
  
      }
      else{
        posted.innerHTML = `<i class="fa fa-history" aria-hidden="true"></i> ${days} DAYS AGO`;
  
      }
      posted.classList.add('posted');
      
      var save_btn = document.createElement('button');
      save_btn.classList.add('save-btn');
      save_btn.innerHTML = `<i class="far fa-star"></i> Save`;
      
      div.append(posted,save_btn);
      // div.textContent = getNumberOfDay(job.postedOn,today);
      console.log();
      card.append(desig, company_div, small_grey_text_div,div);
      jobCardsContainer.append(card);
    });
  }
  else{
    var noResult = document.createElement('div');

    var img = document.createElement('img');
    img.setAttribute(
      "src",
      "https://static.naukri.com/s/7/109/assets/images/no-result-found.4fe8713e.png"
    );
    
    img.style.height='100px';
    var h4 = document.createElement('h4');
    h4.textContent = "No result found"
    
    noResult.classList.add('d-flex');
    noResult.style.backgroundColor='white';
    noResult.append(img,h4);
    jobCardsContainer.append(noResult);
  }
}

function getNumberOfDays(date1,date2){
  // 1000ms * 60 secs * 60 mins * 24 hrs
  var oneDay = 1000*60*60*24;
//  console.log(date2,date1)
  var diffInTime = date2.getTime() - date1.getTime();

  return Math.round(diffInTime/oneDay);
}
