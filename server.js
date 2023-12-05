const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
require("./config/passport")(passport);
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const profileRoutes = require("./routes/profile");
const newsRoutes = require("./routes/news");
const cookieParser = require("cookie-parser");
const { checkTokenSetUser } = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(express.static("./dist"));

app.use(passport.initialize());

// CORS configuration
const corsOptions = {
  origin: "*", // or the specific domain of your frontend
  credentials: true, // to allow cookies to be sent
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(corsOptions));
app.use(passport.session());
app.use((req, res, next) => {
  console.log("Session: ", req.session);
  console.log("User object: ", req.user);
  next();
});
// const corsOptions = {
//   origin: process.env.API_URL,
//   credentials: true,
// };

app.use(express.json());
app.use(cookieParser());
app.use(checkTokenSetUser);

app.use("/", authRoutes);
app.use("/api", newsRoutes);

app.listen(port, () => {
  console.log(`Server is listening at:` + ":" + `${port}`);
});
