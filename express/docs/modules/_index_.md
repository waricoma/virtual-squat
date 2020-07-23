[virtual-squat_express](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Variables

* [port](_index_.md#const-port)

### Object literals

* [lineConfig](_index_.md#const-lineconfig)
* [slackReceiverOpts](_index_.md#const-slackreceiveropts)

## Variables

### `Const` port

• **port**: *number* = parseInt(process.env.PORT)

Defined in server/index.ts:19

## Object literals

### `Const` lineConfig

### ▪ **lineConfig**: *object*

Defined in server/index.ts:5

###  channelAccessToken

• **channelAccessToken**: *string* = process.env.LINE_CH_ACCESS_TOKEN.toString()

Defined in server/index.ts:6

###  channelSecret

• **channelSecret**: *string* = process.env.LINE_CH_SECRET.toString()

Defined in server/index.ts:7

___

### `Const` slackReceiverOpts

### ▪ **slackReceiverOpts**: *object*

Defined in server/index.ts:10

###  signingSecret

• **signingSecret**: *string* = process.env.SLACK_SIGNING_SECRET

Defined in server/index.ts:11

▪ **endpoints**: *object*

Defined in server/index.ts:12

* **commands**: *string* = "/commands"

* **events**: *string* = "/events"

* **interactive**: *string* = "/interactive"
