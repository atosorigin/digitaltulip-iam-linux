Scripts in here will be copied to openidm/scripts directory


For contractor sample app, run a recon to create users:

curl -u "openidm-admin:openidm-admin" -X POST "http://localhost:9080/openidm/recon?_action=recon&mapping=systemXmlfileAccounts_managedUser"

