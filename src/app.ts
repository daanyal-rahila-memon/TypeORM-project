import express from "express"

const app = express();
app.use('/', function(req, res) {
    res.send('Hello From Express!');
})
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});