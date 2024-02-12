# WineZ web shop App, made with MERN(MongoDB, Express.js, React.js, Node.js) fullstack #

_Web shop app with user authentication, CRUD operations over products, producers and users._
<br>
- - - -
<br>
To run locally this project, start MongoDB on 27017 port.<br>
After that, go to Frontend and run "npm i" command in terminal, and the same should be done within Backend folder. <br>
Then, node_modules folder will appear and our project can be started. To start the project, run "npm start" from each Frontend and Backend folders. <br>
<br>
And that's it, you are ready to go! <br>
<br>
 - - - -
<br>
<br>
## About the WineZ ##
<br>

Name of this web shop app is ***WineZ 🍇***, it's made as a seminar paper as part of my faculty obligations. <br>
Project is separated in 2 main parts:
* Frontend,
* Backend,
* VinotekaDB (which is manipulated through backed code).

<br>
There is 2 main roles on this page:
* Administrator,
* User.

<br>
User authentication is implemented on backend using JWT in which UserID and UserRole are stored.<br>
It's done with httpOnly requests, which prevents frontend part of the app to manipulate with token, which means that it can be done only by sending the token on backend where informations from token will be extraced using JWT_SECRET key. This WoW ensures safe manipulation over user data.
<br>

Administrator role have the following rights:
* Delete/Edit users,
* Promote user to the Administrator role,
* Create, Update and Delete Products,
* Create, Update and Delete Producers -> Producer cannot be deleted if it have any product connected to itself in the DB.

<br>
User role have the following rights:
* Register new account,
* Login,
* Search Products,
* Search Producers,
* See product Details.

<br>

This is how the home page looks like:
<p align="center">
  <img src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/b6753c9f-339b-47fa-81dc-6836bff7001c" width="90%">
</p>
<br>
By clicking on any product, user is redirected to ProductDetails page where details about wine and winemaker are shown:
<p align="center">
  <img width="90%" src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/befe66f2-e1d2-4386-80fc-97543e2f0950">
</p>
<br>
On "Proizvođači" link on top of the page, all producers are located and if user have Administrator role, button "Obriši proizvođača" for deleting producer is show. <br>
If not, just list of producers will be displayed. Here is how it looks:
<p align="center">
  <img width="90%" src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/55c052c6-f1f4-4936-b314-860e686206b1">
</p>
<br>
There is also Users administration page, which is visible only to administrators and even if user is Administrator, it won't be able to edit/delete his own account data:
<p align="center">
  <img width="90%" src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/7331f76c-8ee5-4148-94ee-28a09081a227">
</p>
<br>

As it is already mentioned, Administrator can Add Producers and Product and it's done via form:
<p align="center">
  <img width="30%" src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/783efc12-0fe1-47f2-adb8-8d72431fa73b">
</p>
<br>

If user doesn't have an account, it can register through the following form:
<p align="center">
  <img width="90%" src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/52966118-5866-47bb-bb6c-9c72c696b94d"></p>
<br>

There is also Login form after user is added to the DB (Registered):
<p align="center">
  <img width="90%" src="https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/373fe3ff-f527-4cb3-8296-6135e28f9c4b">
<br>
