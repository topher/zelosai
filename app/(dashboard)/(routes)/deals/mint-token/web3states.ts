export const accountButtonStates = [{
    onState: "wallet-not-connected",
    buttonLabel: "Connect Wallet",
    onPress: 'run Web3Client.mint()',
}, {
    onState: "wallet-connected-not-in-list",
    buttonLabel: "Sign Up",
    onPress: 'navigate to page JoinPage',
}, {
    onState: "wallet-connected-and-in-list",
    buttonLabel: "Mint Token",
    onPress: 'navigate to page ReviewPage',
}]

export const mintStatusStates = {
    Completed: {
        scenario: "Completed",
        statusHeader: "Mint Complete. Congratulations!",
        buttonCTA: "View on Etherscan",
    },
    Inprogress: {
        scenario: "Inprogress",
        statusHeader: "Mint In Progress",
        buttonCTA: "View on Etherscan",
    },
    Error: {
        scenario: "Error",
        statusHeader: "Whoops, looks like there was a issue...",
        buttonCTA: "",
    }
}