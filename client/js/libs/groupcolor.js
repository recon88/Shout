var groups_cache = null;
jQuery.getJSON('groups.json').done(function(data) {
  groups_cache = data;
});

function groupcolor(nick) {
  var group = nick.match(/^#/) ? 'channel' : groups_cache.groups[nick];
  return groups_cache.colors[group] || 'black';
}
