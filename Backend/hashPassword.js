/*
ATTRIBUTE:
Website: Employee RBAC Guide
Author: ChatGPT
URL: https://chatgpt.com/g/g-p-68e986e750048191ac135c0f357e402a/c/690e23e1-a054-832f-a2cd-b5fb70f51928 
Accessed on: 2025-11-07
*/

const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'Password123'; // <-- change this for each employee
  const hashed = await bcrypt.hash(password, 10);
  console.log('Plain:', password);
  console.log('Hashed:', hashed);
}

hashPassword();
