var _ = require("lodash");
var Msg = require("../../models/msg");

module.exports = function(irc, network) {
	var client = this;
	irc.on("part", function(data) {
		var chan = _.findWhere(network.channels, {name: data.channels[0]});
		if (typeof chan === "undefined") {
			return;
		}
		var from = data.nick;
		if (from == irc.me) {
			network.channels = _.without(network.channels, chan);
			client.save();
			client.emit("part", {
				chan: chan.id
			});
		} else {
			var user = _.findWhere(chan.users, {name: from});
			chan.users = _.without(chan.users, user);
			client.emit("users", {
				chan: chan.id,
				users: chan.users
			});
			var msg = new Msg({
				type: "",
				mode: chan.getMode(from),
				from: from,
				text: data.nick + " left the channel."
			});
			chan.messages.push(msg);
			client.emit("msg", {
				chan: chan.id,
				msg: msg
			});
		}
	});
};
