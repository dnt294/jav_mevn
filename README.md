## Run on development

### Frontend

1. `npm start`

- Client running on port `8080`

### Backend

1. `npm run dev`

- nodemon will run
- Server running on port `8081`
- Debug listening on port `5858`

## Deploy

### Frontend

1. `npm run build`
2. `firebase deploy`

### Backend

1. `git push heroku ``git subtree split --prefix server master``:master --force`

old: deploy  to GCloud:
```
1. `npm run build`
2. `gcloud app deploy`
```
