const router = require('koa-router')()
const db = require('../db.config')
const { response_pack } = require('../utils/index')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Mock Server'
  })
})

router.get('/findAll', async (ctx, next) => {
  var result = await db.query('select * from api_model')
  ctx.response.body = response_pack('200', result)
})

router.post('/create', async (ctx, next) => {
  const request = ctx.request.body
  if (request.name && request.name.trim() !== '') {
    const sql = `insert into api_model (name,description,res_model,req_model,method) values ('${request.name}','${request.description}','${request.res_model}','${request.req_model}','${request.method}')`
    const result = await db.query(sql)
    if (result.affectedRows) {
      ctx.response.body = response_pack('200')
    } else {
      ctx.response.body = response_pack('500')
    }
  } else {
    ctx.response.body = response_pack('500')
  }
})

router.post('/delete', async (ctx, next) => {
  const request = ctx.request.body
  if (request.id) {
    const sql = `delete from api_model where id=${request.id}`
    const result = await db.query(sql)
    if (result.affectedRows) {
      ctx.response.body = response_pack('200')
    } else {
      ctx.response.body = response_pack('500')
    }
  } else {
    ctx.response.body = response_pack('500', {}, '请传入需要删除的接口id')
  }
})

router.post('/edit', async (ctx, next) => {
  const request = ctx.request.body
  if (request.id) {
    const sql = `update api_model set name='${request.name}',description='${request.description}',res_model='${request.res_model}',req_model='${request.req_model}',method='${request.method}' where id=${request.id}`
    const result = await db.query(sql)
    if (result.affectedRows) {
      ctx.response.body = response_pack('200')
    } else {
      ctx.response.body = response_pack('500')
    }
  } else {
    ctx.response.body = response_pack('500', {}, '请传入需要修改的接口id')
  }
})

router.post('/search', async (ctx, next) => {
  try {
    const request = ctx.request.body
    const sql = `select * from api_model where name like '%${request.query}%'`
    const result = await db.query(sql)
    ctx.response.body = response_pack('200', result)
  } catch (e) {
    ctx.response.body = response_pack('500')
  }
})

module.exports = router
