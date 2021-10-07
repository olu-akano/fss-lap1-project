const app = require("../server/app");
const port = 5500;
app.listen(port,(err) => {
    if (err) {
        console.log("there was a problem", err);
        return;
    }
    console.log(`Express now running at http://localhost:${port}`)
})
