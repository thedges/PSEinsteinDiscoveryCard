# PSEinsteinDiscoveryCard

This component is an enhancement some examples found in an SDO for showing Einstein Discovery results in a component on page. The original components found were "hard coded" to the object that stored the Einstein Discovery results. This component is fully generic and can be placed on any object and all parameters are configurable.

The following is example screenshot of the component showing the Einstein Discovery results in component on right-hand side.

![alt text](https://raw.githubusercontent.com/thedges/PSEinsteinDiscoveryCard/master/PSEinsteinDiscoveryCard.jpg "Sample Image")

### Pre-requisite

* Setup the Einstein Discovery writeback as defined [here](https://help.salesforce.com/articleView?id=bi_edd_wb_intro.htm&type=0)

### Hand-coding fake Einstein Discovery results

If you are going to hand enter some dummy text values in the explanation or prescription fields, please follow this format in the rich text editor. Create entry like following on separate line 

```+ 12.75 if you Close Case within 3 hours
- 7.949 if you change Offer Voucher to false
```

Make sure to have a space between the '+' or '-' sign and the number.

### This component has the following configuration properties:

* <b>Card title</b> - the title string of the card to be displayed at top
* <b>Label for outcome score</b> - the label string to display at right of outcome score
* <b>API field name for outcome score</b> - the API field name of the object field to pull the outcome score
* <b>Color range definition for red,yellow,green</b> - a range of values to determine the color of the outcome score. The string is in format like "0-25,25-75,75-100" where first range defines red, second yellow and third green.
* <b>Label for section 1</b> - the label to show at top of the first section of Einstein Discovery results
* <b>Empty msg for section 1</b> - the message to show if this data is empty
* <b>API field name for section 1</b> - the API field name of the object field to pull the Einstein Discovery analysis results. This field is rich text field that will store a value like "`+ 43.78 units because Age at Admission is 25.77 to 29.69 and Program Category is Outpatient<br>+ 11.15 units because Program Category is Outpatient<br>- 8.872 units because Secondary Substance is None<br>- 6.052 units because of other factors from the baseline`"
* <b>Label for section 2</b> - the label to show at top of the section section of Einstein Discovery results
* <b>Empty msg for section 2</b> - the message to show if this data is empty
* <b>API field name for section 2</b> - the API field name of the object field to pull the Einstein Discovery analysis results. This field is rich text field that will store a value like "`- 52.7 units if you change Program Category to Crisis<br>- 33.66 units if you change Service to Intensive Residential<br>- 32.34 units if you change Service to Residential Rehab for Youth`"

### The fields to create on the object to drive this component are:

* <b>Outcome Score</b> - a Number(16,2) field to store the outcome results
* <b>Explanation Field</b> - a Rich Text Field to store the Einstein Analytics explanation results (for Section 1 above)
* <b>Prescription Field</b> - a Rich Text Field to store the Einstein Analytics prescription results (for Section 2 above)

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
