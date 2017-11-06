(function(w){
  
    var utilMethods = {
        "populateTable":populateTable,
        "round":round,
    };
    
    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        var outputHTML = "";

        console.log('value1: ' + value);
        console.log("#####" + Math.round(value * multiplier) / multiplier);
        multiplier = Math.round(value * multiplier) / multiplier;
        return multiplier;
        /*
        if (multiplier <= 25)
        {
           outputHTML = '<div class="score-green">' + multiplier + '</div>';
        }
        else if (multiplier > 25 && multiplier <=75)
        {
          outputHTML = '<div class="score-yellow">' + multiplier + '</div>';
        }
        else if (multiplier > 76)
        {
          outputHTML = '<div class="score-red">' + multiplier + '</div>';
        }
        else
        {
          outputHTML = '<div class="score-grey">' + multiplier + '</div>';
        }
        console.log('outputHTML=' + outputHTML);
        return outputHTML;
        */
    }
    
    function populateTable(input) {
   		if (!input) {
            console.log('input is undefined');
            input = 'No recommendations detected'
        }
        console.log('input: ', input);
        var inputArr = input.split('<br>');
        console.log('inputArr: ', inputArr);
        
        var outputHTML = "";
        
        for (var i = 0; i < inputArr.length; ++i) {
            
            var score;
            var desc;
            
            var color = 'slds-text-color--error';
            
            // cleans up the strings by removing any system field traits
            var cleanStr = inputArr[i].replace(/%/g,'').replace(/__c/g,'').replace(/_/g,' ').replace('+ ','+').replace('- ','-').trim();
            cleanStr = cleanStr.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})
            console.log("Clean String: " + cleanStr);
            
            // handle format of other smaller phrases
            if(cleanStr.indexOf('other smaller') > 0) {
                score = cleanStr.substr(0,1) + ' ' + cleanStr.substr(cleanStr.lastIndexOf(' '));
                desc = cleanStr.substr(1,cleanStr.lastIndexOf(' '));
            }
            else if(cleanStr.startsWith('From The Baseline') > 0){
                score = cleanStr.split(',')[1].replace('+','+ ').replace('-','- ').replace(' + ','+').replace(' - ','-');
                console.log('baseline score: ' + score);
                desc = cleanStr.split(',')[0]
            }
            else {
                score = cleanStr.substr(0, cleanStr.indexOf(' ')).replace('+','+ ').replace('-','- ');
                desc = cleanStr.substr(cleanStr.indexOf(' ') + 1).replace('Because','').replace('If You Change','Change');
            }
            console.log('score: ' + score);
            
            if(score.startsWith('-')){
                color = 'ac-sdd-text-color--green';
            }
            
            if(score.startsWith('N')){
				outputHTML += '<div class="slds-truncate slds-text-body--regular slds-m-vertical--xx-small slds-text-color--weak" title="'  + desc + '">' + score + ' ' + desc + '</div>'

            } else{
            	outputHTML += '<div class="slds-item--label ac-sdd-left-col slds-truncate slds-text-body--regular slds-m-vertical--xx-small ' + color + '">' + score + '</div>';
				outputHTML += '<div class="slds-item--detail ac-sdd-right-col slds-truncate slds-text-body--regular slds-m-vertical--xx-small slds-text-color--weak" title="' + desc + '">' + desc + '</div>'

            }
        }
        return outputHTML;
	}

	w.myUtil = utilMethods;
})(window);