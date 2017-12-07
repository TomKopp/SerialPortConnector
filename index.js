const SerialPort = require('serialport')


const baudRate = 9600


/**
 * @param {object} port desc
 * @example
 * { comName: 'COM13',
 *   manufacturer: 'Silicon Labs',
 *   serialNumber: '00BCAC79',
 *   pnpId: 'USB\\VID_10C4&PID_EA60\\00BCAC79',
 *   locationId: 'Port_#0007.Hub_#0006',
 *   vendorId: '10C4',
 *   productId: 'EA60' }
 */
SerialPort
	.list()
	.then((ports) => ports.map((port) => new SerialPort(port.comName, { baudRate: parseInt(baudRate, 10) })))
	.then((serialPorts) => serialPorts.map((serialPort) => serialPort.pipe(new SerialPort.parsers.Readline({ delimiter: '\r\n' }))))
	.then((parsers) => parsers.forEach((parser) => {
		parser.on('data', console.log)
		parser.on('error', console.error)
	}))
	.catch(console.error)


process.on('unhandledRejection', (reason, p) => {
	// application specific logging, throwing an error, or other logic here
	console.error(`Unhandled Rejection at: Promise ${p}\nreason: ${reason}`)
})
