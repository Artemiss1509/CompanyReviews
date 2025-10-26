const express = require('express');
const reviewRoutes = require('./routes/reviewRoutes');
const db = require('./utils/DB-Connection');
const Review = require('./models/reviewModel');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/reviews',reviewRoutes);

db.sync({alter:true}).then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });
}).catch((error) => {
  console.error('Error syncing database:', error);
});
