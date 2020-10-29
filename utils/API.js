const server = 'https://free.currconv.com/api/v7/';
const apiKey = '7f75d087d4bddfd6bab0';
const bundleIdentifier = 'com.currencieswatcher.www';
const instanceID = 'e111cc2c-6ba5-43c4-955f-ecf84bd244ea';

const getAllCurrencies = () => {
    return fetch(`${server}currencies?apiKey=${apiKey}`);
}
const convertTwoCurrencies = async (curr1, curr2) => {
    const response = await fetch(`${server}convert?q=${curr1}_${curr2}&apiKey=${apiKey}`);
    const responseJson = await response.json();
    return responseJson;
}
const saveMobileToken = async (token) => {
    const method = "POST";
    const headers = {
        "Content-Type": "application/json",
    }

    const body = JSON.stringify({
        token,
        bundleIdentifier
    });
    const response = await fetch(`https://${instanceID}.pushnotifications.pusher.com/device_api/v1/instances/${instanceID}/devices/fcm`, {method, headers, body});

    const responseJson = await response.json();
    return responseJson;

}
export { getAllCurrencies, convertTwoCurrencies, saveMobileToken };