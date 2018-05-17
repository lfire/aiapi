'use strict';

const Mock   = require('mockjs');

module.exports = () => {
  let data = Mock.mock({
    "stars|50": [{
      "id|+1": 1,
      "name": "@cname()",
      "desc": "@cparagraph(0, 3)",
      "tag": "@cword(2, 8)",
      "views": "@integer(100, 5000)",
      "images": "@image('120x60', @color(), @word(2, 6))"
    }],
    "news|100": [{
      "id|+1": 1,
      "title": "@ctitle(8, 20)",
      "desc": "@cparagraph(1, 5)",
      "tag|1": ["时政", "早报", "军事", "民生", "体育", "娱乐"],
      "views": "@integer(200, 5000)",
      "images": "@image('200x200', @color(), @word(3, 5))"
    }]
  });

  return data;
};