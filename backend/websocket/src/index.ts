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
			let randomIndex = Math.floor(Math.random() * messages.length)
			client.say(config.CHANNEL, messages[randomIndex])
			runInterval()
		}

		const delay =
			Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

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
