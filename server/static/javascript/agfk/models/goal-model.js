
/*global define*/
define(["backbone", "utils/utils"], function(Backbone, Utils){
  return Backbone.Model.extend({
    defaults: function () {
      return {
        text: "",
        id: "",
        concept: null,
        ordering: -1
      };
    },

    url: function () {
        return window.APIBASE + "goal/" + this.id + "/";
    },

    parse: function (resp, xhr) {
      if (!xhr.parse) {
        return {};
      }
      resp.concept = this.collection.parent;
      return resp;
    },

    toJSON: function () {
      var thisModel = this;
        return {
          id: thisModel.id,
          text: thisModel.get("text"),
          concept: thisModel.get("concept").url(),
          ordering: thisModel.get("ordering")
        };
    },

    getParsedText: function () {
      var txt = this.get("text");
      if (txt[0] != "*") {
        txt = "*" + txt;
      }
        return Utils.simpleMdToHtml(txt);
    }
  });
});
