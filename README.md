# Concurrency in javascript requests
Just an exercise to practice concurrency in an Angular project.


## 🎯 OBJECTIVES
- Make requests to an array of urls limiting the concurrency with a MAX_CONCURRENCY
- Testing  

## 🎉 RESULTS
- I have made a service for the requests, one version using rxjs and another one using javascript fetch
- I have made a small test to check that the requests are divided into blocks according to MAX_CONCURRENCY and if all the requests are made
- I used the GIPHY API to test the code and make it more visual and fun: [Demo](https://gifs-concurrence.vercel.app/)

## 📚 RESOURCES
- [Illustrations](https://themeisle.com/illustrations/)
- [GIPHY](https://developers.giphy.com/)

## ⚙️ HOW TO USE
- npm i 
- npm start
