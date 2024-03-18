# Vital Track

This project is made for the individual project for Web-dev class in Metropolia.

In this ReadMe you'll understand the basics of the API server on how it's works and what type of functions you can do.

## Screenshots

## Apidoc

[Documentation](https://linktodocumentation)

# Endpoints

### Mood Form

### `/api/entries`

Post entry

```
POST http://localhost:3000/api/entries
content-type: application/json
```

Get all entries for a logged in user (requires token)

```
GET http://localhost:3000/api/entries
Authorization: Bearer <token>
```

Get entries by id

```
GET http://localhost:3000/api/entries/:id
```

Update entry

```
PUT http://localhost:3000/api/entries/:id
content-type: application/json
```

Delete entry

```
DELETE http://localhost:3000/api/entries/:id
```

---

### Users

### `/api/users`

Create user (register)

```
POST http://127.0.0.1:3000/api/users
content-type: application/json
```

Get all users (requires token)

```
GET http://127.0.0.1:3000/api/users
Authorization: Bearer <token>
```

Get user by id (requires token)

```
GET http://127.0.0.1:3000/api/users/:id
Authorization: Bearer <token>
```

Delete user (requires token)

```
DELETE http://127.0.0.1:3000/api/users/:id
Authorization: Bearer <token>
```
