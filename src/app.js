const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const ProjectRouter = require("./routes/project.route");
const TransactionRouter = require("./routes/transaction.route");
const MemberRouter = require("./routes/members.route");
const emailRouter = require("./routes/mail.route");
const ownerRouter = require("./routes/owner.route");
const registerUser = require("./routes/user.route");
const authUser = require("./routes/auth.route");
const TaskRouter = require("./routes/task.route");
const AiRouter = require("./routes/ai.route");

app.use(ProjectRouter);
app.use(TransactionRouter);
app.use(MemberRouter);
app.use(emailRouter);
app.use(ownerRouter);
app.use(registerUser);
app.use(authUser);
app.use(TaskRouter);
app.use(AiRouter);

module.exports = app;
