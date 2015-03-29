var groups_cache = null;
jQuery.getJSON('groups.json').done(function(data) {
  groups_cache = data;
});

function group(nick) {
  if(nick.match(/^#/)) {
    return 'channel';
  }

  return groups_cache[nick] || 'default';
}
