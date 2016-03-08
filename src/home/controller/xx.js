'use strict';

import Base from './base.js';

var marked = require('marked');

var pagination = require('think-pagination');

export default class extends Base {
  async indexAction(){
    let data = await this.model('text').where({id:3}).find();
    let htm = data.text;
    let html = pagination(htm, this.http, {});
    this.assign({
      pagination:html,
      css: "index",
      js:"index"
    });
    return this.display();
  }
}
