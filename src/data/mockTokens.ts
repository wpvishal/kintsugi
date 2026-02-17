export interface Token {
    id: string;
    name: string;
    symbol: string;
    address: string;
    status: "dead" | "rugged" | "abandoned";
    deathCause: string;
    marketCap: number;
    holders: number;
    codeSnippet: string; // Simulating the "code" to analyze
}

export const mockTokens: Token[] = [
    {
        id: "1",
        name: "SafeMoonLegacy",
        symbol: "SFL",
        address: "So11111111111111111111111111111111111111112",
        status: "abandoned",
        deathCause: "Dev wallet sold all tokens",
        marketCap: 420,
        holders: 12,
        codeSnippet: `
      function transfer(address to, uint256 amount) public {
        // ERROR: No checks for balance
        balances[to] += amount; 
        // Missing subtraction from sender
      }
    `,
    },
    {
        id: "2",
        name: "RugPullCoin",
        symbol: "RUG",
        address: "RuG1111111111111111111111111111111111111111",
        status: "rugged",
        deathCause: "Liquidity removed",
        marketCap: 0,
        holders: 4,
        codeSnippet: `
      function removeLiquidity() public onlyOwner {
        // Backdoor to drain all funds
        payable(msg.sender).transfer(address(this).balance);
      }
    `,
    },
    {
        id: "3",
        name: "LostProject",
        symbol: "LOST",
        address: "LoS1111111111111111111111111111111111111111",
        status: "dead",
        deathCause: "Zero activity for 2 years",
        marketCap: 50,
        holders: 1500,
        codeSnippet: `
      // Standard token, but abandoned
      // No issues in code, just abandoned project
    `,
    },
];
