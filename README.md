# API Documentation

This API is built using Node.js and Express.js.

## Installation

Before running the server, you need to install the necessary dependencies. Run the following command in your terminal:
npm install

## Endpoints

### GET /

Serves the main 'index.html' file.

### GET /api/cat

Returns the 'cat.json' file which contains category information.

### GET /api/cat/:categoryId

Returns the products of a specific category. The 'categoryId' is a parameter in the URL.

### GET /api/product/:productId

Returns the information of a specific product. The 'productId' is a parameter in the URL.

### GET /api/product/:productId/comments

Returns the comments of a specific product. The 'productId' is a parameter in the URL.

### GET /api/user/:userId/cart

Returns the cart of a specific user. The 'userId' is a parameter in the URL.

### GET /api/sell/publish

Returns the content of the 'publish.json' file.

### GET /api/cart/buy

Returns the content of the 'buy.json' file.

## Running the API

The API listens on the port specified by the PORT environment variable, or 3000 if the PORT environment variable is not set.
