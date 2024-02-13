# WineZ web shop App, made with MERN (MongoDB, Express.js, React.js, Node.js) fullstack

_Web shop app with user authentication, CRUD operations over products, producers, and users._

---

## Running the Project Locally

To run this project locally, start MongoDB on port 27017. Then, navigate to the Frontend directory and run the command `npm i` in the terminal. Repeat the same process in the Backend folder. After that, the `node_modules` folder will appear in both directories. To start the project, run `npm start` from each Frontend and Backend folders.

---

## About WineZ

The name of this web shop app is **WineZ 🍇**. It was created as a seminar paper as part of my faculty obligations. The project is separated into 3 main parts:
* Frontend
* Backend
* VinotekaDB (which is manipulated through backed code).

There are 2 main roles on this page:
* Administrator
* User

User authentication is implemented on the backend using JWT in which UserID and UserRole are stored. It's done with httpOnly requests, which prevents the frontend part of the app from manipulating with the token, meaning that it can be done only by sending the token to the backend where information from the token will be extracted using the JWT_SECRET key. This ensures safe manipulation over user data.

Administrator role has the following rights:
* Delete/Edit users
* Promote users to the Administrator role
* Create, Update, and Delete Products
* Create, Update, and Delete Producers (a Producer cannot be deleted if it has any product connected to itself in the DB).

User role has the following rights:
* Register a new account
* Login
* Search Products
* Search Producers
* See product details

---

## Screenshots

### Home Page
![Home Page](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/b6753c9f-339b-47fa-81dc-6836bff7001c)

### Product Details
By clicking on any product, the user is redirected to the ProductDetails page where details about wine and winemaker are shown:
![Product Details Page](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/befe66f2-e1d2-4386-80fc-97543e2f0950)

### Proizvođači
On the "Proizvođači" link on top of the page, all producers are located. If the user has an Administrator role, the "Obriši proizvođača" button for deleting a producer is shown. If not, just a list of producers will be displayed.
![Proizvođači](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/55c052c6-f1f4-4936-b314-860e686206b1)

### Users Administration
There is also a Users administration page, which is visible only to administrators. Even if a user is an Administrator, it won't be able to edit/delete his own account data.
![Users Administration](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/7331f76c-8ee5-4148-94ee-28a09081a227)

### Adding Products and Producers
As mentioned, Administrator can Add Producers and Products via a form.
![Adding Products and Producers](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/783efc12-0fe1-47f2-adb8-8d72431fa73b)

### Registration Form
If a user doesn't have an account, they can register via the following form:
![Registration Form](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/52966118-5866-47bb-bb6c-9c72c696b94d)

### Login Form
There is also a Login form after the user is added to the DB (Registered).
![Login Form](https://github.com/MarkoZdilar/WineShop-MERN/assets/58775766/373fe3ff-f527-4cb3-8296-6135e28f9c4b)
