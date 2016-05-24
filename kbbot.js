
/*!
 * Future bot implementation
 * with some ai platform for node, or db + search engine
 * @shinecita
 * MIT Licensed
 */


var kbanswers = require("./kb.json").answers;//TODO USE a proper data source;

module.exports = function (opts) {
   var Bot = this;

   Bot.findAnswer = function(opts, cb) {
     this.question = opts.text.replace(/[^a-zA-Z ]/g, "");
     var kb = findByQuestion(opts.text);
     if (!kb) kb = findByTag(opts.text);
     if (!kb) {
       kb = ["Oh sorry, I will check and answer you as soon as I can."];
       learn(opts);
     }
     return cb(kb);
   };

   /*
    *  Try to find by exact question?.
    */
   var findByQuestion = function(text) {
      var answers = kbanswers.filter(function(q){
         //TODO, rate etc
         return q.questions.indexOf(text.toLowerCase());
      })
      if (answers) return answers.map(function(a){return a.answer});
      return;
   }
   /*
    * Try to find it by Tag.
    */
   var findByTag = function(text) {
      return;
   }

   /*
    * Save new knowledge Base
    */
   var learn = function (kb) {
     //TODO should save kb with answer and tags
     return;
   }

   /*
    *  In case no answer is found or the user request it, ping a human
    * in a databse request a new human answer.
    */
   var requestHuman = function(question) {
     //TODO should save question and request human intervention;
   }

   return Bot;

}
