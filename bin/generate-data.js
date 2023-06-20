import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';


const user = () => ({
  wallet_id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  phone: faker.person.phone,
  sex_type: faker.person.sex(),
  dni: faker.string.numeric({length:8}),
  birth_date: faker.date.birthdate(),
  created_at: faker.date.past()
});

const generate = () => {
  const data = Array.from(new Array(100)).map(user);
  const json = JSON.stringify(data);

  writeFileSync('./data/users.json', json);
};

console.log('generando data...')

generate();

console.log('generando data finalizado.')
