const { Role, Gender } = require('@prisma/client');

const pantries = [
  { name: "Main Kitchen", phone: "555-0101", address: "Block A, Ground Floor" },
  { name: "Special Diet Unit", phone: "555-0102", address: "Block B, 1st Floor" },
  { name: "General Ward Kitchen", phone: "555-0103", address: "Block C, Ground Floor" },
  { name: "ICU Kitchen", phone: "555-0104", address: "Block D, 2nd Floor" },
  { name: "Emergency Unit Kitchen", phone: "555-0105", address: "Block E, Ground Floor" },
];

const staffUsers = [
  { name: "John Cook", email: "john@test.com", role: Role.STAFF },
  { name: "Mary Chef", email: "mary@test.com", role: Role.STAFF },
  { name: "Sam Kitchen", email: "sam@test.com", role: Role.STAFF },
  { name: "Lisa Baker", email: "lisa@test.com", role: Role.STAFF },
  { name: "Tom Chef", email: "tom@test.com", role: Role.STAFF },
];

const deliveryUsers = [
  { name: "Dave Delivery", email: "dave@test.com", role: Role.DELIVERY },
  { name: "Sarah Swift", email: "sarah@test.com", role: Role.DELIVERY },
  { name: "Mike Move", email: "mike@test.com", role: Role.DELIVERY },
  { name: "Anna Quick", email: "anna@test.com", role: Role.DELIVERY },
  { name: "Paul Fast", email: "paul@test.com", role: Role.DELIVERY },
];

const patients = [
  {
    name: "Robert Wilson",
    diseases: ["Diabetes", "Hypertension"],
    allergies: ["Peanuts"],
    roomnumber: 101,
    bednumber: 1,
    floornumber: 1,
    age: 65,
    gender: Gender.MALE,
    phone: "555-1001",
    emergencyphone: "555-1002",
    status: 'ACTIVE',
  },
];

module.exports = {
  pantries,
  staffUsers,
  deliveryUsers,
  patients
};
