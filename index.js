const app = require("./app");
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`HTTP server runing on port ${port}`);
});
