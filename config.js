'use strict'

module.exports = {
  PORT: process.env.PORT || 3000,
  MDB: process.env.MONGODB || 'mongodb://localhost:27017/shop',
	SECRET_TOKEN: 'miclavedetokens',
	PAGESIZE:40
}
