document.querySelector("form").addEventListener("click", processActiveFilters);

function processActiveFilters() {
    
  var filt_data = Jobs.map(function(el){return el});
  var activeCBs = document.querySelectorAll('input[type="checkbox"]:checked');
  var freshness = +(document.getElementById('freshness').value);
//   console.log(freshness);
  
  var experience = +(document.getElementById("experience").value);
  var exp_value = document.getElementById('exp-value')

  if(experience == 31){
      exp_value.textContent = 'Any';
  }
  else{
      exp_value.textContent = experience;
  }
  var activeSalaryCBs = [...activeCBs].filter(function (el) {
    return el.name == "salary";
  });
  var activeEducationCBs = [...activeCBs].filter(function (el) {
    return el.name == "education";
  });
  var activeLocationCBs = [...activeCBs].filter(function (el) {
    return el.name == "location";
  });
  
  var wfh = [...activeCBs].filter(function (el) {
    return el.name == "wfh";
  });

  console.log(activeLocationCBs);

if(freshness != -1){
    filt_data = filterByFreshness(filt_data,freshness);
}  
if(experience !=31 && experience<=30 ){
    filt_data = filterByExperience(filt_data,experience);
}
if(activeEducationCBs.length > 0){
    let tmp = [];
    for(cb of activeEducationCBs){
        console.log(cb.value);
        res = filterByEducation(filt_data,cb.value);
        tmp.push(...res);
    }
    filt_data = tmp;
}

if(activeLocationCBs.length>0){
    let tmp = [];
    for (cb of activeLocationCBs){
        res = filterByLocation(filt_data,cb.value);
        tmp.push(...res);
    }
    filt_data = tmp;
}

if(activeSalaryCBs.length > 0){
      let tmp = [];
      for(cb of activeSalaryCBs){
          res = filterBySalary(filt_data,JSON.parse(cb.value));
          tmp.push(...res);
      }
      filt_data = tmp;
    }
    
    if(wfh.length > 0)
    filt_data = filterByWFH(filt_data);
    
    
  // remove  duplicates, the in which data is filtered will produce duplicate entries when certain conditions are met

  filt_data = removeDuplicates(filt_data,'id');
  renderData(filt_data);
}

function removeDuplicates(array,key){
  let tmpObj = {};
  let unique = [];
  for( let i=0;i<array.length;i++){
    if(tmpObj[array[i][key]] == undefined){
      tmpObj[array[i][key]] = true;
      unique.push(array[i]);
    }
  }
  return unique;
}