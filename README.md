# Open-Source-Geospatial-Ecosystem
Exploring open source geospatial solutions in the BC Government 



# App deployment

This application is deployed to OpenShift using Helm Charts.
Where ever possible, the work has been based on existing examples from within BC Government. [bcgov/quickstart-openshift](https://github.com/bcgov/quickstart-openshift) Provides github actions and helm charts.

This may not be a textbook usage of quickstart-openshift. Not all components are used and the deployment configuration may change significantly.

## Actions
| Triggers | Action |
|--------|----------|
| pr-open | create a deployment in dev |
| pr-close | delete the deployment from dev
| merge | creates deployments in test & prod |

These actions use .deployer to deploy to Openshift.

## Charts

### Backend
Creates a deployment and associated route and service.

## Resources

[bcgov/quickstart-openshift](https://github.com/bcgov/quickstart-openshift)