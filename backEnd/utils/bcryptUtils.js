import bcrypt from 'bcrypt'


const saltRounds = bcrypt.genSaltSync(10);

export function generateHash(password) {
  return bcrypt.hashSync(password, saltRounds);
}

export function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}


