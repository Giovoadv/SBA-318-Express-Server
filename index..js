const express = require("express");
const app = express();
const port = 3000;
const tasksRoutes = require("./routes/tasks.js");
const bodyParser = require("body-parser"); //post /path
const fs = require("fs");

app.use(express.static("./styles"));
app.use(express.static("./views"));

//MIDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

//TEMPLATE

app.engine("pug", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "pug"); // register the template engine

app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  const options = {
    title: "TODO",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  res.render("index", options);
});

app.get("/help", (req, res) => {
  const options = {
    title: "TODO Help",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  res.render("help", options);
});

app.get("/contact", (req, res) => {
  const options = {
    title: "TODO Contact",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  res.render("contact", options);
});

app.get("/tasks", (req, res) => {
  res.sendFile(__dirname + "/views/tasks.html");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 Error handling
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
