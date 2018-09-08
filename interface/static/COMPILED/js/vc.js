// Generated by CoffeeScript 2.1.1
(function() {
  // view controller
  var load;

  load = function(destination = 'home', scope = '') {
    var endpoint, header, url;
    endpoint = window.endpoint.bare;
    switch (destination) {
      case 'home':
        url = '';
        break;
      case 'servers':
        url = 'servers';
        break;
      case 'servers[detailed]':
        url = `servers/${scope}`;
        break;
      case 'admins[servers]':
        url = 'admins/servers';
        break;
      case 'admins[web]':
        url = 'admins/web';
        break;
      case 'players':
        url = 'players';
        break;
      case 'players[detailed]':
        url = `players/${scope}`;
        break;
      case 'punishments':
        url = '[[PLACEHOLDER]]';
        break;
      case 'punishments[bans]':
        url = 'punishments/bans';
        break;
      case 'punishments[mutes]':
        url = 'punishments/mutes';
        break;
      case 'punishments[gags]':
        url = 'punishments/gags';
        break;
      default:
        return;
    }
    header = {
      'X-CSRFTOKEN': window.csrftoken
    };
    window._.location = destination;
    window._.scope = scope;
    return window.endpoint.bare[url].post(header, {}, function(dummy, response) {
      var data, status;
      status = response.status;
      data = response.data;
      if (status === 200) {
        window.history.pushState({
          location: destination,
          scope: scope
        }, null, `/${url}`);
        $('.main')[0].innerHTML = data;
        return $('.main script.execute:not(.evaluated)').forEach(function(scr) {
          return eval(scr.innerHTML);
        });
      }
    });
  };

  $(window).on('popstate', function(event) {
    // this is like super janked with the even state and I have no clue why
    // --> so we just gonna reload that bitch
    // console.log event
    // window.vc event.state.location, event.state.scope
    console.log(event);
  });

  // window.location.href = location.href
  window.vc = load;

}).call(this);
