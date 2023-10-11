# Space API

This is a simple Space API that provides news related to space, planets, and astronomy. It offers two main endpoints: `/news` and `/news/:id`.

- Rapid API Site: [SpaceAPI on RapidAPI](https://rapidapi.com/stanger307/api/spaceapi)
- Deployed Site: [SpaceAPI on Heroku](https://spaceapi-f4e0170bf6d2.herokuapp.com)

## Endpoints

### Get All Space News

**Endpoint:** `/news`

**Description:** This endpoint provides a list of space-related news articles from various reputable sources. You can access the latest space news from around the world.

**Usage:** 

### Get News from a Specific Source

**Endpoint:** `/news/:id`

**Description:** This endpoint allows you to retrieve space news articles from a specific news source. You can specify the source by providing its `id`.

**Usage:** 

Replace `:id` with the ID of the news source you want to retrieve news from. Available sources include "livescience," "theguardian," "space," "earthsky," and "timeanddate."

## Usage

You can use the provided endpoints to access space-related news and articles in your applications or projects. Make GET requests to the endpoints with the appropriate parameters to retrieve the desired information.

