// Create 5 rooms with conditionals as choices the user makes
// If user does x then do y
const prompts = require('prompts')


function firstChoice(){
    prompts({
		type: 'text',
		name: 'value',
		message: 'Would you like to enter the first room?',
		validate: (answer) => (answer === 'no' ? `You have no choice, enter the room now.` : true)
	})
		.then((response) => {
			if (response.value === 'yes') {
				console.log('Great, lets get started...')
			}
		})
}
firstChoice()

function firstRoom() {
	prompts({
		type: 'number',
		name: 'door',
		message: 'In front of you stands 2 doors which one would you like to enter? 1 or 2?',
		validate: (door) => door > 2 ? 'You have to choose 1 or 2' : true
	}).then((response) => {
		if (response.door === 2) {
            console.log(`You have entered door ${response.door}`)
            doorTwo()
		} else {
            console.log(`You have entered ${response.door}`)
            doorOne()
		}
	})
}
firstRoom()

function doorTwo(){
    console.log('You have entered into a room with no lights, you must find a way out.')
    prompts({
		type: 'text',
		name: 'value',
		message: 'Do you go right or left?',
		validate: (direction) => direction == 'foo' ? 'Right or Left.' : true
	})
		.then((response) => {
			if (response.value === 'right') {
                console.log('You have gone right')
                doorTwoRight()
                
			}else {
                console.log('You have gone left')
                doorTwoLeft()
            }
		})
    
}

function doorOne(){
    console.log('You have entered into a room full of mirrors, you must find a way out.')
    prompts({
		type: 'text',
		name: 'value',
		message: 'Do you go forward or backwards?',
		validate: (direction) => direction == 'foo' ? 'Forwards or Backwards.' : true
	})
		.then((response) => {
			if (response.value === 'forward') {
                console.log('You have gone forward')
                doorOneForward()
			}else {
                console.log('You have gone backwards')
                doorOneBackwards()
            }
		})
    
};

function doorTwoRight(){
    console.log('Congratulations you chose correctly, you have made past the first room');
    prompts({
		type: 'number',
		name: 'value',
		message: 'You must make it through one more room, which door would you like to go through this time? 1 or 2? Choose wisely...',
		validate: (door) => door > 2 ? 'You can only go through one of these two doors.' : true
	})
		.then((response) => {
			if (response.value === 2) {
                console.log(`You have entered door 2`)
                correctDoor()
			}else {
                console.log(`You have entered door 1`)
                wrongDoor()
            }
		})

}

function doorTwoLeft() {
    console.log('Uh oh, you have run into a trap. Now you must restart')
    firstRoom()
}

function doorOneBackwards() {
    console.log('There is no turning back. You must go forward..')
    doorOneForward()
}

function doorOneForward(){
    console.log('You move forward but cant seem to find a way out. If you dont find a way out in the next 30 seconds the room will collapse')
    prompts({
		type: 'text',
		name: 'value',
		message: 'Out of the corner of your eye you see a crowbar.. do you grab it to smash through the glass mirrors or do you keep looking for a door? (crowbar/look)?',
		validate: (decision) => decision == 'foo' ? 'These are your only two choices' : true
	})
		.then((response) => {
			if (response.value === 'crowbar') {
                console.log(`You chose to smash the glass. you made the wrong choice. You hit the glass and it pulled a trigger and the room collapsed on top of you.`)
                firstRoom()
			}else {
                console.log(`You have chose to look around a bit more. Good choice. You take a right turn and find a door handle and you have made it to the next room!`)
                doorTwoRight()
            }
		})
}

function correctDoor(){
    console.log('You have chosen the correct door. But you still must take the right path to make it out. If you choose incorrectly it will take you back to the start')
    prompts({
		type: 'text',
		name: 'value',
		message: 'Would you like to take the dirt road? Or the brick road? (dirt/brick)?',
		validate: (decision) => decision == 'foo' ? 'Dirt or Brick??' : true
	})
		.then((response) => {
			if (response.value === 'dirt') {
                console.log(`You chose the wrong path! You must start again`)
                firstRoom()
			}else {
                console.log(`You have chosen the right path! Congratulations you have made it out alive!!`)
            }
		})
}

function wrongDoor(){
    console.log('Oh no! You chose the wrong door and fell into an abyss that drops you back at the starting point.')
    firstRoom()
}