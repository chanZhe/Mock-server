const Mock = require('mockjs')
const db = require('../db.config')
const transToMock = require('./transform')
const url = require('url')
const queryString = require('querystring')

const createMockData = async (ctx) => {
    try {
        let path = ctx.url, query = ctx.request.body
        if (ctx.method === 'GET') {
            const url_obj = url.parse(ctx.url)
            path = url_obj.pathname
            query = queryString.parse(url_obj.query)
        }
        const sql_sentence = `select * from api_model where name='${path}'`;
        const result = await db.query(sql_sentence)
        if (result && result.length) {
            const response = result[0]
            const req_valid = response.req_model === '' ? {} : JSON.parse(response.req_model)
            const valid = !Object.keys(req_valid).length || Object.keys(req_valid).every(req => {
                return query[req] && query[req] !== ''
            })
            console.log('valid', valid)
            if (valid) {
                console.log('res_model type', typeof(response.res_model))
                const data = response.res_model && response.res_model !== '' ? await middlewaresMock(JSON.parse(response.res_model)) : {}
                ctx.response.body = response_pack('200', data)
            } else {
                ctx.response.body = response_pack('500', {}, '缺少必传参数')
            }
        } else {
            ctx.response.body = response_pack('404')
        }
    } catch (e) {
        ctx.response.body = response_pack('500')
    }
}

const middlewaresMock = async (res_model) => {
    const trans_data = transToMock(res_model)
    const mock_data = await Mock.mock(trans_data)
    return mock_data
}

const response_pack = (code, data = {}, msg = RESPONSE_ENUM[code]) => {
    return {
        code,
        msg,
        data
    }
}

const RESPONSE_ENUM = {
    100: 'continue',
    101: 'switching  protocol',
    102: 'processing',
    200: 'ok',
    201: 'created',
    202: 'accepted',
    203: 'non-authoritative information',
    204: 'no content',
    205: 'reset content',
    206: 'partial content',
    207: 'Multi-status',
    300: 'multiple choices',
    301: 'moved  permanently',
    302: 'moved temporaroly',
    303: 'see  other',
    304: 'not modifined',
    305: 'use proxy',
    306: 'switch proxy',
    307: 'temporary redirect',
    400: 'bad request',
    401: 'unauthorized',
    500: 'Internal Server Error'
}

module.exports = { createMockData, response_pack }