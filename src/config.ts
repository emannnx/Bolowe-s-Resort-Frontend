export const SERVER_URL_ENV=  {
    DEV_ENV:"//localhost:3000/api/v1",
    TEST_ENV:"https://cac4-105-113-18-23.ngrok-free.app/api/v1",
    //PROD_ENV: "//boloweis-resort-backend.herokuapp.com/api/v1"
    PROD_ENV:"https://api.boloweisworldresort.com/api/v1"
}

export const SERVER_URL = {
    //API_URL: SERVER_URL_ENV.DEV_ENV,
    //API_URL: SERVER_URL_ENV.TEST_ENV,
    API_URL: SERVER_URL_ENV.PROD_ENV
}