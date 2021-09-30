# shopwiz_backend

Ecommerce application

### yarn install

### yarn dev

to run add mongo connection uri to config.js file

## API refernce

### /order/ord

Authorizartion: Bearer
supported methods: GET, POST, UPDATE, DELETE

GET order/ord
get order from userId
params userId=fjds3232njxnf
token required

```
  {
        "_id": "6155ab347514d0021ad77d4c",
        "orderId": "owmUqyBiP2EaA4yPbHUMKP",
        "_orderedon": "2021-09-30T11:52:43.714Z",
        "status": "Ordered",
        "productId": {
            "_id": "61559f4b2f0a4d8ccc46d19c",
            "category": "men's clothing",
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "rating": {
                "rate": 3.9,
                "count": 120
            },
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "__v": 0
        },
        "userId": {
            "_id": "6155aa367514d0021ad77d34",
            "email": "qq"
        },
        "__v": 0
    },

```

POST /order/ord
insert into order
body

```
{
    "userId":"6155aa367514d0021ad77d34",
    "productId":"61559f4b2f0a4d8ccc46d19c"
}
```

response

```
{
    "orderId": "cqk4cv3ob6zcf19x5JF3AT",
    "_orderedon": "2021-09-30T13:59:39.675Z",
    "status": "Ordered",
    "productId": "61559f4b2f0a4d8ccc46d19c",
    "userId": "6155aa367514d0021ad77d34",
    "_id": "6155c4a2d971d78d8f215248",
    "__v": 0
}
```
