// Generated by CoffeeScript 2.1.1
(function() {
  var admin__admin, admin__group, admin__log, ban__user, chat__log, mutegag__user, player__user, server__server;

  admin__admin = function(page = 1) {
    if (page === 1) {
      $("#admin__admin").html('');
    }
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/admin/user/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#admin__admin").htmlAppend(data);
        feather.replace();
        return window.ajax.admin.admins(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  admin__log = function(page = 1) {
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/admin/log/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#admin__log").htmlAppend(data);
        feather.replace();
        return window.ajax.admin.logs(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  admin__group = function(page = 1) {
    var i, item, j, len, ref;
    if (page === 1) {
      i = 0;
      ref = $("#admin__group .row");
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (i !== 0) {
          $(item).remove();
        }
        i++;
      }
    }
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/admin/group/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#admin__group").htmlAppend(data);
        feather.replace();
        return window.ajax.admin.groups(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  ban__user = function(page = 1) {
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/ban/user/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#ban__user").htmlAppend(data);
        feather.replace();
        return window.ajax.ban.user(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  chat__log = function(page = 1) {
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/chat/log/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#chat__log").htmlAppend(data);
        feather.replace();
        return window.ajax.chat.logs(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  mutegag__user = function(page = 1) {
    if (page === 1) {
      $("#mutegag__user").html('');
    }
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/mutegag/user/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#mutegag__user").htmlAppend(data);
        feather.replace();
        return window.ajax.mutegag.user(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  player__user = function(page = 1) {
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/player/user/' + page, 'POST', function(data, status) {
      if (status === 200) {
        $("#player__user").htmlAppend(data);
        feather.replace();
        return window.ajax.mutegag.user(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  server__server = function(page = 1) {
    return $({
      'csrfmiddlewaretoken': window.csrftoken
    }).ajax('/ajax/v1/server/server/' + page, 'POST', function(data, status) {
      var j, len, ref, scr;
      if (status === 200) {
        $("#server__server").htmlAfter(data);
        ref = $(".chart-section script.execution");
        for (j = 0, len = ref.length; j < len; j++) {
          scr = ref[j];
          eval($(scr).html());
        }
        feather.replace();
        return window.ajax.server.server(page + 1);
      } else {
        return false;
      }
      return true;
    });
  };

  window.ajax = {
    admin: {
      admins: admin__admin,
      logs: admin__log,
      groups: admin__group
    },
    ban: {
      user: ban__user
    },
    chat: {
      logs: chat__log
    },
    mutegag: {
      user: mutegag__user
    },
    player: {
      user: player__user
    },
    server: {
      server: server__server
    }
  };

}).call(this);
