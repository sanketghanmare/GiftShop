module.exports = (app) => {

    app.get('/productsinfo', async (req,res) => {
        const api_url = 'https://www.amazon.com/';
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json)
    });
};