[virtual-squat_express](../README.md) › [Globals](../globals.md) › ["common/server"](../modules/_common_server_.md) › [ExpressServer](_common_server_.expressserver.md)

# Class: ExpressServer

## Hierarchy

* **ExpressServer**

## Index

### Constructors

* [constructor](_common_server_.expressserver.md#constructor)

### Properties

* [app](_common_server_.expressserver.md#private-app)
* [bodyParserMiddleware](_common_server_.expressserver.md#private-bodyparsermiddleware)
* [bodyParserText](_common_server_.expressserver.md#private-bodyparsertext)
* [bodyParserUrlEncoded](_common_server_.expressserver.md#private-bodyparserurlencoded)
* [lineSignatureMiddleware](_common_server_.expressserver.md#private-linesignaturemiddleware)

### Methods

* [bodyParserOrLineSignatureParser](_common_server_.expressserver.md#private-bodyparserorlinesignatureparser)
* [handleLineEv](_common_server_.expressserver.md#handlelineev)
* [listen](_common_server_.expressserver.md#listen)
* [setBodyParserOrLineSignatureParser](_common_server_.expressserver.md#setbodyparserorlinesignatureparser)
* [setErrPage](_common_server_.expressserver.md#seterrpage)
* [setNotFoundPage](_common_server_.expressserver.md#setnotfoundpage)
* [setRedirectToHTTPS](_common_server_.expressserver.md#setredirecttohttps)
* [setSlackBolt](_common_server_.expressserver.md#setslackbolt)

## Constructors

###  constructor

\+ **new ExpressServer**(): *[ExpressServer](_common_server_.expressserver.md)*

Defined in server/common/server.ts:18

**Returns:** *[ExpressServer](_common_server_.expressserver.md)*

## Properties

### `Private` app

• **app**: *Express‹›* = express()

Defined in server/common/server.ts:17

___

### `Private` bodyParserMiddleware

• **bodyParserMiddleware**: *function* = bodyParser.json({
    limit: process.env.REQUEST_LIMIT || '100kb',
  })

Defined in server/common/server.ts:59

#### Type declaration:

▸ (`req`: IncomingMessage, `res`: ServerResponse, `next`: NextFunction): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |
`next` | NextFunction |

___

### `Private` bodyParserText

• **bodyParserText**: *function* = bodyParser.text({
    limit: process.env.REQUEST_LIMIT || '100kb',
  })

Defined in server/common/server.ts:68

#### Type declaration:

▸ (`req`: IncomingMessage, `res`: ServerResponse, `next`: NextFunction): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |
`next` | NextFunction |

___

### `Private` bodyParserUrlEncoded

• **bodyParserUrlEncoded**: *function* = bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  })

Defined in server/common/server.ts:63

#### Type declaration:

▸ (`req`: IncomingMessage, `res`: ServerResponse, `next`: NextFunction): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |
`next` | NextFunction |

___

### `Private` lineSignatureMiddleware

• **lineSignatureMiddleware**: *any*

Defined in server/common/server.ts:18

## Methods

### `Private` bodyParserOrLineSignatureParser

▸ **bodyParserOrLineSignatureParser**(`lineSignatureMiddleware?`: any): *function*

Defined in server/common/server.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`lineSignatureMiddleware?` | any |

**Returns:** *function*

▸ (`req`: any, `res`: any, `next`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

___

###  handleLineEv

▸ **handleLineEv**(`webHookPath`: string, `config`: ClientConfig): *Promise‹void›*

Defined in server/common/server.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`webHookPath` | string |
`config` | ClientConfig |

**Returns:** *Promise‹void›*

___

###  listen

▸ **listen**(`port`: number): *Promise‹void›*

Defined in server/common/server.ts:159

**Parameters:**

Name | Type |
------ | ------ |
`port` | number |

**Returns:** *Promise‹void›*

___

###  setBodyParserOrLineSignatureParser

▸ **setBodyParserOrLineSignatureParser**(`config?`: MiddlewareConfig): *Promise‹void›*

Defined in server/common/server.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`config?` | MiddlewareConfig |

**Returns:** *Promise‹void›*

___

###  setErrPage

▸ **setErrPage**(): *Promise‹void›*

Defined in server/common/server.ts:130

**Returns:** *Promise‹void›*

___

###  setNotFoundPage

▸ **setNotFoundPage**(): *Promise‹void›*

Defined in server/common/server.ts:112

**Returns:** *Promise‹void›*

___

###  setRedirectToHTTPS

▸ **setRedirectToHTTPS**(): *Promise‹void›*

Defined in server/common/server.ts:155

**Returns:** *Promise‹void›*

___

###  setSlackBolt

▸ **setSlackBolt**(`webHookPath`: string, `botToken`: string, `receiverOpts`: object): *Promise‹void›*

Defined in server/common/server.ts:86

**Parameters:**

▪ **webHookPath**: *string*

▪ **botToken**: *string*

▪ **receiverOpts**: *object*

Name | Type |
------ | ------ |
`endpoints` | object |
`signingSecret` | string |

**Returns:** *Promise‹void›*
