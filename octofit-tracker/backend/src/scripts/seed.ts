import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const usernames = ['ava_runner', 'liam_cyclist'];
    const existingUsers = await User.find({ username: { $in: usernames } }).select('_id');
    const existingUserIds = existingUsers.map(({ _id }) => _id);

    await Promise.all([
      Activity.deleteMany({ user: { $in: existingUserIds } }),
      Leaderboard.deleteMany({ user: { $in: existingUserIds } }),
      Team.deleteMany({ name: 'Trail Blazers' }),
    ]);
    await User.deleteMany({ username: { $in: usernames } });

    const [ava, liam] = await User.create([
      { username: 'ava_runner', email: 'ava@example.com', name: 'Ava Runner' },
      { username: 'liam_cyclist', email: 'liam@example.com', name: 'Liam Cyclist' },
    ]);

    await Team.create({
      name: 'Trail Blazers',
      members: [ava._id, liam._id],
      points: 145,
    });

    await Activity.create([
      { user: ava._id, type: 'running', durationMinutes: 35, distanceKilometers: 5.2, calories: 320 },
      { user: liam._id, type: 'cycling', durationMinutes: 50, distanceKilometers: 18, calories: 410 },
    ]);

    await Leaderboard.create([
      { user: ava._id, points: 85, period: 'all-time' },
      { user: liam._id, points: 60, period: 'all-time' },
    ]);

    await Workout.deleteMany({ name: { $in: ['Beginner Cardio', 'Strength Basics'] } });
    await Workout.create([
      {
        name: 'Beginner Cardio',
        description: 'A low-impact session to build cardiovascular endurance.',
        level: 'beginner',
        durationMinutes: 25,
        exercises: ['Brisk walk', 'March in place', 'Cool-down stretch'],
      },
      {
        name: 'Strength Basics',
        description: 'A simple full-body strength circuit.',
        level: 'intermediate',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
