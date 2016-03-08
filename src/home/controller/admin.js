'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.assign({
      title: "admin",
      // css: "index",
      // js:"index"
    });
    return this.display();
  }
  async textAction(){
    let text = this.post('text');
    let name = "程序师";
    let affectedRows = await this.model('text').where({title: "第一章 弱者&恶徒"}).update({text:text});
    return this.success(affectedRows);
  }
}
