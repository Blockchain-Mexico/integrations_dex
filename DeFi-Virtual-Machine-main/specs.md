DeFi virtual compiler

General idea:

There are different opcode in the smart contract approach:
for example:

pragma solidity ^0.4.11;
contract MyContract {
    uint i = (10 + 2) * 2;
}

This simple solidity code moves the stack like this:

PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0x18 PUSH1 0x0 SSTORE CALLVALUE ISZERO PUSH1 0x13 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST JUMPDEST PUSH1 0x36 DUP1 PUSH1 0x21 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x60 PUSH1 0x40 MSTORE JUMPDEST PUSH1 0x0 DUP1 REVERT STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xc9 0xbd STOP ISZERO 0x2f LOG1 0xc4 DUP1 0xf6 DUP3 PUSH32 0x81515BB19C3E63BF7ED9FFBB5FDA0265983AC798002900000000000000000000


This dedicated instruments is build for do one stack movement is one move.

Basically there is a lot a functions in the DeFi space that runs in a smart Contract as:
YFI standar. (aggregator DeFi)

'''delegatedAssets():
is a function of a smart contract that do a 


Curve standar. 
#Borrow()
If possible a stack momentum of put something in other place
#Lend()
Is derived the token for amount in the stack

#Repay()


Some others features

# Yield()
Is a mint codition for increase the value in the stack
# Collaterized()


```c++
class ExpressionCompiler
```

```c++
class DeFiDefinition
```

```c++
class Compiler
```


```c++
class  
```

```c++
class 
```
hint: LValue is for the stack position in the virtual machine approach of Eth
is possible to recreate a stack position to be a dedicated version only to DeFi?

More Simple Architecture:
[CodeGen]
[Parser]
[Formal]
[Interface]
[Analysis]

More large "Normal" Architecture:
[unicode]
[Parser]
[printer]
[interfaces]
[AST]
[Pkg and executing libraries]

*More research in AST
Over-Engineering:
hint: Basically is a compiler that move the stack object virtualize.
