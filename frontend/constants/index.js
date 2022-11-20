export const abi =[
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_fileHash",
				"type": "bytes32"
			}
		],
		"name": "addFile",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_fileHash",
				"type": "bytes32"
			}
		],
		"name": "getFileOrigin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_originAddress",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_fileHash",
				"type": "bytes32"
			}
		],
		"name": "verifyFileOrigin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const contractAddress = "0xBe55c5516873Cef42642039c8E4bad572711f58b"