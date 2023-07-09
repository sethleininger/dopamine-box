const db = require('../config/connection');
const { User, Goal, Task } = require('../models');
const userSeeds = require('./userSeeds.json');
const goalSeeds = require('./goalSeeds.json');
const taskSeeds = require('./taskSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    for (let i = 0; i < userSeeds.length; i++) {
      const userSeed = userSeeds[i];
      const goals = [];
      const goalSeed = goalSeeds[i];
      console.log(goalSeed);

      const goal = {
        name: goalSeed.name,
        tasks: taskSeeds[i],
        startDate: goalSeed.startDate,
        endDate: goalSeed.endDate,
        streak: goalSeed.streak,
      };

      goals.push(goal);

      const user = new User({
        username: userSeed.username,
        email: userSeed.email,
        password: userSeed.password,
        goals: goals,
      });

      await user.save();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  console.log('All done!');
  process.exit(0);
});
