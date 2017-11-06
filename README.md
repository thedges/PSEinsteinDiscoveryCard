# PSEinsteinDiscoveryCard

This is a component to provide a "launcher" type app that is similar to the one at San Diego's [Get It Done](https://www.sandiego.gov/) site.  The focus of the component is 3 parts:

1. What is your "need"
2. The actions/options associated to the need you selected
3. An information page with a description line of the action/option, optional details for the action, and a button to launch to the service

The following is example screen showing the 3 pieces of this "launcher" component. The two left-hand images show the component in a normal Community template and the right-hand image is same accessed from mobile app.

![alt text](https://raw.githubusercontent.com/thedges/PSEinsteinDiscoveryCard/master/PSEinsteinDiscoveryCard.jpg "Sample Image")

This component is driven by information stored in 2 objects. Here is description of the objects:

* <b>PSLaunchNeed</b> - this is primary one to create the need drop-down list. Parameters:
  - <b>Label</b> - value used in drop down list
  - <b>Header</b> - value used in header section of step 3

* <b>PSLaunchAction</b> - this is child of above. This drive the action drop-down list based on Need selection. Parameters:
  - <b>Label</b> - value used in drop down list
  - <b>Description</b> - text to show in step 3 
  - <b>Explanation</b> - sub-text to show in step 3 in italics
  - <b>Page URL</b> - the URL to launch when the step 3 button is pressed

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
