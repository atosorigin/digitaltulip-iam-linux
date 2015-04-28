# digitaltulip-iam-linux
Digital Tulip Forgerock Deployment for Linux Components

Assuming an AWS inventory will deploy the Forgerock IAM Solution 
This includes
HaProxy
OpenAM
OpenDJ
OpenIDM
OpenIG

In addition it will also configure SSO to work with the portal environment and create connectivity to the Active Directory server created in digital-tulip-iam-windows.

Invoked in the following way

ansible-playbook -i plugins/inventory frstack.yml --extra-vars "env=dev"