
// filter by WFH

function filterByWFH(data){
    var res = data.filter(function(el){
        if(el.WFH != undefined && el.WFH){
            return true;
        }
    })

    return res;
}


// filter by salary range

function filterBySalary(data,obj){
    let min =  +obj.min * 10**5;
    let max = +obj.max * 10**5;

    let res = data.filter(function(el){
        // console.log(typeof el.salary);
        if(typeof el.salary != 'string'){
            console.log(el.salary.min,min,el.salary.max,max)
            console.log(el.salary.min >= min, el.salary.max <= max);
            if(el.salary.min >= min && el.salary.max <= max){
                return true;
            }
        }
        return false;
    });

    return res;
}

// filter by location
/**
 * input : data : array, location : string
 * output : array
 */

function filterByLocation(data,location){
    let res = data.filter(function(el){
        return el.location == location;
    });

    return res;
}

function filterByExperience(data,exp){
    console.log('exp',exp);
    // any condition
    if(exp == 31){
        return data;
    }

    let res = data.filter(function(el){
        
        return (exp <= el.experience.max &&  exp>= el.experience.min) ;
    })

    return res;
    
}

function filterByEducation(data,education){
    let res = data.filter(function(el){
        return el.education.includes(education);
    })

    return res;
}

function filterByFreshness(data,days){
    var today = new Date();
    var diff;
    let res = data.filter(function(el){
         diff = getNumberOfDays(new Date(el.postedOn),today);
         return diff <= days;
         //  console.log(diff,days);
    })

    return res;
}