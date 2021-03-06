const app = require("express")();
app.use(require("body-parser").json({extended: false}));
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({err: "internalError"});
    } else {
        next();
    }
});
app.listen(5000);

const fs = require("fs");
const secret = fs.readFileSync(__dirname + "/secret", "utf8");

app.post("/query", (req, res) => {
    if (req.headers.authorization !== secret) return res.status(401).json({err: "unauthorized"});
    res.json({
        answer: req.body.query,
        results: [
            {
                text: "Post this to Alles mb from Pulsar",
                data: req.body.query
            },
            {
                text: "Open Alles mb and post",
                url: `https://mb.alles.cx/post?content=${encodeURIComponent(req.body.query)}`
            }
        ]
    });
});

app.post("/action", (req, res) => {
    if (req.headers.authorization !== secret) return res.status(401).json({err: "unauthorized"});
    console.log(req.body.user + ": " + req.body.data);
});