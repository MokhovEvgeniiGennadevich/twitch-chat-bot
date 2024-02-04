const tmi = require('tmi.js')
const fs = require('fs')

// Read ENV variables
type configType = {
	USERNAME: string
	PASSWORD: string
	CHANNEL: string
	TIMEOUT_MIN: number
	TIMEOUT_MAX: number
	FILE: string
}

let config: configType = {
	USERNAME: '',
	PASSWORD: '',
	CHANNEL: '',
	TIMEOUT_MIN: 0,
	TIMEOUT_MAX: 0,
	FILE: '',
}

if (!process.env.USERNAME) {
	console.log('Error: Config: USERNAME not set')
	process.exit()
} else {
	config.USERNAME = process.env.USERNAME
}

if (!process.env.PASSWORD) {
	console.log('Error: Config: PASSWORD not set')
	process.exit()
} else {
	config.PASSWORD = process.env.PASSWORD
}

if (!process.env.CHANNEL) {
	console.log('Error: Config: CHANNEL not set')
	process.exit()
} else {
	config.CHANNEL = process.env.CHANNEL
}

if (!process.env.TIMEOUT_MIN) {
	console.log('Error: Config: TIMEOUT_MIN not set')
	process.exit()
} else {
	config.TIMEOUT_MIN = parseInt(process.env.TIMEOUT_MIN)
}

if (!process.env.TIMEOUT_MAX) {
	console.log('Error: Config: TIMEOUT_MAX not set')
	process.exit()
} else {
	config.TIMEOUT_MAX = parseInt(process.env.TIMEOUT_MAX)
}

if (!process.env.FILE) {
	console.log('Error: Config: FILE not set')
	process.exit()
} else {
	config.FILE = process.env.FILE
}

console.log('Config successfully loaded')

// Read strings from text file

const messages = fs.readFileSync('messages/' + config.FILE, 'utf8').split('\n')

console.log('Messages successfully loaded. There are', messages.length)

// Load Twitch Smiles

const smilesTwitch = fs.readFileSync('smiles/twitch.txt', 'utf8').split('\n')

console.log(
	'Smiles: Twitch successfully loaded. There are',
	smilesTwitch.length
)

// Load 7TV Smiles

const smiles7TV = fs.readFileSync('smiles/7tv.txt', 'utf8').split('\n')

console.log('Smiles: 7TV successfully loaded. There are', smiles7TV.length)

// Combined Smiles

const smiles = smilesTwitch.concat(smiles7TV)

console.log('Smiles: Total', smiles.length)

const client = new tmi.Client({
	options: { debug: false },
	connection: {
		secure: true,
		reconnect: true,
	},
	identity: {
		username: config.USERNAME,
		password: config.PASSWORD,
	},
	channels: [config.CHANNEL],
})

client.connect()

client.on('message', (channel: any, tags: any, message: any, self: any) => {})

// client.on('message', (channel: any, tags: any, message: any, self: any) => {
// Ignore echoed messages.
// if (self) return

// Don't reply to commands
// if (message.startsWith('!')) return

// Ignore if message is from the other bot.

// Ignore if timeout is active.

// Random message

// let randomIndex = Math.floor(Math.random() * messages.length)

// console.log(randomIndex)

// if (message.toLowerCase() === '!hello') {
// 	client.say(channel, messages[randomIndex])
// }
// })

const setRandomInterval = (minDelay: any, maxDelay: any) => {
	let timeout: any

	const runInterval = () => {
		const timeoutFunction = () => {
			client.say(config.CHANNEL, chatMessage())
			runInterval()
		}

		const delay =
			Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

		console.log('Sleeping for', delay / 1000, 'seconds')

		timeout = setTimeout(timeoutFunction, delay)
	}

	runInterval()

	return {
		clear() {
			clearTimeout(timeout)
		},
	}
}

setRandomInterval(config.TIMEOUT_MIN * 1000, config.TIMEOUT_MAX * 1000)

function chatMessage() {
	// 3 = 0, 1, 2
	const choice = Math.floor(Math.random() * 6)

	// Message with ONE smile END
	if (choice === 0) {
		const randomMessage = Math.floor(Math.random() * messages.length)
		const message = messages[randomMessage]

		const randomSmile = Math.floor(Math.random() * smiles.length)
		const smile = smiles[randomSmile]

		return message + ' ' + smile
	}

	// Message with ONE smile START
	if (choice === 1) {
		const randomMessage = Math.floor(Math.random() * messages.length)
		const message = messages[randomMessage]

		const randomSmile = Math.floor(Math.random() * smiles.length)
		const smile = smiles[randomSmile]

		return smile + ' ' + message
	}

	// One random smile
	if (choice === 2) {
		const randomSmile = Math.floor(Math.random() * smiles.length)
		const smile = smiles[randomSmile]

		return smile
	}

	// Two random smiles
	if (choice === 3) {
		return (
			smiles[Math.floor(Math.random() * smiles.length)] +
			' ' +
			smiles[Math.floor(Math.random() * smiles.length)]
		)
	}

	// Three identical smiles
	if (choice === 4) {
		const randomSmile = Math.floor(Math.random() * smiles.length)
		const smile = smiles[randomSmile]

		return smile + ' ' + smile + ' ' + smile
	}

	// Default message
	const randomMessage = Math.floor(Math.random() * messages.length)
	const message = messages[randomMessage]

	return message
}
