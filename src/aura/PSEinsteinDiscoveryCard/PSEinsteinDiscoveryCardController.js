({
    doInit: function(component, event, helper) {
        var recid = component.get("v.recordId");
        console.log("program data id: " + recid);

        var action = component.get("c.getEDInfo");
        
        var paramMap = {};
            paramMap['recId'] = recid;
            paramMap['outcomeField'] = component.get("v.outcomeField");
            if (component.get("v.section1Field") != null) 
            {
                paramMap['section1Field'] = component.get("v.section1Field");
            }
            if (component.get("v.section2Field") != null) 
            {
              paramMap['section2Field'] = component.get("v.section2Field");
            }

            action.setParams({
                "params": JSON.stringify(paramMap)
            });

        
        action.setCallback(component, function(response) {
            var resp = JSON.parse(response.getReturnValue());
            var globalId = component.getGlobalId();
            
            if (resp.status === 'ERROR') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": resp.msg,
                    "mode": "sticky",
                    "type": "error"
                });
                toastEvent.fire();
            } else {
                $('.slds-card__header slds-grid').hide();
                
                var outcome = myUtil.round(resp.data.outcomeField, 1);
                var ranges = component.get('v.outcomeColor').trim().split('|');
                var pass = 1;
                var color = 'score-grey';
                for (var i=0; i<ranges.length; i++)
                {
                  console.log('range='+ranges[i]);
                  var tmpStr = ranges[i].split(',');
                  var lower = parseInt(tmpStr[0].trim());
                  var upper = parseInt(tmpStr[1].trim());
                  
                  if (pass == 1)
                  {
                    if (outcome >= lower && outcome <= upper )
                    {
                      color = 'score-red';
                      break;
                    }
                  }
                  else
                  {
                    if (outcome > lower && outcome <= upper )
                    {
                      if (pass == 2) color = 'score-yellow';
                      if (pass == 3) color = 'score-green';
                      break;
                    }
                  }
                  pass++;
                }
                
                //$('#score').html('<div class="' + color + '">' + outcome + '</div>');
                document.getElementById(globalId + '_score').innerHTML = '<div class="' + color + '">' + outcome + '</div>';
                
                if (resp.data.section1Field != undefined)
                {
                  var fieldData = resp.data.section1Field.replace(/<p>/gi, "").replace(/<\/p>/gi, '<br>');
                  document.getElementById(globalId + '_section1').innerHTML = myUtil.populateTable(fieldData);
                  //$('#section1').html(myUtil.populateTable(fieldData));
                  //$('#section1').html(myUtil.populateTable(resp.data.section1Field));
                }
                
                if (resp.data.section2Field != undefined)
                {
                  var fieldData = resp.data.section2Field.replace(/<p>/gi, "").replace(/<\/p>/gi, '<br>');
                  document.getElementById(globalId + '_section2').innerHTML = myUtil.populateTable(fieldData);
                  //$('#section2').html(myUtil.populateTable(fieldData));
                  //$('#section2').html(myUtil.populateTable(resp.data.section2Field));
                }

            }
        });
        $A.enqueueAction(action);
    },
    refresh: function(component, event, helper) {
        var action = component.get('c.getEDInfo');
        action.setCallback(component,
            function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    $A.get('e.force:refreshView').fire();
                } else {
                    //do something
                }
            }
        );
        $A.enqueueAction(action);
    }
})