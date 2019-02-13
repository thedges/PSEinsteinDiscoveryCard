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
                
                var outcome = helper.round(resp.data.outcomeField, 1);
                var unit = component.get('v.outcomeUnit');
                var outcomeColor = component.get('v.outcomeColor').trim().split('|');
                var section1Color = component.get('v.section1Color').trim().split('|');
                var section2Color = component.get('v.section2Color').trim().split('|');
                var pass = 1;
                var color = helper.getColor(outcome, outcomeColor);
                /*
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
                */
                
                //$('#score').html('<div class="' + color + '">' + outcome + '</div>');
                var globalIdSel = '#' + globalId;
                console.log('globalIdSel=' + globalIdSel);
                console.log('element=' + document.getElementById(globalId + '_score').innerHtml);
                console.log('jquery=' + $('#' + globalId + '_score'));
                
                if (component.get('v.outcomeUnitBefore'))
                {
                  document.getElementById(globalId + '_score').innerHTML = '<div class="' + color + '">' + (unit == null ? '' : unit) + (component.get('v.outcomeUnitSpace') ? ' ': '') + outcome + '</div>';
                }
                else
                {
                  document.getElementById(globalId + '_score').innerHTML = '<div class="' + color + '">' + outcome + (component.get('v.outcomeUnitSpace') ? ' ': '') + (unit == null ? '' : unit) + '</div>';
                }
                
                if (resp.data.section1Field != undefined)
                {
                  var fieldData = resp.data.section1Field.replace(/<p>/gi, "").replace(/<\/p>/gi, '<br>').replace(/\n/gi, '<br>');
                    document.getElementById(globalId + '_section1').innerHTML = helper.populateTable(fieldData,{ ranges: section1Color, unit: '', space: component.get('v.outcomeUnitSpace'), limit: component.get('v.section1Limit') });
                  //$('#section1').html(myUtil.populateTable(fieldData));
                  //$('#section1').html(myUtil.populateTable(resp.data.section1Field));
                }
                else {
                  document.getElementById(globalId + '_section1').innerHTML = component.get("v.section1EmptyMsg");
                }
                
                if (resp.data.section2Field != undefined)
                {
                  var fieldData = resp.data.section2Field.replace(/<p>/gi, "").replace(/<\/p>/gi, '<br>').replace(/\n/gi, '<br>');
                  document.getElementById(globalId + '_section2').innerHTML = helper.populateTable(fieldData,{ ranges: section2Color, unit: '', space: component.get('v.outcomeUnitSpace'), limit: component.get('v.section2Limit') });
                  //$('#section2').html(myUtil.populateTable(fieldData));
                  //$('#section2').html(myUtil.populateTable(resp.data.section2Field));
                }
                else {
                  document.getElementById(globalId + '_section1').innerHTML = component.get("v.section2EmptyMsg");
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