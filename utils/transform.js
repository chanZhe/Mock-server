const transToMock = function (transform_str) {
    const handleStr = mapping_reg.reduce((cruStr, reg) => {
        const current_reg = new RegExp(':"'+reg.type, 'g')
        return cruStr.replace(current_reg, ':"' + reg.format)
    }, JSON.stringify(transform_str))
    return JSON.parse(handleStr)
}

const mapping_reg = [
    {
        type: 'number', format: '@natural'
    },
    {
        type: 'string', format: '@word'
    },
    {
        type: 'url', format:'@url'
    },
    {
        type: 'timestamp', format: '@datetime(T)'
    },
    {
        type: 'float', format: '@float'
    },
    {
        type: 'name', format: '@cname'
    },
    {
        type: 'id', format: '@id'
    },
    {
        type: 'word', format: '@cword'
    }
]

module.exports = transToMock