require('dotenv').config({ path: 'properties.env' });
const { getMigrationStatus } = require('./migrate');

async function run() {
  try {
    const { applied, pending } = await getMigrationStatus();

    console.log('\n=== Migration Status ===\n');
    console.log('Applied:');
    if (applied.length === 0) {
      console.log('  (none)');
    } else {
      applied.forEach((m) => console.log('  ✓', m));
    }

    console.log('\nPending:');
    if (pending.length === 0) {
      console.log('  (none)');
    } else {
      pending.forEach((m) => console.log('  ○', m));
    }
    console.log('');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();
