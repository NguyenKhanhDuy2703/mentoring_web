const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MentoringPlatform', 'root', 'duy270304', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công đến MySQL!');
  } catch (error) {
    console.error('❌ Không thể kết nối đến MySQL:', error);
  }
}

testConnection();

module.exports = sequelize;
