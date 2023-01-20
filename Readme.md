# Fampay Backend Assignment

## Project Goal
To make an API to fetch latest youtube search videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Task Performed
- [X] Server calls the YouTube API continuously in background (async) within every 15 seconds for fetching the latest videos for a predefined search query(songs) and store the data of videos in a database.
- [X] Create 2 Get API: one to get all video data and second with filter of title and description in pagainated form
- [X] Dockerized the project.
- [X] Added support for supplying multiple API keys so that if quota is exhausted on one, it automatically uses the next available key through database
- [X] Created Dashboard in React for better visualization purpose.
- [X] Optimised search api, so that it's able to search videos containing partial match for the search query in either video title or description.

## Instruction for Running Project
- Clone the repo `git clone https://github.com/jaypatel31/fampay-backend.git`.
- Go the location of the folder in the terminal.
- Run command `docker-compose build` to build the image of project
- Then Run command `docker-compose up` to start frontend and backend of the project
- Now you can access the frontend from `http://localhost:3000` and access the API through `http://localhost:4000/api/v1`
- To Stop the project run command `docker-compose stop`

## Features/API
1) Get All Video API
    - Method: `GET`
    - Route: /api/v1/video
    - response: `{message:string, data: []video, success: bool, pageNumber: int, itemFetched: int, totalItems: int}`
    - Queries: By Default page is taken as 1 and size = 10
    
      | param | required | type |
      | ----- | -------- | ---- |
      | page  | false    | int  |
      | size  | false    | int  |
 
2) Get Video with Search Filter API
    - Method: `GET`
    - Route: /api/v1/video/search
    - response: `{message:string, data: []video, success: bool, pageNumber: int, itemFetched: int, totalItems: int}`
    - Queries: In this route either title or description anyone is required to get result
  
      | param | required | type |
      | ----- | -------- | ---- |
      | title | true     | string |
      | description | true     | string |
      | page  | false    | int  |
      | size  | false    | int  |
      
 3) Add Google API Key
    - Method: `POST`
    - Route: /api/v1/video/add
    - response: `{message:string, success: bool}`
    - feature: whenever the quota of key get exhaust then it get deactivated and the unused key from db is taken and set as active
    - body: pass the body in JSON Format

      | param | required | type |
      | ----- | -------- | ---- |
      | apiKey  | true    | string  |

## Screenshots
<img width="1633" alt="Screenshot 2023-01-20 at 2 43 26 PM" src="https://user-images.githubusercontent.com/59785863/213658975-1e748591-0986-4e31-b80a-20a93ab84eff.png">
<img width="1633" alt="Screenshot 2023-01-20 at 2 43 42 PM" src="https://user-images.githubusercontent.com/59785863/213659002-4c8514a1-5cce-4a32-ae1a-704590633079.png">
<img width="1840" alt="Screenshot 2023-01-20 at 2 35 49 PM" src="https://user-images.githubusercontent.com/59785863/213658919-31d012a3-b42d-4c7a-93a0-bc1f229c940d.png">
<img width="1840" alt="Screenshot 2023-01-20 at 2 35 54 PM" src="https://user-images.githubusercontent.com/59785863/213658946-e4932197-032c-4ab9-a2f5-ef2c31025503.png">
<img width="1840" alt="Screenshot 2023-01-20 at 2 35 57 PM" src="https://user-images.githubusercontent.com/59785863/213658961-d81f00da-2dc8-4f50-8285-7c691e43950f.png">

## Tech Stack
<p align="left"> 
<img alt="C" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img alt="C" src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
<img alt="C" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img alt="C" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img alt="C" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
</p>

## Resources
Postman API Collection of this project: https://elements.getpostman.com/redirect?entityId=13428669-66572b7f-89d0-48d0-ba7d-3b0e7d031436&entityType=collection
