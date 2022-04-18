# BLS Wallet Demo App

## How to setup

1. deploy Generic ERC20 contract with minting ability

eg -

```
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(string memory name_, string memory symbol_)
        ERC20(name_, symbol_)
    {}

    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }
}

```

2. deploy a spender contract (any contract which can pull tokens from user)

eg -

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Spender {
    function pullTokens(address _token, uint256 _amount) public {
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    }
}
```

3. note the addresses for the 2 contracts
4. update `.env` file with the 2 addresses
5. run `yarn install`
6. run `yarn start`
7. connect Quill Wallet
