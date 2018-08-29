## STEPS TO DEPLOY WEB APPLICATION

1. Inside the Dealtime folder execute the command mvn clean package
2. Go to the Dealtime\distribution\target and extract the DealTime-1.0.0-SNAPSHOT.zip.
3. Download the latest version of the API Manager from [here](https://wso2\.com/api\-management/).
4. Download the latest WSO2 API import/export tool \(api\-import\-export\<version>.war\) from [here](https://docs.wso2.com/download/attachments/92522276/api-import-export-2.5.0-v1.war?version=2&modificationDate=1530699446000&api=v2)
5. Copy the downloaded import-export tool war file to the <API\-M\_HOME>/repository/deployment/server/web apps folder\.
6. Check API\-import\-export\- war version and APIM version with the versions in the conf file \(API\-import\-export\-2\.5\.0\-v1\.war\) at file path  ,DealTime-1.0.0-SNAPSHOT/project/Back\-End/ballerina\.conf file\. If there is a difference, change the versions values to the downloaded versions\.

![image](Readme%20file%20images/1.png)

7. Start the API Manager\.

To start the server, Navigate to the <PRODUCT\_HOME>/bin/wso2server\.sh \(on Linux/Mac OS\) from the command prompt and execute the command, \./wso2server\.sh

8. Open the terminal window, Navigate to the DealTime-1.0.0-SNAPSHOT/bin directory from the command prompt\. Execute the command, sh start\.sh
9. Go to the localhost:8080/setup  and click DEPLOY APIS, CREATE ROLES and CREATE USERS  buttons\.

- It Import all the APIs and create users, roles and scopes\.  

![image](Readme%20file%20images/2.png)

### Topics that we can teach using this Web application\.

1. Publishing an API
2. Consuming the APIs from an Application
3. Using the DealTime Web Application\.

__Publishing an API__

1. Login as ‘publisher’

Goto the [https://localhost:9443/publisher/](https://localhost:9443/publisher/) and Sign In as publisher\.

	Username = publisher

	Password = publisher123

![image](Readme%20file%20images/3.png)

- Here we can see all the APIs that we have in the publisher\.
- To use these APIS in API Store, we have to publish them\.

![image](Readme%20file%20images/4.png)

- To do that select an API and then navigate to ‘Manage API’

![image](Readme%20file%20images/5.png)

- Then attach throttling tiers to the API\.
- You can get more detail about throttling tires from [here](https://docs\.wso2\.com/display/AM250/Setting\+Throttling\+Limits). 

![image](Readme%20file%20images/6.png)

2.Use of the scopes\.

WSO2 API Manager provides a way to enforce role\-based access control mechanism\. This will facilitate its users to implement a role\-based access control mechanism for each resource in their API\.  


In this web application we are using two scopes\.

	
![image](Readme%20file%20images/28.png)

            Table 1: Scope to role mapping with Web app functionality


![image](Readme%20file%20images/7.png)

- Following code shows how the scopes are authorized to access the INVENTORY button\.

![image](Readme%20file%20images/8.png)

![image](Readme%20file%20images/9.png)

3. Publish the API\.

- Then click Save & Publish button to publish the API\.

	

![image](Readme%20file%20images/10.png)

- Publish the rest of the APIs like this.

![image](Readme%20file%20images/11.png)

__Consuming the APIs from an Application__

1. Browse API Store and find APIs\.

- After publishing the APIs we can see all the published APIs in the [https://localhost:9443/store/](https://localhost:9443/publisher/)

![image](Readme%20file%20images/12.png)

2. Create user account on Store\.

	SignUp in Api Store and then sign in using username and password that you provide\.

3. Create Application\.

	Go to the APPLICATION and create new application by navigating to ADD APPLICATION

			Name =  DealtimeShoppingApplication 

![image](Readme%20file%20images/13.png)

![image](Readme%20file%20images/14.png)

4. Subscribe Application to APIs\.

Go to the APIS and select an API, then in Applications select DealtimeShoppingApplication then select a Tier then click Subscribe to subscribe for particular API

Similarly, subscribe for all 5 APIS

![image](Readme%20file%20images/15.png)

5. Generate Keys for Application\.

         Go to the APPLICATION and select DealtimeShoppingApplication\.

- Go to the Production Keys and click the Generate keys button\.

![image](Readme%20file%20images/16.png)

- Then Copy  generated Consumer Key and Consumer Secret\.

6. Embed application keys in React Web App\.

- Go to the web\_app/project/Front\-End/host/build/key\_config\.js and paste Consumer Key and Consumer Secret in correct places\.

![image](Readme%20file%20images/17.png)

7. Click Home button in localhost:8080/setup 

- For login with different users use this  usernames and passwords 

		Username \-> seller           password \-> seller123

		Username \-> buyer             password \-> buyer123

__Using the DealTime Web Application\.__

1. Browse home page\. 

Browse home page using	[https://localhost:8080/products](https://localhost:8080/products) or clicking home button in previous  [https://localhost:8080/setup](https://localhost:8080/setup) page

![image](Readme%20file%20images/18.png)
	

- Here ,initially frontend request products details form item API and then API get the items from the backend and list them on the UI\.

![image](Readme%20file%20images/19.png)

2. Proceed to purchase an Item\. Login as Buyer\. Show that the application does not display seller options, based on scopes\.

![image](Readme%20file%20images/20.png)

					Login as a buyer

![image](Readme%20file%20images/21.png)

				Login as a seller

- If we login as a buyer we cannot see the INVENTORY button at the top left corner\.

- INVENTORY button can only be accessed by the user who logs in as a seller\.

 

3. Place an order\.

![image](Readme%20file%20images/22.png)

- Here we use item API to get detail of the item \.
- Then user can place order and put it in to the cart\. 

![image](Readme%20file%20images/23.png)

- Then user can go to the cart using cart icon on the top right hand corner \.
- User can update orders  and remove orders\.
- When user checkout orders it call the order API\.

4. Logout from Buyer\. 

![image](Readme%20file%20images/24.png)

- Clicking logout button trigger the Revoke API and it revoke the access token from the database\.

5. Proceed to add items to inventory\.

![image](Readme%20file%20images/25.png)

- Only seller can access to the Inventory 
- When seller login using his credentials INVENTORY button appears in top left corner\.
- We achieve this functionality by using scopes\.

6. Add items to inventory\. Describe how the Inventory API helps\.

![image](Readme%20file%20images/26.png)

![image](Readme%20file%20images/27.png)

- When seller add an item, front end call the inventory API and do the  tasks 

