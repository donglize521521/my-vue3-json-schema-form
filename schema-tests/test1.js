const Ajv = require('ajv') //
const ajv = new Ajv()

// 一、自定义 Format
ajv.addFormat('test', (data) => {
  console.log(data, '--------')
  return data === 'hahaha'
})
// 二、自定义关键字
ajv.addKeyword('testKeyword', {
// 方式 1 validate
//   validate(schema, data) {
//     console.log(schema, data)
//     console.log(schema.length)
//     if (schema === true) return true
//     else return schema.length === 6
//   },
// 方式2 
// compile(sch, parentSchema) {
//     console.log(sch, parentSchema)
//     return () => true
//   },
//   metaSchema: {
//     type: 'boolean',
//   },
// 方式3 会校验关键字所在的属性 (推荐使用)
//   macro() {
//     return {
//       minLength: 10,
//     }
//   },
// 方式4 inline(性能最好,阅读性不好)

})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'test',
      testKeyword: true,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'], //哪些属性是必须输入的
}

const validate = ajv.compile(schema)

const valid = validate({
  name: 'hahaha',
  age: 10,
  pets: [],
  isWorker: false,
})
if (!valid) console.log(validate, validate.errors)

