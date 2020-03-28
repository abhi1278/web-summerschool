import data from '../docs/default-firebase-data.json';


const teams = data.team;
if (!Object.keys(teams).length) {
  console.log('data empty');
}
console.log('\tImporting', Object.keys(teams).length, 'subteam...');


Object.keys(teams).forEach((teamId) => {
  console.log('title: ' + teams[teamId].title);


  teams[teamId].members.forEach((member, id) => {
    console.log(teamId + 'id ' + id + 'member');
    console.log(member);
  });
});
