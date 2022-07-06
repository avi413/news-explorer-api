# news-explorer-api

This is a user authentication example providing a REST API to a user and his data.

# REST API

The REST API to the example app is described below.

## Get list of saved articles

### Request

`GET /articles`
`GET /articles/:{articleId}`
    curl -i -H 'Accept: application/json' http://localhost:3000/articles/?:{articleId}

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [
        {
            "_id": "**************",
            "keyword": "some keyword",
            "title": "title",
            "text": "text",
            "source": "source",
            "link": "http://example.com",
            "date": "2022-01-01T00:00:00.000Z",
            "__v": 0
        }...
    ]

### Request

`POST /articles`

    curl -i -H 'Accept: application/json' http://localhost:3000/articles/

### Response

    HTTP/1.1 201 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [
        {
            "owner": ""**************",
            "_id": ""**************",
            "keyword": "some keyword",
            "title": "title",
            "text": "text",
            "source": "source",
            "link": "http://example.com",
            "date": "2022-01-01T00:00:00.000Z",
            "__v": 0
        }...
    ]


### Request

`GET /users/me`

    curl -i -H 'Accept: application/json' http://localhost:3000/users/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [
        {
            "_id": "**************",
            "email": "email@email.com",
            "name": "name",
        }
    ]


### Request

`POST /signup`

    curl -i -H 'Accept: application/json' http://localhost:3000/signup/

### Response
    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {"id":"*************","name":"name","email":"email@email.com"}

### Request

`POST /signin`

    curl -i -H 'Accept: application/json' http://localhost:3000/signin /

### Response

    HTTP/1.1 201 Created
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 201 Created
Connection: close
Content-Type: application/json
Location: /thing/1
Content-Length: 36

{ "token": "**************"}

## API Reference for data




## Authors

- [@avi413](https://www.github.com/avi413)


## Demo

[Demo](https://api.news.students.nomoredomainssbs.ru/)


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/avi-dalal/)

## Deployment

To deploy this project run

```bash
  npm run deploy
```

