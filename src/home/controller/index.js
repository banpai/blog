'use strict';
import Base from './base.js';
var marked = require('marked');

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.assign({
      title: "半拍",
      css: "index",
      js:"index"
    });
    return this.display();
  }
  async startAction() {
    let model = this.model("text");
    let data = await model.where({class_id:"1",name:"笔记"}).find();
    let note = await model.where({name:"笔记"}).select();
    let essay = await model.where({name:"随笔"}).select();
    let programmer = await model.where({name:"程序师"}).select();
    let xx = marked(data.text);
    let text = {
      title:data.title,
      text:xx,
      note:note.length,
      programmer:programmer.length,
      essay:essay.length
    }
    return this.end(text);
  }
  async noteAction() {
    let index = this.post('id');
    let name = this.post('name');
    let model = this.model("text");
    let data = await model.where({class_id:index,name:name}).find();
    let xx = marked(data.text);
    let text = {
      title:data.title,
      text:xx
    }
    return this.end(text);
  }
  async menuAction() {
    let name = this.post('name');
    let model = this.model("text");
    let data = await model.where({name:name}).select();
    let len = data.length;
    let data_t = [];
    for(var i = 0;i < len;i++){
      let x = {};
      x.title = data[i].title;
      x.id = data[i].class_id;
      data_t.push(x);
    }
    return this.end(data_t);
  }
  async pAction() {
    let name = this.post('name');
    let title = this.post('title')
    let model = this.model("text");
    let data = await model.where({name:name,title:title}).find();
    let xx = marked(data.text);
    let text = {
      title:data.title,
      text:xx
    };
    return this.end(text);
  }
}
