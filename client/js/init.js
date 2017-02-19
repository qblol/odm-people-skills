$(document).ready(function(){
  $('.modal').modal();
  getUsers()
});

function getUsers(){
  $.ajax({
    url: 'http://localhost:3000/api/users',
    type: 'GET',
    success: function(data) {
      data.forEach(function(data){
        $('#peoples').prepend(`
          <div id="${data.username}" class="col s3">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${data.photo}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${data.username}<i class="material-icons right">more_vert</i></span>
                <p><a href="#">Skills</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${data.username} Skills<i class="material-icons right">close</i></span>
                <table class="responsive-table highlight">
                  <thead>
                    <tr>
                      <th data-field="skill">Skill</th>
                      <th data-field="score">Score</th>
                      <th data-field="remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody id="${data.username}-skill">

                  </tbody>
                </table>
                <a href="#modal-skill" class="btn-floating btn-large waves-effect waves-light green right tooltipped" data-position="left" data-delay="50" data-tooltip="Add Skill"><i class="material-icons">add</i></a>
              </div>
              <div class="card-action">
                <a href="#" onclick="deleteUser('${data.username}')">Delete User</a>
              </div>
            </div>
          </div>
        `)
        $('#modal-skill').append(`
          <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="addSkill('${data.username}')">Submit</a>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
          </div>
        `)
      })
    }
  })
}

function addUser() {
  $.ajax({
    url: 'http://localhost:3000/api/users',
    type: 'POST',
    data: {
      username: $('#username').val(),
      photo: "img/" + $('#photo').val()
    },
    success: function(data) {
      $('#peoples').prepend(`
        <div id="${data.username}" class="col s3">
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${data.photo}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${data.username}<i class="material-icons right">more_vert</i></span>
              <p><a href="#">Skills</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${data.username} Skills<i class="material-icons right">close</i></span>
              <table class="responsive-table highlight">
                <thead>
                  <tr>
                    <th data-field="skill">Skill</th>
                    <th data-field="score">Score</th>
                    <th data-field="remove">Remove</th>
                  </tr>
                </thead>
                <tbody id="${data.username}-skill">

                </tbody>
              </table>
              <a href="#modal-skill" class="btn-floating btn-large waves-effect waves-light green right tooltipped" data-position="left" data-delay="50" data-tooltip="Add Skill"><i class="material-icons">add</i></a>
            </div>
            <div class="card-action">
              <a href="#" onclick="deleteUser('${data.username}')">Delete User</a>
            </div>
          </div>
        </div>
      `)
      $('#modal-skill').append(`
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="addSkill('${data.username}')">Submit</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
        </div>
      `)
    }
  })
}

function deleteUser(username) {
  $.ajax({
    url: `http://localhost:3000/api/users/${username}`,
    type: 'DELETE',
    success: function(data) {
      $(`#${username}`).remove()
    }
  })
}

function addSkill(username) {
  $.ajax({
    url: `http://localhost:3000/api/users/${username}/addskill`,
    type: 'PUT',
    data: {
      skillname: $('#skillname').val(),
      score: $('#score').val()
    },
    success: function(data) {
      let skillname = $('#skillname').val()
      let score = $('#score').val()
      $(`#${data.username}-skill`).prepend(`
        <tr id="${data.username}-${skillname}">
          <td>${skillname}</td>
          <td>${score}</td>
          <td><a onclick="removeSkill('${data.username}','${skillname}')" class="waves-effect waves-light btn red"><i class="material-icons center"><i class="material-icons">delete_forever</i></i></a></td>
        </tr>
      `)
    }
  })
}

function removeSkill(username, skill){
  $.ajax({
    url: `http://localhost:3000/api/users/${username}/removeskill`,
    type: 'PUT',
    data: {
      skillname: skill
    },
    success: function(data) {
      $(`#${data.username}-${skill}`).remove()
    }
  })
}
