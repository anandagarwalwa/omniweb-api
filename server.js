const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Start omni Website API");
});

// Require employee routes
const requestRoutes =require('./src/routes/request/request.route');
const votesRoutes =require('./src/routes/votes/votes.route');
const invitationsRoutes =require('./src/routes/invitations/invitations.route');
const workspaceRoutes =require('./src/routes/workspace/workspace.route');
const userRoutes =require('./src/routes/user/user.route');
const userworkspacemappingRoutes = require('./src/routes/user/userworkspacemapping.route');

// const alertdetailRoutes = require('./src/routes/alertdetail.router');
// using as middleware
app.use('/requests',requestRoutes);
app.use('/votes',votesRoutes);
app.use('/workspace',workspaceRoutes);
app.use('/invitations',invitationsRoutes);
app.use('/user',userRoutes);
app.use('/userworkspacemapping',userworkspacemappingRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});